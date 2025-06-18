import { OfferInfo } from "@/app/_data/OfferData";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../ui/units/utility/merger";
import clsx from "clsx";
import PrimaryButtons from "../ui/units/buttons/PrimaryButtons";
const OffersCard = ({ image, link, description, icon }: OfferInfo) => {
const dynamicBg = `[background:${icon.bg}]`;
  return (
    <div
      className={clsx(
        "lg:h-80  lg:w-80 md:w-[754px] md:max-w-[754px] w-full max-w-[327px] md:h-52 xs:h-[348px] xs:w-[327px] lg:py-7 py-4 xs:py-6 xs:bg-white rounded-2xl overflow-hidden flex lg:flex-col md:flex-row-reverse xs:flex-col flex-row lg:items-start md:items-centeru xs:items-start xs:justify-evenly items-center md:justify-between px-4 xs:px-0 gap-4 mt-4 ",
        {
          [`bg-[${icon.bg}]`]: icon,
        }
      )}
    >
      <div className=" hidden xs:flex lg:justify-center  md:justify-start justify-center lg:items-start md:items-center h-1/2  w-[327px]">
        <Image
          alt={image.alt}
          src={image.url}
          height={image.height}
          width={image.width}
          className={clsx("max-w-[359.42px]  object-contain  ", {
            [`w-[${image.width}px]`]: image.width,
            [`h-[${image.height}px]`]: image.height,
          })}
        />
      </div>
      <div
        className={cn(
          `xs:hidden  p-1 w-10 h-10 flex border-4 items-center justify-center  rounded-full bg-[${icon.bg}]` ,
         
          
        )}
      >
        <Image
          src={icon.url}
          alt={icon.alt}
          width={20}
          height={20}
          className=""
        />
      </div>
      <div className=" lg:px-8 lg:py-4 max-w-[359.42px] w-10/12 lg:h-1/2 md:w-8/12 lg:w-full md:p-12 xs:p-4 flex flex-col gap-6 ">
        <Link href={link.url} className="leading-snug flex items-center gap-2">
          <div className="">
            <h2 className="text-black xs:hidden font-medium"> {link.text}</h2>
            <p className="text-[#4F555F] xs:hidden"> 
              {description.length > 30
                ? description.slice(0, 22) + "..."
                : description}
            </p>
          </div>
          <Image
            src="/icons/chevron_right.svg"
            alt={link.text}
            width={24}
            height={24}
          />
        </Link>
        <p className="text-[#4F555F] hidden xs:block ">{description}</p>
        <div className="hidden xs:block">
          <PrimaryButtons
            url={link.url}
            text={link.text}
            border={true}
            icon={link.icon}
            bg={"md:text-black text-white  md:bg-white bg-black"}
          />
        </div>
      </div>
    </div>
  );
};

export default OffersCard;
