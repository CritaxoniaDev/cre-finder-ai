import { TRPCError } from "@trpc/server";
import { stripe } from "@v1/stripe/config";
import { getSubscriptionQuery } from "@v1/supabase/stripe";
import { revalidateTag } from "next/cache";
import { createTRPCRouter, protectedProcedure } from "../init";

export const subscriptionsRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx: { supabase } }) => {
    const subscription = await getSubscriptionQuery(supabase);
    return subscription;
  }),

  endTrial: protectedProcedure.mutation(
    async ({ ctx: { supabase, session } }) => {
      // Get the user's current subscription
      const subscription = await getSubscriptionQuery(supabase);

      if (!subscription) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No active subscription found",
        });
      }

      if (subscription.status !== "trialing") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Subscription is not in trial period",
        });
      }

      try {
        // Update the subscription in Stripe to end trial immediately
        const updatedSubscription = await stripe.subscriptions.update(
          subscription.id,
          {
            trial_end: "now", // end trial right away
            proration_behavior: "always_invoice", // auto-invoice e& attempt payment now
            billing_cycle_anchor: "now", // start new cycle now
            cancel_at_period_end: false,
          },
        );

        // Revalidate the subscription cache
        revalidateTag(`subscriptions_${session.user.id}`);
        revalidateTag(`user_${session.user.id}`);

        return {
          success: true,
          subscription: updatedSubscription,
        };
      } catch (error) {
        console.error("Failed to end trial:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to end trial period",
        });
      }
    },
  ),
});
