"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@v1/trpc/client";
import { Button } from "@v1/ui/button";
import { toast } from "@v1/ui/sonner";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
interface TrialCtaButtonProps {
  totalResults: number;
}

export function TrialCtaButton({ totalResults }: TrialCtaButtonProps) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const debouncedRefresh = useDebouncedCallback(() => {
    router.refresh();
    window.location.reload();
  }, 500);

  const endTrialMutation = useMutation(
    trpc.subscriptions.endTrial.mutationOptions({
      onSuccess: () => {
        toast.success(
          "Trial ended successfully! Your subscription is now active.",
        );

        // Invalidate relevant queries to refresh the UI
        queryClient.invalidateQueries({
          queryKey: trpc.credits.usage.queryKey(),
        });

        queryClient.invalidateQueries({
          queryKey: trpc.subscriptions.get.queryKey(),
        });

        debouncedRefresh();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to end trial. Please try again.");
      },
    }),
  );

  const handleUpgrade = () => {
    endTrialMutation.mutate();
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-b-md">
      <h3 className="text-lg font-semibold text-center mb-2">
        You're viewing only 5 of {totalResults} results
      </h3>

      <p className="text-sm text-muted-foreground text-center mb-4 max-w-md">
        Upgrade now to unlock all properties and discover your next investment
        opportunity
      </p>

      <Button
        onClick={handleUpgrade}
        size="lg"
        disabled={endTrialMutation.isPending}
        className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg"
      >
        {endTrialMutation.isPending ? "Processing..." : "Unlock All Results"}
      </Button>
    </div>
  );
}
