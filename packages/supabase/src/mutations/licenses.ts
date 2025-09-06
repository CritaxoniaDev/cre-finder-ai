import type { Client, TablesInsert } from "../types";

export async function createLicense(
  supabase: Client,
  data: TablesInsert<"asset_licenses">,
) {
  const { data: assetLicense, error } = await supabase
    .from("asset_licenses")
    .insert(data)
    .select("id")
    .single();

  return { data: assetLicense, error };
}
