"use client";

import type { productMetadataSchema } from "@/actions/schema";
import { getStripe } from "@v1/stripe/client";
import { getErrorRedirect } from "@v1/stripe/helpers";
import { checkoutWithStripe, createStripePortal } from "@v1/stripe/server";
import type { Tables } from "@v1/supabase/types";
import { Button } from "@v1/ui/button";
import { cn } from "@v1/ui/cn";
import { CheckIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { z } from "zod";

type Subscription = Tables<"subscriptions">;
type Product = Tables<"products">;
type Price = Tables<"prices">;

interface ProductWithPrices extends Product {
  prices: Price[];
  metadata: z.infer<typeof productMetadataSchema>;
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  user: Tables<"users"> | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

export function PricingSelection({ user, subscription, products }: Props) {
  const router = useRouter();

  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push("/login");
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      "/onboarding/complete",
      currentPath,
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          "An unknown error occurred.",
          "Please try again later or contact a system administrator.",
        ),
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  const handleStripePortal = async (price?: Price) => {
    setPriceIdLoading(price?.id);

    try {
      const redirectUrl = await createStripePortal(currentPath);

      return router.push(redirectUrl);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  const getFeatures = (product: ProductWithPrices) => {
    const {
      max_searches,
      max_exports,
      skip_tracing,
      storage,
      property_data,
      customizable_filters,
      exclusive_zip_access,
      ai_outreach_early_access,
      is_enterprise,
    } = product.metadata;

    const features = [];

    // Skip tracing feature
    if (skip_tracing === "unlimited") {
      features.push("Unlimited skip tracing");
    }

    // Storage feature
    if (storage === "unlimited") {
      features.push("Unlimited storage");
    }

    // Monthly leads
    if (max_searches) {
      features.push(`${max_searches} monthly leads`);
    }

    // Monthly exports
    if (max_exports) {
      features.push(`${max_exports} monthly exports`);
    }

    // Property data coverage
    if (property_data === "nationwide") {
      features.push("Nationwide property data");
    }

    // Customizable filters
    if (customizable_filters) {
      features.push("Customizable filters");
    }

    // Exclusive zip code access
    if (exclusive_zip_access) {
      features.push("Exclusive access to your zip code searches");
    }

    // AI outreach early access
    if (ai_outreach_early_access) {
      features.push("Early access to AI outreach feature");
    }

    return features;
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-bold">Choose Your Plan</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Select the plan that best fits your investment needs
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
        {products.map(({ prices, ...product }) =>
          prices.map((price) => {
            if (!price) return null;

            const priceString = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: price.currency!,
              minimumFractionDigits: 0,
            }).format((price?.unit_amount || 0) / 100);

            const isActive = price.id === subscription?.prices?.id;

            // @ts-ignore
            const features = getFeatures(product);

            return (
              <div
                key={price.id}
                className={cn(
                  "border rounded-lg overflow-hidden transition-all h-full flex flex-col",
                  isActive
                    ? "border-primary ring-2 ring-primary ring-opacity-50"
                    : "border-border hover:border-input",
                )}
              >
                <div className="p-4 sm:p-6 border-b bg-muted/50">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-2xl sm:text-3xl font-bold">
                      {priceString}
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">
                      /month
                    </span>
                  </div>
                  {price.trial_period_days && (
                    <div className="mt-1">
                      <span className="text-sm font-medium text-green-600">
                        {price.trial_period_days}-day free trial
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4 sm:p-6 flex-grow">
                  <ul className="space-y-3 mb-6">
                    {features?.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-accent-foreground mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 mt-auto">
                  <Button
                    variant={isActive ? "default" : "outline"}
                    disabled={priceIdLoading === price.id}
                    className="w-full"
                    onClick={async () =>
                      isActive
                        ? handleStripePortal(price)
                        : await handleStripeCheckout(price)
                    }
                    size="lg"
                  >
                    {isActive
                      ? "Manage"
                      : price.trial_period_days
                        ? "Start Free Trial"
                        : "Select Plan"}
                  </Button>
                </div>
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
