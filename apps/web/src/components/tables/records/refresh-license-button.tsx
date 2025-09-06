"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@v1/trpc/client";
import { Button } from "@v1/ui/button";
import { toast } from "@v1/ui/sonner";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface RefreshLicenseButtonProps {
  assetLicenseId: string;
  totalResults: number;
}

export function RefreshLicenseButton({
  assetLicenseId,
  totalResults,
}: RefreshLicenseButtonProps) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const debouncedRefresh = useDebouncedCallback(() => {
    router.refresh();
    window.location.reload();
  }, 1000);

  const refreshLicenseMutation = useMutation(
    trpc.licenses.refresh.mutationOptions({
      onSuccess: () => {
        toast.success(
          "License refreshed successfully! Full search is now unlocked.",
        );

        // Invalidate relevant queries to refresh the UI
        queryClient.invalidateQueries({
          queryKey: trpc.credits.usage.queryKey(),
        });

        queryClient.invalidateQueries({
          queryKey: trpc.records.list.queryKey(),
        });

        debouncedRefresh();
      },
      onError: (error) => {
        toast.error(
          error.message || "Failed to refresh license. Please try again.",
        );
      },
    }),
  );

  const handleRefresh = () => {
    refreshLicenseMutation.mutate({ licenseId: assetLicenseId });
  };

  const additionalResults = totalResults - 5;

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 bg-transparent border-t border-border">
      <h3 className="text-base font-medium text-center mb-2">
        This search has {additionalResults.toLocaleString()} more results
      </h3>

      <p className="text-sm text-muted-foreground text-center mb-4 max-w-md">
        Your subscription is active but this search needs to be unlocked
      </p>

      <Button
        onClick={handleRefresh}
        size="default"
        disabled={refreshLicenseMutation.isPending}
        variant="outline"
        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
      >
        {refreshLicenseMutation.isPending
          ? "Processing..."
          : "Unlock Full Search"}
      </Button>
    </div>
  );
}
