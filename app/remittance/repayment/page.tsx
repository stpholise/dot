"use client";
import TanStackTable from "@/app/_components/table/Table";
import { dummyLoanData, DummyLoanData } from "@/app/_data/RemittanceData";
import { LoanColumns } from "./_components/Columns";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface LoanRowData extends DummyLoanData {
  id: string;
}

const Page = () => {
  const pathname = usePathname();
  const [selectedRowsId, setSelectedRowsId] = useState<LoanRowData[]>([]);

  const columns = LoanColumns({ setSelectedRowsId, selectedRowsId });

  return (
    <div className="lg:ml-68 mt-10 lg:w-[calc(100%-320px)]">
      <div className="flex justify-between items-center mb-8">
        <div className="">
          <p className="text-sm text-black capitalize">
            {pathname.replace("/", " ")}
          </p>
          <div className="">Loan Repayment</div>
        </div>
        <div
          className="
        w-56 rounded-lg bg-black gap-2 flex px-4 py-2.5"
        >
          Selected customers
          <p className="flex items-center justify-center text-sm w-8 h-7 rounded-sm bg-white text-black font-medium">
            {selectedRowsId.length}
          </p>
        </div>
      </div>
      <div className=" py-4 px-4 lg:px-0 rounded-2xl bg-white">
        <TanStackTable
          data={dummyLoanData}
          columns={columns}
          selectedRowsId={selectedRowsId}
        />
      </div>
    </div>
  );
};

export default Page;
