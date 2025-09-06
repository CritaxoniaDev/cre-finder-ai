import { LicensePreview } from "@/components/license-preview";
import { SearchLoading } from "@/components/search-loading";
import { SiteHeader } from "@/components/site-header";
import { getUser } from "@v1/supabase/cached-queries";
import { searchParamsCache } from "@v1/utils/nuqs/property-search-params";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Search - CRE Finder AI",
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

  const { locations, asset_type } = searchParamsCache.parse(searchParams);

  if (!asset_type || !locations?.length) {
    return notFound();
  }

  return (
    <>
      <SiteHeader
        className="md:hidden"
        title="Preview Search"
        user={cachedUser.data}
        showMobileDrawer={true}
      />
      <div className="p-3 sm:p-4 lg:p-6 pb-12 sm:pb-16 space-y-4 sm:space-y-6">
        <div className="relative overflow-hidden">
          <Suspense>
            <LicensePreview />
          </Suspense>

          <SearchLoading isEmpty />
        </div>
      </div>
    </>
  );
}
