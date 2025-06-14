import { OfferInfo } from "@/app/_data/OfferData";
import Image from "next/image"; 
import clsx from "clsx";
import PrimaryButtons from "../ui/units/buttons/PrimaryButtons";
const OffersCard = ({ image, link, description }: OfferInfo) => {
  return (
    <div className="h-80 w-80 py-7 bg-white rounded-2xl overflow-hidden">
      <div className="flex justify-center items-start h-1/2">
        <Image
          alt={image.alt}
          src={image.url}
          height={image.height}
          width={image.width}
          className={clsx("  max-w-[359.42px] object-cover", {
            [`w-[${image.width}px]`]: image.width,
            [`h-[${image.height}px]`]: image.height,
          })}
        />
      </div>
      <div className=" px-8 py-4 flex flex-col gap-6">
        <p className="text-[#4F555F] ">{description}</p>
        <div className="">
          <PrimaryButtons
            url={link.url}
            text={link.text}
            border={true}
            icon={link.icon}
          />
          
        </div>
      </div>
    </div>
  );
};

export default OffersCard;
