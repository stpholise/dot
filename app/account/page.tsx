"use client";
import AccountStatsCard from "../_components/ui/cards/Status";
import TanStackTable from "../_components/table/Table";
import PageTitle from "../_components/ui/units/PageTitle";
import LongButton from "../_components/ui/units/buttons/SecondaryButton";
import { columns } from "./_components/column";
import { dummyUsers } from "../_data/TableData";
import { useRouter } from "next/navigation";

interface AccountStatsSummary {
  icon: string;
  title: string;
  value: string;
  color: string;
}
const Page = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/account/create-account");
  };
  return (
    <div className="bg-[#FAF9F9] text-black min-h-screen w-screen">
      <div className="lg:ml-68 mt-10 lg:w-[calc(100%-320px)] py-4 px-4 lg:px-1">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row w-full justify-between items-center gap-4 md:gap-12">
            <PageTitle MainTitle={"Dot MFB Account Opening"} />
            <LongButton
              icon={"/icons/add.svg"}
              text={"Open Dot MFB Account"}
              onClick={handleClick}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4 items-center justify-center md:justify-between">
            {accountStatsSummary.map((item) => (
              <AccountStatsCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                color={item.color}
                value={item.value}
              />
            ))}
          </div>
          <div className="">
            <div className="bg-white rounded-3xl py-4 ">
              <TanStackTable columns={columns} data={dummyUsers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const accountStatsSummary: AccountStatsSummary[] = [
  {
    icon: "/icons/person_heart.svg",
    title: "Total Accounts",
    value: "2,900",
    color: "bg-[#ECF4FE] border border-[#B0CFFC]",
  },
  {
    icon: "/icons/person_good.svg",
    title: "Accounts with BVN",
    value: "1,623",
    color: "bg-[#F0FEFA] border border-[#B5F7E5]",
  },
  {
    icon: "/icons/person_add.svg",
    title: "Accounts without BVN",
    value: "807",
    color: "bg-[#FEFBEB] border border-[#FCE273]",
  },
];

export default Page;
