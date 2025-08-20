"use client";
import { DummyLoanData } from "@/app/_data/RemittanceData";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import clsx from "clsx";
import Image from "next/image";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";

interface LoanRowData extends DummyLoanData {
  currentPayment?: string;
}

export const LoanColumns = ({
  setSelectedRowsId,
  selectedRowsId,
  setIsModalOpen,
}: {
  setSelectedRowsId: React.Dispatch<React.SetStateAction<LoanRowData[]>>;
  selectedRowsId: LoanRowData[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}): ColumnDef<DummyLoanData>[] => [
  {
    accessorKey: "customerName",
    id: "customerName",
    header: () => (
      <div className="uppercase text-xs font-medium text-[#667085] lg:px-6 lg:py-3 xl:text-left  ">
        Customer Name
      </div>
    ),
    meta: {
      className: "hidden lg:table-cell",
    },
    cell: (cell) => {
      const {
        customerName,
        loanedAmount,
        repaidAmount,
        tenure,
        instalment,
        repayment,
      } = cell.row.original;
      const value = cell.getValue() as string;

      const { id } = cell.row.original;

      const rowData = { ...cell.row.original };
      const settingSelectedRow = () => {
        const alreadySelected = selectedRowsId.some((item) => item.id === id);

        if (alreadySelected) {
          const newArry = selectedRowsId.filter((row) => row.id !== id);
          setSelectedRowsId(newArry);
        } else {
          setSelectedRowsId((prev: LoanRowData[]) => [...prev, rowData]);
        }
      };
      const handleButtonClick = () => {
        console.log(id);
        settingSelectedRow();
        setIsModalOpen(true);
      };
      return (
        <div className="w-full  ">
          <div className="md:flex  hidden md:px-3 xl:px-6 md:py-2 xl:py-4 gap-4  items-center font-medium text-base text-black cursor-pointer  ">
            <button
              onClick={() => settingSelectedRow()}
              className={clsx("w-4 h-4  rounded-sm", {
                "border border-[#D0D5DD]": !selectedRowsId.some(
                  (item) => item.id === id
                ),
              })}
            >
              {selectedRowsId.some((item) => item.id === id) && (
                <Image
                  src="/icons/table_checked.png"
                  alt="/checked"
                  width={16}
                  height={16}
                />
              )}
            </button>
            <button onClick={() => handleButtonClick()}>{value}</button>
          </div>

          <div className="md:hidden mt-4 flex items-center w-full justify-between">
            <button
              onClick={() => settingSelectedRow()}
              className={clsx("w-4 h-4  rounded-sm", {
                "border border-[#D0D5DD]": !selectedRowsId.some(
                  (item) => item.id === id
                ),
              })}
            >
              {selectedRowsId.some((item) => item.id === id) && (
                <Image
                  src="/icons/table_checked.png"
                  alt="/checked"
                  width={16}
                  height={16}
                />
              )}
            </button>
            <div
              className={clsx(
                "w-11/12 rounded-xl  border overflow-hidden",
                selectedRowsId.some((item) => item.id === id)
                  ? "border-black"
                  : "border-border-[#EAEAEA]"
              )}
            >
              <div className=" top bg-[#f9f9f9] flex  flex-col-reverse xs:flex-row  justify-between gap-4 xs:gap-8 xs:px-8 xs:py-7 px-4 py-4">
                <div className="">
                  <h5 className=" text-black text-base font-medium mb-1">
                    {customerName}
                  </h5>
                  <div className="flex gap-2 text-xs text-[#667085]">
                    <span className="">
                      <Image
                        src={"/icons/offer_hand.png"}
                        alt={"instalment"}
                        width={10}
                        height={10}
                        className="inline mx-1"
                      />
                      Instalment: {instalment}
                    </span>
                    <span>
                      <Image
                        src={"/icons/calender.png"}
                        alt={"instalment"}
                        width={10}
                        height={10}
                        className="inline mx-1"
                      />
                      Repayment: {repayment}
                    </span>
                  </div>
                </div>
                <PrimaryButtons
                  text={"Add Customer"}
                  icon="/icons/addDark.png"
                  onClick={() => handleButtonClick()}
                  className="text-black bg-white border border-[#EAEAEA] rounded-lg xs:py-2 xs:px-4   flex items-center justify-center gap-4"
                />
               
              </div>
              <div className="bg-white flex justify-between xs:px-8 xs:py-7 px-4 py-4 font-medium">
                <div className="">
                  <h5 className="text-[#667085] text-xs font-medium">
                    Amount Loaned
                  </h5>
                  <p className="text-[#454547] text-sm">{loanedAmount}</p>
                </div>
                <div className="">
                  <h5 className="text-[#667085] text-xs font-medium">Repaid</h5>
                  <p className="text-[#454547] text-sm">{repaidAmount}</p>
                </div>
                <div className="">
                  <h5 className="text-[#667085] text-xs font-medium">
                    {" "}
                    Tenure
                  </h5>
                  <p className="text-[#454547] text-sm">{tenure}</p>
                </div>
              </div>
            </div>
          </div>
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
    meta: {
      className: "hidden lg:table-cell",
    },
    cell: (cell) => {
      const value = cell.getValue() as string;
      const rowData = { ...cell.row.original };
      const settingSelectedRow = () => {
        setSelectedRowsId([rowData]);
      };
      const handleButtonClick = () => {
        settingSelectedRow();
        setIsModalOpen(true);
      };
      return (
        <button
          onClick={handleButtonClick}
          className="xl:px-6 xl:py-4 md:px-3 md:py-2 hidden md:table-cell text-[#667085] font-medium text-base"
        >
          {value}
        </button>
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
    meta: {
      className: "hidden lg:table-cell",
    },
    cell: (cell) => {
      const value = cell.getValue() as string;
      const rowData = { ...cell.row.original };
      const settingSelectedRow = () => {
        setSelectedRowsId([rowData]);
      };
      const handleButtonClick = () => {
        settingSelectedRow();
        setIsModalOpen(true);
      };
      return (
        <button
          onClick={handleButtonClick}
          className="xl:px-6 xl:py-4 md:px-3 md:py-2 hidden md:table-cell text-[#667085] font-normal text-base"
        >
          {value}
        </button>
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
    meta: {
      className: "hidden lg:table-cell",
    },
    cell: (cell) => {
      const value = cell.getValue() as string;
      const rowData = { ...cell.row.original };
      const settingSelectedRow = () => {
        setSelectedRowsId([rowData]);
      };
      const handleButtonClick = () => {
        settingSelectedRow();
        setIsModalOpen(true);
      };
      return (
        <button
          onClick={handleButtonClick}
          className="xl:px-6 xl:py-4 md:px-3  md:py-2 hidden md:table-cell text-[#667085] font-normal text-base"
        >
          {" "}
          {value}
        </button>
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
    meta: {
      className: "hidden lg:table-cell",
    },
    cell: (cell) => {
      const value = cell.getValue() as string;
      const rowData = { ...cell.row.original };
      const settingSelectedRow = () => {
        setSelectedRowsId([rowData]);
      };
      const handleButtonClick = () => {
        settingSelectedRow();
        setIsModalOpen(true);
      };
      return (
        <button
          onClick={handleButtonClick}
          className="xl:px-6 xl:py-4 md:px-3 md:py-2 hidden md:table-cell text-[#667085] font-normal text-base"
        >
          {" "}
          {value}{" "}
        </button>
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
    meta: {
      className: "hidden lg:table-cell",
    },
    cell: (cell) => {
      const value = cell.getValue() as string;
      const rowData = { ...cell.row.original };
      const settingSelectedRow = () => {
        setSelectedRowsId([rowData]);
      };
      const handleButtonClick = () => {
        settingSelectedRow();
        setIsModalOpen(true);
      };
      return (
        <button
          onClick={handleButtonClick}
          className={clsx(
            "xl:px-6 xl:py-4 md:px-3 md:py-2 hidden md:table-cell font-normal text-base",
            {
              "text-[#667085]": value === "N/A",
              "text-red-400": value.trim() !== "N/A",
            }
          )}
        >
          {value}
        </button>
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
    meta: {
      className: "hidden lg:table-cell",
    },
    cell: (cell) => {
      const value = cell.getValue() as string;
      const { overdue } = cell.row.original;
      const rowData = { ...cell.row.original };
      const settingSelectedRow = () => {
        setSelectedRowsId([rowData]);
      };
      const handleButtonClick = () => {
        settingSelectedRow();
        setIsModalOpen(true);
      };
      return (
        <button
          onClick={handleButtonClick}
          className={clsx(
            "xl:px-6 xl:py-4 md:px-3 md:py-2 hidden md:table-cell text-[#667085] font-normal text-base",
            {
              "text-red-400": overdue !== "N/A",
            }
          )}
        >
          {" "}
          {value}{" "}
        </button>
      );
    },
  },
  {
    accessorKey: "more",
    id: "more",
    header: () => <div className=""></div>,
    meta: {
      className: "hidden lg:table-cell",
    },
    cell: () => {
      return (
        <div className="text-[#667085] relative hidden md:px-4 xl:py-6 md:py-2 lg:flex flex-col gap-0 ">
          <button className="rotate-90">...</button>
        </div>
      );
    },
  },
];
