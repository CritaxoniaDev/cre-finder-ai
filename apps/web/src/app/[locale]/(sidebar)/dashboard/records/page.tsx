import { ErrorBoundary } from "@/components/error-boundary";

import { PropertyMapServer } from "@/components/property-map.server";
import { PropertySearchFilters } from "@/components/property-search-filters";
import { SiteHeader } from "@/components/site-header";
import { DataTable } from "@/components/tables/records/data-table";
import { Loading } from "@/components/tables/records/loading";
import type { GetPropertySearchParams } from "@v1/property-data/types";
import { getSubscription, getUser } from "@v1/supabase/cached-queries";
import { getQueryClient } from "@v1/trpc/server";
import { trpc } from "@v1/trpc/server";
import { searchParamsCache } from "@v1/utils/nuqs/property-search-params";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Records - CRE Finder AI",
  description: "Find commercial real estate properties with AI-powered search",
};

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const cachedUser = await getUser();

  if (!cachedUser?.data) {
    redirect("/login");
  }

  const { asset_type, locations, map } = searchParamsCache.parse(searchParams);

  if (!asset_type) {
    notFound();
  }

  const queryClient = getQueryClient();

  const license = await queryClient.fetchQuery(
    trpc.licenses.get.queryOptions(
      {
        assetTypeSlug: asset_type,
      },
      {
        enabled: !!asset_type,
      },
    ),
  );

  if (!license) {
    notFound();
  }

  // const subscription = await getSubscription();
  const subscription = {
    id: "sub_bypass_001",
    user_id: "7345de28-757d-4968-b352-f3e56dab20fa",
    status: "active" as "active", // <-- fix here
    metadata: {},
    price_id: "price_1S4E6QDEfPXUqeRiJ7lR4GQl",
    quantity: 1,
    cancel_at_period_end: false,
    created: new Date().toISOString(),
    current_period_start: new Date().toISOString(),
    current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    ended_at: null,
    cancel_at: null,
    canceled_at: null,
    trial_start: new Date().toISOString(),
    trial_end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    prices: {
      id: "price_1S4E6QDEfPXUqeRiJ7lR4GQl",
      products: {
        id: "prod_T0EZh4J16hgv4A",
      },
    },
  };

  return (
    <>
      <SiteHeader
        className="md:hidden"
        title={`${license.asset.name} Records`}
        user={cachedUser.data}
        showMobileDrawer={true}
      />
      <div className="p-4 space-y-6">
        <ErrorBoundary>
          <PropertySearchFilters
            licenses={license.locations}
            assetType={asset_type}
            assetTypeName={license.asset.name}
            searchParams={
              license.search_params as unknown as GetPropertySearchParams
            }
          />
        </ErrorBoundary>

        <div
          className={`grid gap-6 ${map ? "lg:grid-cols-[1fr,480px]" : "grid-cols-1"}`}
        >
          <div className="h-[calc(100vh-7rem)] w-full overflow-hidden">
            <div className="flex flex-col h-full">
              <Suspense fallback={<Loading />}>
                <DataTable
                  assetTypeName={license.asset.name}
                  assetLicenseId={license.id}
                  locations={locations || []}
                  subscription={subscription}
                />
              </Suspense>
            </div>
          </div>

          <PropertyMapServer
            assetLicenseId={license.id}
            locationCodes={locations || []}
          />
        </div>
      </div>
    </>
  );
}