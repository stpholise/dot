import { OfferInfo } from "@/app/_data/OfferData";
import Image from "next/image";
import clsx from "clsx";
import PrimaryButtons from "../ui/units/buttons/PrimaryButtons";
const OffersCard = ({ image, link, description }: OfferInfo) => {
  return (
    <div className="lg:h-80  lg:w-80 md:w-[754px] w-full  md:h-52 h-[348px] xs:w-[327px] lg:py-7 py-6 bg-white rounded-2xl overflow-hidden flex lg:flex-col md:flex-row-reverse flex-col lg:items-start md:items-center justify-evenly md:justify-between gap-4 mt-4">
      <div className="flex lg:justify-center  md:justify-start justify-center lg:items-start md:items-center h-1/2  w-[327px]">
        <Image
          alt={image.alt}
          src={image.url}
          height={image.height}
          width={image.width}
          className={clsx("max-w-[359.42px]  object-cover  ", {
            [`w-[${image.width}px]`]: image.width,
            [`h-[${image.height}px]`]: image.height,
          })}
        />
      </div>
      <div className=" lg:px-8 lg:py-4 max-w-[359.42px] lg:h-1/2 md:w-8/12 lg:w-full md:p-12 p-4 flex flex-col gap-6">
        <p className="text-[#4F555F] ">{description}</p>
        <div className="">
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
