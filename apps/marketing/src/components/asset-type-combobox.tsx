"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import type { Tables } from "@v1/supabase/types";
import { useTRPC } from "@v1/trpc/client";
import { Badge } from "@v1/ui/badge";
import { Button } from "@v1/ui/button";
import { Checkbox } from "@v1/ui/checkbox";
import { cn } from "@v1/ui/cn";
import { Popover, PopoverContent, PopoverTrigger } from "@v1/ui/popover";
import { ScrollArea } from "@v1/ui/scroll-area";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface AssetTypeComboboxProps {
  value?: string | null | undefined;
  onValueChange: (assetTypeSlug?: string | null) => void;
  placeholder?: string;
  className?: string;
}

export function AssetTypeCombobox({
  value,
  onValueChange,
  placeholder = "Select property type...",
  className,
}: AssetTypeComboboxProps) {
  const [open, setOpen] = useState(false);
  const [expandedAssetType, setExpandedAssetType] = useState<string | null>(
    null,
  );

  const trpc = useTRPC();
  const { data: assetTypesData } = useSuspenseQuery(
    trpc.assetTypes.list.queryOptions(),
  );

  const assetTypes = assetTypesData || [];

  const selectedAssetType = assetTypes.find((type) => type.slug === value);

  const handleAssetTypeSelect = (assetTypeSlug: string) => {
    if (value !== assetTypeSlug) {
      onValueChange(assetTypeSlug);
    } else {
      onValueChange(null);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-left font-normal",
            !selectedAssetType && "text-muted-foreground",
            className,
          )}
        >
          <span>
            {selectedAssetType ? selectedAssetType.name : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <ScrollArea className="h-[420px]">
          <div className="p-2">
            {assetTypes.map((assetType) => {
              const isSelected = value === assetType.slug;

              return (
                <div key={assetType.slug} className="mb-1">
                  <div className="flex items-center px-2 gap-2 rounded-md hover:bg-accent">
                    <Checkbox
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAssetTypeSelect(assetType.slug!);
                      }}
                      checked={isSelected}
                      className="h-4 w-4"
                    />
                    <div className="flex flex-col flex-1 py-2">
                      <span className="text-sm font-medium">
                        {assetType.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
