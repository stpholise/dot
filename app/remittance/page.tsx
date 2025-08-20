"use client";
// import RemittanceTable from "../_components/table/RemittanceTable";
import TanStackTable from "../_components/table/Table";
import { remittanceColumn } from "./_components/columns";
import { dummyRemittance, DummyRemittance } from "../_data/RemittanceData";
import { useState } from "react";
import Modal from "./_components/Modal";
import PrimaryButtons from "../_components/ui/units/buttons/PrimaryButtons";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Page = () => {
  const router = useRouter();
  const [selectedRowData, setSelectedRowData] = useState<
    DummyRemittance | undefined
  >(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const columns = remittanceColumn({ setSelectedRowData, setIsModalOpen });
  const handleRowClick = (data: DummyRemittance) => {
    setSelectedRowData(data);
    setIsModalOpen(true);
  };
  const singleRemittance = useSelector(
    (state: RootState) => state.remittance.createdRemittance
  );

  const tableData: DummyRemittance[] = singleRemittance
    ? [...singleRemittance, ...dummyRemittance]
    : dummyRemittance;

  return (
    <div>
      {isModalOpen && (
        <div className=" ">
          <Modal
            setIsModalOpen={setIsModalOpen}
            selectedRowData={selectedRowData}
          />
        </div>
      )}
      <div className="lg:ml-68 mt-10 lg:w-[calc(100%-320px)] py-4 px-4 lg:px-0">
        <div className="flex flex-col xs:flex-row gap-4 justify-between mb-4 items-center py-4">
          <h1 className="text-black text-3xl font-medium">Remittance</h1>
          <PrimaryButtons
            text="Create Remittance"
            icon="/icons/add.svg"
            className="rounded-lg bg-black gap-2 flex px-5 py-2.5 flex-row-reverse"
            onClick={() => router.push("/remittance/repayment")}
          />
        </div>
        <div className=" rounded-2xl bg-white">
          <TanStackTable
            columns={columns}
            data={tableData}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
