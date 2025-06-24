import { OfferInfo } from "@/app/_data/OfferData";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import PrimaryButtons from "../../_components/ui/units/buttons/PrimaryButtons";

const OffersCard = ({ image, link, description, icon }: OfferInfo) => {
  console.log(icon);
  return (
    <div
      className={clsx(
        "lg:h-80   lg:w-80 md:w-[754px]  xs:border-[#E1E4EA] xs:border md:max-w-[754px]  md:h-52 sm:h-[348px] xs:w-[327px] 2xs:w-[327px] lg:py-6 py-3 max-w-[327px] sm:py-6 xs:bg-white rounded-2xl overflow-hidden flex lg:flex-col md:flex-row-reverse sm:flex-col flex-row lg:items-start md:items-center sm:items-start 2xs:justify-evenly items-center  md:justify-between lg:justify-between  px-4 sm:px-0 gap-4 2xs:gap-4  2xs:mt-4 ",
        icon.bg
      )}
    >
      <div className=" hidden sm:flex lg:justify-center  md:justify-start justify-center lg:items-start md:items-center h-[133px]  w-[327px]">
        <Image
          alt={image.alt}
          src={image.url}
          height={image.height}
          width={image.width}
          className={clsx("max-w-[359.42px] max-h-[124px] object-contain  ", {
            [`w-[${image.width}px]`]: image.width,
            [`h-[${image.height}px]`]: image.height,
          })}
        />
      </div>
      <div
        className={clsx(
          `sm:hidden  p-1 w-10 h-10 flex  items-center justify-center  rounded-full `,
          icon.bg
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
      <div className="lg:px-8 lg:py-2 max-w-[359.42px]  w-full xs:w-10/12 lg:h-[131px] md:w-8/12 lg:w-full  md:px-12 md:py-12  2xs:px-4 2xs:py-4  p-2 flex flex-col gap-6 lg:mt-auto">
        <Link
          href={link.url}
          className="sm:hidden cursor-pointer leading-snug flex items-center justify-between gap-2"
        >
          <div className="">
            <h2 className="text-black sm:hidden font-medium text-sm">
              {" "}
              {link.text}
            </h2>
            <p className="text-[#4F555F] text-xs sm:hidden">
              {description.length > 30
                ? description.slice(0, 20) + "..."
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
        <p className="text-[#4F555F] hidden sm:block ">{description}</p>
        <div className="hidden sm:block">
          <PrimaryButtons
            url={link.url}
            text={link.text}
            icon={link.icon}
            className={"md:text-black text-white  md:bg-white bg-black mt-auto border border-gray-400"}
          />
        </div>
      </div>
    </div>
  );
};

export default OffersCard;
