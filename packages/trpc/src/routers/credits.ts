import { getUserCreditUsageQuery } from "@v1/supabase/queries";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";

export const creditsRouter = createTRPCRouter({
  usage: protectedProcedure.query(async ({ ctx: { supabase } }) => {
    const { data } = await getUserCreditUsageQuery(supabase);
    return data;
  }),
});
