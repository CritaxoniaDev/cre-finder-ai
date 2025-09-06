import type { GetPropertySearchParams } from "@v1/property-data/types";
import {
  getLicenseQuery,
  getLicenseQueryById,
  getPropertyRecord,
  getPropertyRecordsQuery,
} from "@v1/supabase/queries";
import { z } from "zod";
import { ZodLazy } from "zod/v4";
import { createTRPCRouter, protectedProcedure } from "../init";

export const recordsRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx: { supabase } }) => {
      return getPropertyRecord(supabase, input.id);
    }),

  list: protectedProcedure
    .input(
      z.object({
        licenseId: z.string(),
        locationCodes: z.array(z.string()),
        from: z.number().optional(),
        to: z.number().optional(),
        sort: z.tuple([z.string(), z.enum(["asc", "desc"])]).optional(),
        searchQuery: z.string().optional(),
        filters: z.custom<GetPropertySearchParams>().optional(),
      }),
    )
    .query(async ({ input, ctx: { supabase } }) => {
      const { data, meta } = await getPropertyRecordsQuery(supabase, {
        assetLicenseId: input.licenseId,
        locationCodes: input.locationCodes,
        from: input.from,
        to: input.to,
        sort: input.sort,
        searchQuery: input.searchQuery,
        filters: input.filters,
      });

      const { data: license } = await getLicenseQueryById(
        supabase,
        input.licenseId,
      );
      console.log(JSON.stringify(license, null, 2));
      const expectedTotalResultCount = license?.locations.reduce(
        (acc, location) => acc + location.result_count,
        0,
      );

      return {
        data,
        meta: {
          ...meta,
          license,
          expectedTotalResultCount: expectedTotalResultCount ?? 0,
        },
      };
    }),

  download: protectedProcedure
    .input(
      z.object({
        assetLicenseId: z.string(),
        locationCodes: z.array(z.string()),
      }),
    )
    .query(async ({ input, ctx: { supabase } }) => {
      return getPropertyRecordsQuery(supabase, {
        assetLicenseId: input.assetLicenseId,
        locationCodes: input.locationCodes,
      });
    }),
});
