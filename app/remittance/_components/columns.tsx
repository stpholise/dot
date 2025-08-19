"use client";
import { DummyRemittance } from "@/app/_data/RemittanceData";
import { ColumnDef} from "@tanstack/react-table";
 
import clsx from "clsx";

 
export const remittanceColumn = ({
  setSelectedRowData,
  setIsModalOpen,
}: {
  setSelectedRowData: (row: DummyRemittance) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}): ColumnDef<DummyRemittance >[] => [
  {
    accessorKey: "sn",
    id: "sn",
    header: () => (
      <div className="px-4  py-2 text-left font-medium text-gray-600">S/N</div>
    ),
    meta: {
      className: "hidden lg:table-cell",
    },
    cell: (cell) => {
      const value = cell.getValue() as string;

      return (
        <div className=" text-[#667085]  hidden lg:table-cell px-4 py-4 ">
          #<span className="sm:hidden"> Number: </span>
          {value}
        </div>
      );
    },
  },
  {
    accessorKey: "remittanceName",
    header: () => (
      <div className="px-4 py-2 text-left font-medium text-gray-600 col-span-5">
        REMITTANCE NAME
      </div>
    ),
    meta: {
      className: "hidden lg:table-cell",
    },

    cell: (cell) => {
      const {
        sn,
        remittanceAmount,
        remittanceDate,
        remittanceStatus,
        remittanceTime,
      } = cell.row.original;
      const value = cell.getValue() as string;
      const color =
        remittanceStatus == "Submitted"
          ? "bg-[#ECFDF3] text-[#027A48]  "
          : "text-[#AF9401] bg-[#FEFBEB]";
      return (
        <div className="w-full">
          <div className="text-black hidden lg:table-cell sm:text-[#667085]   lg:w-full px-4 py-6 ">
            <p className=" text-base"> {value}</p>
          </div>
          <div className="text-gray-900 lg:hidden  w-11/12 mx-auto my-2">
            <div className="bg-[#f9f9f9] border border-[#EAEAEA] w-full rounded-t-2xl px-6 py-4 flex justify-between">
              <div className="">
                <p className="text-lg font-semibold text-black">{value}</p>
                <div className="text-[#667085] text-xs"># Number: {sn}</div>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedRowData(cell.row.original);
                }}
                className="w-40 h-12 rounded-lg bg-white border border-[#eaeaea] font-medium text-[#344054] text-base"
              >
                View Details
              </button>
            </div>
            <div className="w-full h-24 flex items-center px-6 py-6 border-[#eaeaea] border rounded-b-lg">
              <div className="flex-1">
                <p className="text-[#667085] text-xs leading-8">
                  Remittance Amount
                </p>
                <p className="text-[#454547] text-sm"></p>
                {remittanceAmount}{" "}
              </div>
              <div className="flex-1">
                <p className="text-[#667085] text-xs leading-8">Date & Time</p>
                <p className="text-[#454547] text-sm">
                  {remittanceDate + " " + remittanceTime}
                </p>
              </div>
              <div className="flex-1 text-right ">
                <p className="text-[#667085] text-xs px-3 leading-8">Status</p>

                <div
                  className={`ml-auto flex items-center justify-end gap-2 w-fit rounded-2xl px-3 py-1 text-[#454547] text-sm ${color} `}
                >
                  <div
                    className={clsx(
                      "rounded-full size-1",
                      remittanceStatus === "Submitted"
                        ? "border-[#027A48] border-2"
                        : "bg-[#AF9401]"
                    )}
                  ></div>
                  <p>{remittanceStatus}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "remittanceAmount",
    id: "remittanceAmount",
    header: () => (
      <div className="px-4 py-2 text-right font-medium text-gray-600">
        REMITTANCE AMOUNT
      </div>
    ),
    meta: {
      className: "hidden lg:table-cell",
    },
    cell: (cell) => {
      const value = cell.getValue() as string;
      return (
        <div className="hidden lg:flex justify-end w-full lg:w-full  text-right  px-4 py-6">
          <span className="text-[#667085] text-base text-right">{value}</span>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => `${row.remittanceTime}  ${row.remittanceDate}`,
    id: "date",
    header: () => (
      <div className="px-4 py-2 text-left font-medium text-gray-600">
        
        DATE & TIME
      </div>
    ),
    meta: {
      className: "hidden lg:table-cell",
    },
    cell: ({ row }) => {
      const remittanceDate = row.original.remittanceDate;
      const remittanceTime = row.original.remittanceTime;
      return (
        <div className="hidden lg:flex text-base text-[#667085] px-4 py-6">
          {remittanceTime} - {remittanceDate}
        </div>
      );
    },
  },
  {
    accessorKey: "remittanceStatus",
    id: "remittanceStatus",
    header: () => (
      <div className="px-4 py-2 text-left font-medium text-gray-600">
        STATUS
      </div>
    ),
    meta: {
      className: "hidden lg:table-cell",
    },
    cell: (cell) => {
      const value = cell.getValue() as string;
      const color =
        value == "Submitted"
          ? "bg-[#ECFDF3] text-[#027A48]  "
          : "text-[#AF9401] bg-[#FEFBEB]";
      return (
        <div className="px-4 py-6">
          <div
            className={`  font-medium text-sm hidden lg:flex items-center justify-center gap-2 w-fit rounded-xl px-3 py-1 ${color}`}
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
        </div>
      );
    },
  },
  {
    accessorKey: "more",
    header: "",
    meta: {
      className: "hidden lg:table-cell",
    },
    cell: () => {
      return (
        <div className="text-[#667085] rotate-90 hidden lg:table-cell px-4 py-6 ">
          ...
        </div>
      );
    },
  },
];
