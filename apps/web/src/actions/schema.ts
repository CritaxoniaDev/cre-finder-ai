import { z } from "zod";

export const productMetadataSchema = z.object({
  max_searches: z.coerce.number(),
  max_exports: z.coerce.number(),
  skip_tracing: z.string(),
  storage: z.string(),
  property_data: z.string(),
  customizable_filters: z.coerce.boolean(),
  exclusive_zip_access: z.coerce.boolean(),
  ai_outreach_early_access: z.coerce.boolean(),
  is_enterprise: z.coerce.boolean(),
});
