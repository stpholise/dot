import clsx from "clsx";
import Image from "next/image";
import { cn } from "../ui/units/utility/merger";
interface AccountStatsSummary {
  icon: string;
  title: string;
  value: string;
  color: string;
}

const AccountStatsCard = ({
  icon,
  title,
  value,
  color,
}: AccountStatsSummary) => {
  return (
    <div className={cn("flex gap-4 h-32 w-full sm:w-[327px] md:w-auto rounded-2xl p-4 border border-[#ECF4FE]", color)}>
      <div  >
        <Image
          alt={title}
          src={icon}
          height={40}
          width={40} 
        />
      </div>
      <div className=" flex flex-col gap-2">
        <p className="text-sm font-medium text-[#6D6D6D]"> {title}</p>
        <p className="text-black text-4xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default AccountStatsCard;
