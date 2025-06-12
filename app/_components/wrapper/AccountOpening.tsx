import LongButton from "../ui/units/buttons/LongButton";
import PageTitle from "../ui/units/PageTitle";
import AccountStatsCard from "../cards/AccountStatsCard";
import TableWrapper from "./TableWrapper";
interface AccountStatsSummary {
  icon: string;
  title: string;
  value: string;
  color: string;
}

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

const AccountOpening = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex  w-full justify-between gap-12">
        <PageTitle MainTitle={"Dot MFB Account Opening"} />
        <LongButton icon={"/icons/add.svg"} text={"Open Dot MFB Account"} />
      </div>

      <div className="grid grid-cols-3 gap-4">
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
        <TableWrapper />
      </div>
    </div>
  );
};

export default AccountOpening;
