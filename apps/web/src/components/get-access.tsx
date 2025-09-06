"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useTRPC } from "@v1/trpc/client";
import { Button } from "@v1/ui/button";
import { toast } from "@v1/ui/sonner";
import { parsers } from "@v1/utils/nuqs/property-search-params";
import { useRouter } from "next/navigation";
import { useQueryStates } from "nuqs";

interface GetAccessButtonProps {
  disabled?: boolean;
}

export function GetAccessButton({ disabled = false }: GetAccessButtonProps) {
  const [{ asset_type, locations, params, use_codes }] =
    useQueryStates(parsers);

  const trpc = useTRPC();

  const router = useRouter();

  const queryClient = useQueryClient();
  const createLicense = useMutation(
    trpc.licenses.create.mutationOptions({
      onSuccess: () => {
        toast.success("License created successfully");
        queryClient.invalidateQueries({
          queryKey: trpc.licenses.list.queryKey(),
        });

        queryClient.invalidateQueries({
          queryKey: trpc.credits.usage.queryKey(),
        });

        router.push(
          `/dashboard/records?asset_type=${asset_type}&locations=${locations}`,
        );
      },
    }),
  );

  const handleCreateLicense = () => {
    createLicense.mutate({
      assetTypeSlug: asset_type!,
      locations: locations!,
      useCodes: use_codes,
      searchParams: params,
    });
  };

  return (
    <Button
      onClick={handleCreateLicense}
      disabled={disabled || createLicense.isPending}
      className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground"
    >
      Get Access
    </Button>
  );
}
