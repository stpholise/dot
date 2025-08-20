"use client";
import TanStackTable from "@/app/_components/table/Table";
import { dummyLoanData, DummyLoanData } from "@/app/_data/RemittanceData";
import { LoanColumns } from "./_components/Columns";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Modal from "./_components/Modal";
import PopModal from "./_components/PopModal";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export interface LoanRowData extends DummyLoanData {
  currentPayment?: string;
}

const Page = () => {
  const pathname = usePathname();
  const [selectedRowsId, setSelectedRowsId] = useState<LoanRowData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSideModalOpen, setIsSideModalOpen] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<LoanRowData[]>([]);
  const columns = LoanColumns({
    setSelectedRowsId,
    selectedRowsId,
    setIsModalOpen,
  });
  const selectedCustomer = useSelector(
    (state: RootState) => state.remittance.selectedCustomer
  );

  const router = useRouter();

  const handleModalOpening = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (selectedCustomer.length > 0) {
      const newData = dummyLoanData.filter(
        (item) => !selectedCustomer.some((customer) => customer.id === item.id)
      );
      setFilteredData(newData);
    } else {
      setFilteredData(dummyLoanData);
    }
  }, [selectedCustomer]);

  return (
    <>
      {isModalOpen && (
        <div className=" ">
          <PopModal
            setIsModalOpen={setIsModalOpen}
            selectedRowsItems={selectedRowsId}
            setIsSideModalOpen={setIsSideModalOpen}
            setSelectedRowsItems={setSelectedRowsId}
          />
        </div>
      )}
      {isSideModalOpen && (
        <div className="">
          <Modal
            setIsModalOpen={setIsSideModalOpen}
            selectedRowsItems={selectedRowsId}
            setSelectedRowsItems={setSelectedRowsId}
          />
        </div>
      )}
      <div className="lg:ml-68 mt-10 lg:w-[calc(100%-320px)]">
        <div className="flex justify-between xs:items-center items-start mb-8 flex-col xs:flex-row gap-4 px-4">
          <div className="">
            <p className="text-sm text-black capitalize">
              {pathname.replace("/", " ")}
            </p>
            <div className="text-black text-3xl font-medium flex gap-2">
              <div
                className=" size-9 rounded-lg bg-white p-2 border border-[#D0D5DD] "
                onClick={() => router.push("/remittance")}
              >
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
            onClick={() => setIsSideModalOpen(true)}
            className="w-56 rounded-lg bg-black gap-2 flex px-4 py-2.5"
          >
            Selected customers
            <p className="flex items-center justify-center text-sm w-8 h-7 rounded-sm bg-white text-black font-medium">
              {selectedCustomer.length}
            </p>
          </button>
        </div>

        <div className=" py-4 px-4 lg:px-0 rounded-2xl bg-white">
          <div
            className={clsx(
              "px-6 items-center justify-between",
              selectedRowsId.length > 0 ? "flex" : "hidden"
            )}
          >
            <p className="text-sm text-black capitalize">
              {selectedRowsId.length} Customers Selected
            </p>
            <button
              onClick={handleModalOpening}
              className=" rounded-lg bg-white text-black border border-[#D0D5DD] gap-2 flex item-center justify-center px-4 py-2"
            >
              Add to Remittance
            </button>
          </div>
          <TanStackTable
            data={filteredData}
            columns={columns}
            selectedRowsId={selectedRowsId}
            enableSearch={selectedRowsId.length > 0 ? false : true}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
