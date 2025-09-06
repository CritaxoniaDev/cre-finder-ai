import { unstable_cache } from "next/cache";
import { cache } from "react";
import {
  type GetPropertyRecordsParams,
  getPropertyRecordsQuery,
  getUserQuery,
} from ".";
import { createClient } from "../clients/server";

import { getSubscriptionQuery } from "./stripe";

export const getSession = cache(async () => {
  const supabase = createClient();

  return supabase.auth.getSession();
});

export const getUser = async () => {
  const {
    data: { session },
  } = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const supabase = createClient();

  return unstable_cache(
    async () => {
      return getUserQuery(supabase, userId);
    },
    ["user", userId],
    {
      tags: [`user_${userId}`],
      revalidate: 180,
    },
    // @ts-expect-error
  )(userId);
};

export const getSubscription = async () => {
  const supabase = createClient();
  const user = await getUser();

  if (!user?.data) {
    return null;
  }

  return unstable_cache(
    async () => {
      return getSubscriptionQuery(supabase);
    },
    ["subscriptions", user.data.id],
    {
      tags: [`subscriptions_${user.data.id}`],
      revalidate: 3600,
    },
  )();
};

export async function getPropertyRecords(params: GetPropertyRecordsParams) {
  const supabase = createClient();

  return unstable_cache(
    async () => {
      return getPropertyRecordsQuery(supabase, params);
    },
    ["property_records", params.assetLicenseId],
    {
      tags: [`property_records_${params.assetLicenseId}`],
      revalidate: 180,
    },
    // @ts-expect-error
  )(params);
}
