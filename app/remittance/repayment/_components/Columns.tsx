"use client";
import { DummyLoanData } from "@/app/_data/RemittanceData";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import clsx from "clsx";
import Image from "next/image";

interface LoanRowData extends DummyLoanData {
  id: string;
}

export const LoanColumns = ({
  setSelectedRowsId,
  selectedRowsId,
}: {
  setSelectedRowsId: React.Dispatch<React.SetStateAction<LoanRowData[]>>;
  selectedRowsId: LoanRowData[];
}): ColumnDef<DummyLoanData>[] => [
  {
    accessorKey: "customerName",
    id: "customerName",
    header: () => (
      <div className="uppercase text-xs font-medium text-[#667085] lg:px-6 lg:py-3 xl:text-left  ">
        Customer Name
      </div>
    ),
    cell: (cell) => {
      const value = cell.getValue() as string;
      const rowId = cell.row.id;
      const rowData = { id: rowId, ...cell.row.original };
      const settingSelectedRow = () => {
        const alreadySelected = selectedRowsId.some(
          (item) => item.id === rowId
        );

        if (alreadySelected) {
          const newArry = selectedRowsId.filter((row) => row.id !== rowId);
          setSelectedRowsId(newArry);
        } else {
          setSelectedRowsId((prev: LoanRowData[]) => [...prev, rowData]);
          console.log(selectedRowsId);
        }
      };
      return (
        <div
          onClick={() => settingSelectedRow()}
          className="flex xl:px-6 py-4 gap-4 items-center font-medium text-base text-black cursor-pointer  "
        >
          <div
            className={clsx("w-4 h-4  rounded-sm", {
              "border border-[#D0D5DD]": !selectedRowsId.some(
                (item) => item.id === rowId
              ),
            })}
          >
            {selectedRowsId.some((item) => item.id === rowId) && (
              <Image
                src="/icons/table_checked.png"
                alt="/checked"
                width={16}
                height={16}
              />
            )}
          </div>
          {value}
        </div>
      );
    },
  },
  {
    accessorKey: "loanedAmount",
    id: "loanedAmount",
    header: () => (
      <div className="uppercase text-xs font-medium text-[#667085] lg:px-4 xl:px-6 lg:py-3 ">
        Amount
      </div>
    ),
    cell: (cell) => {
      const value = cell.getValue() as string;
      return (
        <div className="xl:px-6 py-4 text-[#667085] font-medium text-base">
          {value}
        </div>
      );
    },
  },
  {
    accessorKey: "repaidAmount",
    id: "repaidAmont",
    header: () => (
      <div className="uppercase text-xs font-medium text-[#667085] lg:px-4 xl:px-6 lg:py-3">
        REPAID
      </div>
    ),
    cell: (cell) => {
      const value = cell.getValue() as string;

      return (
        <div className="xl:px-6 py-4 text-[#667085] font-normal text-base">
          {value}
        </div>
      );
    },
  },
  {
    accessorKey: "tenure",
    id: "tenure",
    header: () => (
      <div className="uppercase text-xs font-medium text-[#667085] lg:px-4 xl:px-6 lg:py-3">
        {" "}
        Tenure
      </div>
    ),
    cell: (cell) => {
      const value = cell.getValue() as string;
      return (
        <div className="xl:px-6 py-4 text-[#667085] font-normal text-base">
          {" "}
          {value}
        </div>
      );
    },
  },
  {
    accessorKey: "instalment",
    id: "instalment",
    header: () => (
      <div className="uppercase text-xs font-medium text-[#667085] lg:px-4 xl:px-6 lg:py-3">
        Instalment
      </div>
    ),
    cell: (cell) => {
      const value = cell.getValue() as string;
      return (
        <div className="xl:px-6 py-4 text-[#667085] font-normal text-base">
          {" "}
          {value}{" "}
        </div>
      );
    },
  },
  {
    accessorKey: "overdue",
    id: "overdue",
    header: () => (
      <div className="uppercase text-xs font-medium text-[#667085] lg:px-4 xl:px-6 lg:py-3">
        {" "}
        Overdue
      </div>
    ),
    cell: (cell) => {
      const value = cell.getValue() as string;
      return (
        <div
          className={clsx("xl:px-6 py-4  font-normal text-base", {
            "text-[#667085]": value === "N/A",
            "text-red-400": value.trim() !== "N/A",
          })}
        >
          {value}
        </div>
      );
    },
  },
  {
    accessorKey: "repayment",
    id: "repayment",
    header: () => (
      <div className="uppercase text-xs font-medium text-[#667085] xl:px-6 lg:px-4 lg:py-3">
        Repayment
      </div>
    ),
    cell: (cell) => {
      const value = cell.getValue() as string;
      const { overdue } = cell.row.original;

      return (
        <div
          className={clsx("xl:px-6 py-4 text-[#667085] font-normal text-base", {
            "text-red-400": overdue !== "N/A",
          })}
        >
          {" "}
          {value}{" "}
        </div>
      );
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
