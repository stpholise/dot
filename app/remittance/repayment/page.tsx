"use client";
import TanStackTable from "@/app/_components/table/Table";
import { dummyLoanData, DummyLoanData } from "@/app/_data/RemittanceData";
import { LoanColumns } from "./_components/Columns";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Modal from "./_components/Modal";
import PopModal from "./_components/PopModal";
import Image from "next/image";

export interface LoanRowData extends DummyLoanData {
  id: string;
}

const Page = () => {
  const pathname = usePathname();
  const [selectedRowsId, setSelectedRowsId] = useState<LoanRowData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const columns = LoanColumns({
    setSelectedRowsId,
    selectedRowsId,
    setIsModalOpen,
  });

  const handleModalOpening = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <div className=" ">
          <PopModal
            setIsModalOpen={setIsModalOpen}
            selectedRowsItems={selectedRowsId}
            setSelectedRowsItems={setSelectedRowsId}
          />
        </div>
      )}
      <div className="lg:ml-68 mt-10 lg:w-[calc(100%-320px)]">
        <div className="flex justify-between items-center mb-8">
          <div className="">
            <p className="text-sm text-black capitalize">
              {pathname.replace("/", " ")}
            </p>
            <div className="text-black text-3xl font-medium flex gap-2">
              <div className=" size-9 rounded-lg bg-white p-2 border border-[#D0D5DD] ">
                <Image
                  src={"/icons/arrow_back.png"}
                  alt={"prev"}
                  width={20}
                  height={16}
                />
              </div>{" "}
              Loan Repayment
            </div>
          </div>
          <button
            onClick={handleModalOpening}
            className="w-56 rounded-lg bg-black gap-2 flex px-4 py-2.5"
          >
            Selected customers
            <p className="flex items-center justify-center text-sm w-8 h-7 rounded-sm bg-white text-black font-medium">
              {selectedRowsId.length}
            </p>
          </button>
        </div>

        <div className=" py-4 px-4 lg:px-0 rounded-2xl bg-white">
          <TanStackTable
            data={dummyLoanData}
            columns={columns}
            selectedRowsId={selectedRowsId}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
