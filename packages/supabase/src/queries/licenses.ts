import { supabaseAdmin } from "../clients/admin";
import type { Client } from "../types";

// Add locations to existing asset license
export async function addLocationsToAssetLicenseQuery(
  supabase: Client,
  assetLicenseId: string,
  locationData: Array<{
    location_internal_id: string;
    location_name: string;
    location_type: "city" | "county";
    location_formatted: string;
    location_state: string;
  }>,
) {
  const { data, error } = await supabase.from("location_licenses").upsert(
    locationData.map((location) => ({
      asset_license_id: assetLicenseId,
      ...location,
    })),
    {
      onConflict: "asset_license_id, location_internal_id",
    },
  );

  if (error) {
    throw new Error(
      `Failed to add locations to asset license: ${error.message}`,
    );
  }

  return { data, error };
}

// Get detailed user licenses with asset type information and location details
export async function getAllLicensesQuery(supabase: Client, userId: string) {
  const { data, error } = await supabase
    .from("asset_licenses")
    .select(`
      id,
      asset_type_slug,
      search_params,
      is_active,
      created_at,
      updated_at,
      asset_types!inner (
        name,
        description,
        slug
      ),
      location_licenses!inner (
        id,
        location_internal_id,
        location_name,
        location_type,
        location_formatted,
        location_state,
        result_count,
        expires_at,
        is_active,
        created_at
      )
    `)
    .eq("user_id", userId)
    .eq("is_active", true)
    .eq("location_licenses.is_active", true)
    .order("created_at", { ascending: false });

  return { data, error };
}

export async function getLicenseLocationByIdQuery(
  supabase: Client,
  licenseLocationId: string,
) {
  const { data, error } = await supabase
    .from("location_licenses")
    .select(`
      *,
      asset_licenses!inner (
        *
      )
    `)
    .eq("id", licenseLocationId)
    .single();

  return { data, error };
}

export async function getLicenseQueryById(supabase: Client, licenseId: string) {
  const { data, error } = await supabase
    .from("asset_licenses")
    .select(`
      id,
      asset_type_slug,
      search_params,
      is_active,
      created_at,
      updated_at,
      asset:asset_types!inner(
        *
      ),
      locations:location_licenses!inner(
        *
      )
    `)
    .eq("id", licenseId)
    .single();

  return { data, error };
}

export async function getLicenseQuery(
  supabase: Client,
  assetTypeSlug: string,
  params: {
    userId?: string;
    locationInternalIds?: string[];
  },
) {
  const query = supabase
    .from("asset_licenses")
    .select(`
      id,
      asset_type_slug,
      search_params,
      is_active,
      created_at,
      updated_at,
      asset:asset_types!inner(
        *
      ),
      locations:location_licenses!inner(
        *
      )
    `)

    .eq("is_active", true)
    .eq("location_licenses.is_active", true)
    .eq("asset_type_slug", assetTypeSlug);

  if (params.userId) {
    query.eq("user_id", params.userId);
  }

  if (params.locationInternalIds) {
    query.in(
      "location_licenses.location_internal_id",
      params.locationInternalIds,
    );
  }

  const { data, error } = await query
    .order("created_at", { ascending: false })
    .single();

  return { data, error };
}
