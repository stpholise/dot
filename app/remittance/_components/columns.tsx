"use client";
import { DummyRemittance } from "@/app/_data/RemittanceData";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

export const remittanceColumn: ColumnDef<DummyRemittance>[] = [
  {
    accessorKey: "sn",
    header: "S/N",
    cell: (cell) => {
      const value = cell.getValue() as string;

      return <span className=" text-[#667085]">#<span className="sm:hidden"> Number: </span>{value}</span>;
    },
  },
  {
    accessorKey: "remittanceName",
    header: "REMITTANCE NAME",
    cell: (cell) => {
      const value = cell.getValue() as string;
      return <span className="text-black sm:text-[#667085] inline lg:w-full"> {value}</span>;
    },
  },
  {
    accessorKey: "remittanceAmount",
    header: "REMITTANCE AMOUT",
    cell: (cell) => {
      const value = cell.getValue() as string;
      return (
        <div className=" w-full lg:w-10/12 text-right px-4">
          <span className="text-[#667085] text-right">{value}</span>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => `${row.remittanceTime}  ${row.remittanceDate}`,
    header: " DATE & TIME",
    cell: ({ row }) => {
      const remittanceDate = row.original.remittanceDate;
      const remittanceTime = row.original.remittanceTime;
      return (
        <span className="text-[#667085]">
          {remittanceTime} - {remittanceDate}
        </span>
      );
    },
  },
  {
    accessorKey: "remittanceStatus",
    header: "STATUS",
    cell: (cell) => {
      const value = cell.getValue() as string;
      const color =
        value == "Submitted"
          ? "bg-[#ECFDF3] text-[#027A48]  "
          : "text-[#AF9401] bg-[#FEFBEB]";
      return ( 
          <div
            className={`font-medium text-sm flex items-center justify-center gap-2 w-fit rounded-xl px-3 py-1 ${color}`}
          >
            {" "}
            <span
              className={clsx(
                "rounded-full w-1 h-1",
                value === "Submitted"
                  ? "border-[#027A48] border-2"
                  : "bg-[#AF9401]"
              )}
            ></span>{" "}
            {value}
          </div> 
      );
    },
  },
  {
    accessorKey: "more",
    header: "",
    cell: () => {
      return <div className="text-[#667085] ">...</div>;
    },
  },
];
