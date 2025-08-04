'use client'
import TanStackTable from "@/app/_components/table/Table";
import { dummyLoanData } from "@/app/_data/RemittanceData";
import { LoanColumns } from "./_components/Columns";
import { useState } from 'react'

const Page = () => {
 const [selectedRowsId, setSelectedRowsId] = useState<string[]>([])

 const columns = LoanColumns({setSelectedRowsId, selectedRowsId})

  return (
    <div className="lg:ml-68 mt-10 lg:w-[calc(100%-320px)]">
      <div ></div>
      <div className=" py-4 px-4 lg:px-0 rounded-2xl bg-white"> 
        <TanStackTable data={dummyLoanData} columns={columns} selectedRowsId={selectedRowsId} />
      </div>
    </div>
  );
};

export default Page;
