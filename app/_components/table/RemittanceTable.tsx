"use client";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,

} from "@tanstack/react-table";
import { remittanceColumn } from "@/app/remittance/_components/columns";
import { dummyRemittance } from "@/app/_data/RemittanceData";
// import { getPaginationRange } from "./PaginationRange";
// import { useMemo } from 'react'

const RemittanceTable = () => {
  const table = useReactTable({
    data: dummyRemittance,
    columns: remittanceColumn,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
     
  });

  return (
    <div>
      <div className="">
        <table className="w-full">
          <thead className="bg-[#FAFAFA] text-black">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )} 
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {
            <tbody className="text-[#667085]">
                {
                    table.getRowModel().rows.map((row) => (
                        <tr key={row.id} >
                                {
                                    row.getVisibleCells().map((cell) =>(
                                        <td key={cell.id} >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext() )}
                                        </td>
                                    ))
                                }
                        </tr>
                    ))
                }
            </tbody>
          }
        </table>
      </div>
    </div>
  );
};

export default RemittanceTable;
