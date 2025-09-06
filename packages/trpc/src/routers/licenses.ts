import { tasks } from "@trigger.dev/sdk/v3";
import { TRPCError } from "@trpc/server";
import type { updatePropertyRecordsTask } from "@v1/jobs/update-property-records";
import { getPropertyCountQuery } from "@v1/property-data/queries";
import type { GetPropertySearchParams } from "@v1/property-data/types";
import { parseLocationCode } from "@v1/property-data/utils";
import { supabaseAdmin } from "@v1/supabase/admin";
import { consumeUserCredits, createLicense } from "@v1/supabase/mutations";
import {
  getAllLicensesQuery,
  getAssetTypeQuery,
  getLicenseQuery,
  getUserCreditUsageQuery,
} from "@v1/supabase/queries";
import { getSubscriptionQuery } from "@v1/supabase/stripe";
import type { TablesInsert } from "@v1/supabase/types";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";

export const licensesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        locations: z.array(z.string()),
        assetTypeSlug: z.string(),
        useCodes: z.array(z.number()).nullish(),
        searchParams: z.custom<GetPropertySearchParams>().nullish(),
      }),
    )
    .mutation(async ({ ctx: { supabase, session }, input }) => {
      const subscription = await getSubscriptionQuery(supabase);
      const credits = await getUserCreditUsageQuery(supabase);

      const isTrialUser = subscription?.status === "trialing";

      const { data: existingLicense } = await getLicenseQuery(
        supabase,
        input.assetTypeSlug,
        {
          locationInternalIds: input.locations,
        },
      );

      if (existingLicense) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "One or more locations are already licensed",
        });
      }

      const { data: asset } = await getAssetTypeQuery(
        supabaseAdmin,
        input.assetTypeSlug,
      );

      if (!asset) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Asset type not found",
        });
      }

      const { data: assetLicense } = await createLicense(supabaseAdmin, {
        user_id: session.user.id,
        asset_type_slug: input.assetTypeSlug,
        search_params: input.searchParams,
      });

      if (!assetLicense) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create asset license",
        });
      }

      const allowedUseCodes = input.useCodes || [];

      const filteredUseCodes =
        allowedUseCodes.length > 0
          ? asset.use_codes?.filter((code) => allowedUseCodes.includes(code))
          : asset.use_codes;

      let totalCount = 0;

      const locationLicenseData: TablesInsert<"location_licenses">[] =
        await Promise.all(
          input.locations.map(async (locationId: string) => {
            console.log("locationId", locationId);
            const { state, city, county } = parseLocationCode(locationId);
            const { resultCount } = await getPropertyCountQuery(
              {
                slug: input.assetTypeSlug,
                use_codes: filteredUseCodes || [],
              },
              locationId,
              input.searchParams,
            );

            totalCount += resultCount;

            return {
              asset_license_id: assetLicense.id,
              location_internal_id: locationId,
              location_name: county || city!,
              location_type: county ? ("county" as const) : ("city" as const),
              location_formatted: `${county || city}, ${state}`,
              location_state: state,
              result_count: resultCount,
              expires_at: null,
            };
          }),
        );

      const { data: locationLicenses, error: locationLicenseError } =
        await supabaseAdmin
          .from("location_licenses")
          .upsert(locationLicenseData, {
            onConflict: "asset_license_id, location_internal_id",
          })
          .select("id");

      if (!locationLicenses || locationLicenseError) {
        console.error(locationLicenseError);
        await supabaseAdmin
          .from("asset_licenses")
          .delete()
          .eq("id", assetLicense.id);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create location licenses",
        });
      }

      const result = await consumeUserCredits(
        supabase,
        isTrialUser ? 5 : totalCount,
      );

      if (!result.data || result.error) {
        await supabaseAdmin
          .from("asset_licenses")
          .delete()
          .eq("id", assetLicense.id);

        console.log("Failed to consume credits", result.error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to consume credits",
        });
      }

      console.log("consumed credits", result.data);

      await tasks.batchTrigger<typeof updatePropertyRecordsTask>(
        "update-property-records",
        locationLicenses.map((l) => ({
          payload: {
            licenseId: l.id,
            // useTestData: process.env.NODE_ENV === "development",
          },
        })),
      );

      return {
        assetLicense,
        locationLicenses,
      };
    }),

  refresh: protectedProcedure
    .input(
      z.object({
        licenseId: z.string(),
      }),
    )
    .mutation(async ({ ctx: { supabase }, input }) => {
      const subscription = await getSubscriptionQuery(supabase);

      if (!subscription || subscription.status !== "active") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Subscription is not active",
        });
      }

      const { data: locationLicenses, error: locationLicenseError } =
        await supabase
          .from("location_licenses")
          .select("id, result_count")
          .eq("asset_license_id", input.licenseId);

      if (!locationLicenses || locationLicenseError) {
        console.error(locationLicenseError);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get location licenses",
        });
      }

      const total = locationLicenses.reduce(
        (acc, l) => acc + l.result_count,
        0,
      );

      const result = await consumeUserCredits(supabase, total);

      if (!result.data || result.error) {
        console.error(result.error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to consume credits",
        });
      }

      await tasks.batchTrigger<typeof updatePropertyRecordsTask>(
        "update-property-records",
        locationLicenses.map((l) => ({
          payload: {
            licenseId: l.id,
            // useTestData: process.env.NODE_ENV === "development",
          },
        })),
      );
    }),

  list: protectedProcedure.query(
    async ({ ctx: { supabase, session }, input }) => {
      const { data } = await getAllLicensesQuery(supabase, session.user.id);

      return data;
    },
  ),

  get: protectedProcedure
    .input(
      z.object({
        assetTypeSlug: z.string(),
        locationInternalIds: z.array(z.string()).optional(),
      }),
    )
    .query(async ({ ctx: { supabase, session }, input }) => {
      const { data } = await getLicenseQuery(supabase, input.assetTypeSlug, {
        userId: session.user.id,
        locationInternalIds: input.locationInternalIds,
      });

      return data;
    }),

  checkAvailability: protectedProcedure
    .input(
      z.object({
        locations: z.array(z.string()),
        assetTypeSlug: z.string(),
      }),
    )
    .query(async ({ ctx: { supabase }, input }) => {
      const { data: existingLicense } = await getLicenseQuery(
        supabase,
        input.assetTypeSlug,
        {
          locationInternalIds: input.locations,
        },
      );

      const takenLocationIds =
        existingLicense?.locations.map((item) => item.location_internal_id) ||
        [];

      return {
        data: existingLicense,
        meta: {
          takenLocationIds,
          isAnyTaken: takenLocationIds.length > 0,
        },
      };
    }),
});
