import { PreviewSearchInterface } from "@/components/preview-search-interface";
import { SiteHeader } from "@/components/site-header";
import { getUser } from "@v1/supabase/cached-queries";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { SearchParams } from "nuqs";

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

  return (
    <>
      <SiteHeader
        className="md:hidden"
        title="New Search"
        user={cachedUser.data}
        showMobileDrawer={true}
      />
      <div className="h-[calc(100vh-3.5rem)] overflow-hidden p-4 pt-8">
        <PreviewSearchInterface />
      </div>
    </>
  );
}
