"use client";

import { ExportAll } from "@/components/export-all-button";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  type PaginationState,
  type RowSelectionState,
  type Updater,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { getPropertyRecordsQuery } from "@v1/supabase/queries";
import type { Tables } from "@v1/supabase/types";
import { useTRPC } from "@v1/trpc/client";

import { ScrollArea, ScrollBar } from "@v1/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@v1/ui/table";
import { parsers } from "@v1/utils/nuqs/property-search-params";
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "nuqs";
import React, { use, useMemo, useState } from "react";
import { columns } from "./columns";
import { DataTableHeader } from "./data-table-header";
import { DataTablePagination } from "./data-table-pagination";
import { EmptyState, NoResults } from "./empty-states";
import { RecordsTableActionBar } from "./records-action-bar";
import { RefreshLicenseButton } from "./refresh-license-button";
import { TrialCtaButton } from "./trial-cta-button";

type Subscription = Tables<"subscriptions">;

type DataTableProps = {
  assetTypeName: string;
  assetLicenseId: string;
  locations: string[];
  subscription?: Subscription | null;
};

export function DataTable({
  assetTypeName,
  assetLicenseId,
  locations,
  subscription,
}: DataTableProps) {
  const [
    {
      q: query,

      params: filters,
    },
  ] = useQueryStates(parsers);

  const [sortParam] = useQueryState(
    "sort",
    parseAsString.withDefault("created_at:desc"),
  );

  const sort = sortParam.split(":") as [string, "desc" | "asc"];

  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withOptions({ shallow: false }).withDefault(1),
  );
  const [perPage, setPerPage] = useQueryState(
    "per_page",
    parseAsInteger.withOptions({ shallow: false }).withDefault(25),
  );

  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const trpc = useTRPC();
  const {
    data: { data, meta },
  } = useSuspenseQuery(
    trpc.records.list.queryOptions(
      {
        licenseId: assetLicenseId,
        locationCodes: locations,
        from,
        to,
        sort,
        searchQuery: query || undefined,
        filters: filters || undefined,
      },
      {
        enabled: !!assetLicenseId && !!locations?.length,
      },
    ),
  );

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const pagination: PaginationState = React.useMemo(() => {
    return {
      pageIndex: page - 1,
      pageSize: perPage,
    };
  }, [page, perPage]);

  const pageCount = useMemo(() => {
    if (!meta.count) {
      return 1;
    }

    return Math.ceil(meta.count / perPage);
  }, [meta.count, perPage]);

  const onPaginationChange = React.useCallback(
    (updaterOrValue: Updater<PaginationState>) => {
      if (typeof updaterOrValue === "function") {
        const newPagination = updaterOrValue(pagination);
        void setPage(newPagination.pageIndex + 1);
        void setPerPage(newPagination.pageSize);
      } else {
        void setPage(updaterOrValue.pageIndex + 1);
        void setPerPage(updaterOrValue.pageSize);
      }
    },
    [pagination, setPage, setPerPage],
  );

  // Check if results are limited due to trial mode
  const isTrialLimited = meta.count === 5 && meta.expectedTotalResultCount > 5;

  // Check if user is in trial mode
  const isTrial = subscription?.status === "trialing";

  const table = useReactTable({
    getRowId: (row) => row.id,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onPaginationChange,
    manualPagination: true,
    pageCount,
    state: {
      pagination,
      rowSelection,
    },
  });

  if (!data.length) {
    return <NoResults />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0">
        <ScrollArea hideScrollbar className="h-full rounded-md border">
          <Table divClassname="overflow-y-scroll">
            <DataTableHeader table={table} />
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="h-[45px]"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-3 md:px-4 py-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <NoResults />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Trial CTA - positioned after table rows and centered within the table */}
      {isTrial && isTrialLimited ? (
        <div className="w-full">
          <TrialCtaButton totalResults={meta.expectedTotalResultCount || 0} />
        </div>
      ) : isTrialLimited ? (
        <RefreshLicenseButton
          assetLicenseId={assetLicenseId}
          totalResults={meta.expectedTotalResultCount || 0}
        />
      ) : null}

      <div className="flex-shrink-0 flex flex-row items-center w-full">
        {table.getFilteredSelectedRowModel().rows.length === 0 ? (
          <ExportAll
            assetTypeName={assetTypeName}
            assetLicenseId={assetLicenseId}
            locations={locations}
          />
        ) : null}

        <DataTablePagination table={table} total={meta.count || 0} />

        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <RecordsTableActionBar table={table} assetTypeName={assetTypeName} />
        )}
      </div>
    </div>
  );
}
