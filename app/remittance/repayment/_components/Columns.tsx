"use client";
import { DummyLoanData } from "@/app/_data/RemittanceData";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export const LoanColumns = ({
  setSelectedRowsId,
  selectedRowsId,
}: {
  setSelectedRowsId: React.Dispatch<React.SetStateAction<string[]>>;
  selectedRowsId: string[];
}): ColumnDef<DummyLoanData>[] => [
  {
    accessorKey: "customerName",
    id: "customerName",
    header: () => <div className="uppercase"> Customer Name</div>,
    cell: (cell) => {
      const value = cell.getValue() as string;
      const settingSelectedRow = () => {
        const rowId = cell.row.id;
        setSelectedRowsId((prev: string[]) => [...prev, rowId]);
        console.log(selectedRowsId);
      };
      return (
        <div onClick={() => settingSelectedRow()} className="flex">
          {" "}
          <div className="w-4 h-4 border border-red-400 rounded-sm"> </div>
          {value}
        </div>
      );
    },
  },
  {
    accessorKey: "loanedAmount",
    id: "loanedAmount",
    header: () => <div className="uppercase">Amount</div>,
    cell: (cell) => {
      const value = cell.getValue() as string;
      return <div className="">{value}</div>;
    },
  },
  {
    accessorKey: "repaidAmount",
    id: "repaidAmont",
    header: () => <div className="uppercase">REPAID</div>,
    cell: (cell) => {
      const value = cell.getValue() as string;

      return <div className="flex gap-4">{value}</div>;
    },
  },
  {
    accessorKey: "tenure",
    id: "tenure",
    header: () => <div className="uppercase"> Tenure</div>,
    cell: (cell) => {
      const value = cell.getValue() as string;
      return <div className=""> {value}</div>;
    },
  },
  {
    accessorKey: "instalment",
    id: "instalment",
    header: () => <div className="uppercase">Instalment</div>,
    cell: (cell) => {
      const value = cell.getValue() as string;
      return <div className=""> {value} </div>;
    },
  },
  {
    accessorKey: "overdue",
    id: "overdue",
    header: () => <div className="uppercase"> Overdue</div>,
    cell: (cell) => {
      const value = cell.getValue() as string;
      return <div className="">{value}</div>;
    },
  },
  {
    accessorKey: "repayment",
    id: "repayment",
    header: () => <div className="uppercase">Repayment</div>,
    cell: (cell) => {
      const value = cell.getValue() as string;
      <div className=""> {value} </div>;
    },
  },
  {
    accessorKey: "more",
    id: "more",
    header: () => <div className=""></div>,
    cell: () => {
      return (
        <div className="text-[#667085] hidden lg:table-cell px-4 py-6 ">
          ...
        </div>
      );
    },
  },
];
