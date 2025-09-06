"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@v1/trpc/client";
import { Progress } from "@v1/ui/progress";
import { Skeleton } from "@v1/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";

export function CreditUsageSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm">
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-2 w-full bg-primary/10" />
    </div>
  );
}

export function CreditUsageCollapsedSkeleton() {
  return (
    <div className="flex justify-center">
      <div className="w-8 h-8 rounded-md bg-sidebar-accent/20 animate-pulse" />
    </div>
  );
}

export function CreditUsage() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.credits.usage.queryOptions());

  if (!data) {
    return null;
  }

  const usagePercentage =
    data.total_available > 0
      ? Math.min(
          Math.round((data.total_consumed / data.total_available) * 100),
          100,
        )
      : 0;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm">
        <span className="text-sidebar-foreground/70">
          {data.total_consumed} / {data.total_available} Searches
        </span>
      </div>
      <Progress value={usagePercentage} className="h-2 bg-primary/10" />
    </div>
  );
}

export function CreditUsageCollapsed() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.credits.usage.queryOptions());

  if (!data) {
    return null;
  }

  const usagePercentage =
    data.total_available > 0
      ? Math.min(
          Math.round((data.total_consumed / data.total_available) * 100),
          100,
        )
      : 0;

  return (
    <Link href="/dashboard/credits">
      <div className="space-y-1 hover:bg-muted p-0.5 rounded-lg">
        <div className="text-xs text-gray-600 text-center">
          {data.total_consumed} / {data.total_available}
        </div>
        <Progress value={usagePercentage} className="h-1" />
        <div className="text-xs text-gray-500 text-center">credits used</div>
      </div>
    </Link>
  );
}
