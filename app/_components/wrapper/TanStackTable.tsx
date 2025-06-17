"use client";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type SortingState,
} from "@tanstack/react-table";
import { dummyUsers } from "@/app/_data/TableData";
import { columns } from "../ui/units/column";
import { getPaginationRange } from "../ui/units/PaginationRange";
import { useState } from "react";

const TanStackTable = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: dummyUsers,
    columns,
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
  });

  const currentPage = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();
  const paginationRange = getPaginationRange(currentPage, totalPages, 6);

  return (
    <div className="p-4 lg:p-0">
      <div className=" p-4 flex items-center outline-none justify-between ">
        <div className="flex lg:gap-9">
          <div className="flex gap-2 w-40 text-gray-500 border border-[#d2d5e1] rounded-lg py-2 px-3">
            <p className="text-black">All</p>
            <select
              onChange={(e) =>
                setSorting([{ id: e.target.value, desc: false }])
              }
              className="outline-none w-8/10"
            >
              <option value="">Sort by</option>
              <option value="sn">S/N</option>
              <option value="accountName">Account Name</option>
              <option value="createdAt">Created At</option>
            </select>
          </div>
          <div className="w-80 h-10 border border-[#D2D5E1] rounded-lg">
            <input
              type="text"
              placeholder="Search..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="mb-4 px-3 py-2   w-full  outline-none"
            />
          </div>
        </div>
      </div>
      <table className="min-w-full  text-sm">
        <thead className="bg-[#FAFAFA] border-y border-[#EAEAEA]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={"px-4 py-2 text-left font-medium text-gray-600"}
                  // onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    // asc: " 🔼",
                    // desc: " 🔽",
                   }[header.column.getIsSorted() as string] ?? null} 
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-[#eaeaea]  ">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-4 ">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between p-4 text-sm">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 border rounded disabled:opacity-50"
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
                    ? "bg-black text-white"
                    : "bg-white text-black border-gray-300"
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
          className="px-3 py-1 border border-gray-600 rounded disabled:opacity-50 outline-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TanStackTable;
