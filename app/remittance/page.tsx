"use client";
// import RemittanceTable from "../_components/table/RemittanceTable";
import TanStackTable from "../_components/table/Table";
import { remittanceColumn } from "./_components/columns";
import { dummyRemittance, DummyRemittance } from "../_data/RemittanceData";
import { useState } from "react";
import Modal from "./_components/Modal";

const Page = () => {
  const [selectedRowData, setSelectedRowData] = useState<
    DummyRemittance | undefined
  >(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleRowClick = (data: DummyRemittance) => {
    console.log(data);
    setSelectedRowData(data);
    setIsModalOpen(true);
  };

  return (
    <div>
      page
      {isModalOpen && (
        <div
          className=" "
          
        >
          <Modal
            setIsModalOpen={setIsModalOpen} 
            selectedRowData={selectedRowData}
          />
         
        </div>
      )}
      <div className="lg:ml-68 mt-10 lg:w-[calc(100%-320px)] py-4 px-4 lg:px-0 rounded-2xl bg-white">
        <TanStackTable
          columns={remittanceColumn}
          data={dummyRemittance}
          sortByValues={sortByValues}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};

const sortByValues: { label: string; value: string }[] = [
  {
    value: "sn",
    label: "S/N",
  },
  {
    value: "remittanceName",
    label: "Remittance Name",
  },
];
export default Page;
