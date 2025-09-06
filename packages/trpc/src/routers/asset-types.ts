import { getAssetTypeQuery, getAssetTypesQuery } from "@v1/supabase/queries";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../init";

export const assetTypesRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx: { supabase } }) => {
    const { data } = await getAssetTypesQuery(supabase);
    return data;
  }),

  get: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx: { supabase }, input }) => {
      const { data } = await getAssetTypeQuery(supabase, input.slug);

      return data;
    }),
});
