"use client";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type SortingState,
  type ColumnDef,
} from "@tanstack/react-table";
import { getPaginationRange } from "./PaginationRange";
import React, { useMemo, useState } from "react";
import clsx from "clsx";
import Image from "next/image";

type TanStackTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  sortByValues?: {
    value: string;
    label: string;
  }[];
  selectedRowsId?: T[];
  onRowClick?: (row: T) => void;
  enableSearch?: boolean;
};

const TanStackTable = <T,>({
  data,
  columns,
  onRowClick,
  sortByValues,
  selectedRowsId,
  enableSearch,
}: TanStackTableProps<T>) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnsMemo = useMemo(() => columns, [columns]);
  const dataMemo = useMemo(() => data, [data]);

  const table = useReactTable({
    data: dataMemo,
    columns: columnsMemo,
    state: {
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    enableRowSelection: true,
    onRowSelectionChange: () => {
      const selectedRows = table
        .getSelectedRowModel()
        .rows.map((row) => row.original);
      console.log(selectedRows);
    },
  });

  const currentPage = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();
  const paginationRange = getPaginationRange(currentPage, totalPages, 6);

  return (
    <div className="p-4 lg:p-0">
      <div className=" p-4 flex items-center outline-none justify-between ">
        <div className="flex sm:flex-row flex-col gap-4 lg:gap-9">
          {sortByValues && (
            <div className="flex gap-2 w-40 text-gray-500 border border-[#d2d5e1] rounded-lg py-2 px-3">
              <p className="text-black">All</p>
              <select
                onChange={(e) =>
                  setSorting([{ id: e.target.value, desc: false }])
                }
                className="outline-none w-8/10"
              >
                <option value="">Sort by</option>

                {sortByValues.map((val: { value: string; label: string }) => (
                  <option value={val.value} key={val.value}>
                    {val.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          {enableSearch && (
            <div className="xs:w-80 w-full h-10 border border-[#D2D5E1] rounded-lg">
              <input
                type="text"
                placeholder="Search..."
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="mb-4 px-3 py-2   w-full  outline-none text-black"
              />
            </div>
          )}
        </div>
      </div>
      <div className="w-full overflow-x-auto lg:overflow-x-hidden">
        <table className="min-w-full  text-sm ">
          <thead className="bg-[#FAFAFA] border-y border-[#EAEAEA]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={
                      (header.column.columnDef.meta as { className?: string })
                        ?.className
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <tr
                  className={clsx("table-row lg:border-b border-[#eaeaea] ", {
                    "md:bg-[rgba(0,0,0,0.05)]": selectedRowsId?.some(
                      (item) => (item as { id: string }).id === row.id
                    ),
                    "bg-transparent": !selectedRowsId?.some(
                      (item) => (item as { id: string }).id === row.id
                    ),
                    "cursor-pointer ": onRowClick,
                  })}
                  onClick={() => {
                    if (window.innerWidth > 860 && onRowClick) {
                      onRowClick(row.original);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className=" table-cell ">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-4 text-sm">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className={clsx("px-3 cursor-pointer py-1 border border-[#D0D5DD] rounded-lg  flex items-center justify-center gap-1 text-sm disabled:opacity-50 outline-none text-[#344054]", {
          })}
        >
          Previous
        </button>

        <div className="flex items-center gap-1">
          {paginationRange.map((page, i) =>
            page === "..." ? (
              <span key={`ellipsis-${i}`} className="px-2 text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => table.setPageIndex(page)}
                className={`px-3 py-1 rounded border ${
                  table.getState().pagination.pageIndex === page
                    ? "bg-black text-white cursor-pointer"
                    : "bg-white text-black border-gray-300 cursor-pointer"
                }`}
              >
                {page + 1}
              </button>
            )
          )}
        </div>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 cursor-pointer py-1 border border-[#D0D5DD] rounded-lg  flex items-center justify-center gap-1 text-sm disabled:opacity-50 outline-none text-[#344054]"
        >
          Next
          <Image
            src={"/icons/arrow-right.png"}
            alt={"next"}
            width={16}
            height={16}
            className="inline-block ml-1"
          />
        </button>
      </div>
    </div>
  );
};

export default TanStackTable;
