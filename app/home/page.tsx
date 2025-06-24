import OffersCard from "./_components/OffersCard";
import { offerInfo } from "../_data/OfferData";
import PrimaryButtons from "../_components/ui/units/buttons/PrimaryButtons";
import Image from 'next/image'
const page = () => {
  return (
    <div className="bg-[#FAF9F9] min-h-screen lg:w-full">
      <main className="lg:ml-70 mt-10 flex flex-col gap-8 lg:w-[calc(100%-340px)] md:p-8 lg:p-0 px-4 ">
          <div className="h-80  sm:w-[327px]  xs:w-[327px] md:w-full w-full mx-auto md:mx-start p-4 xs:p-6  md:p-10 bg-white rounded-2xl [background:linear-gradient(90deg,_white_0%,_white_30%,_transparent_30%,_transparent),url('/bg/BG.png')_center/cover_no-repeat,url('/bg/line.png')_bottom_right/400px_no-repeat,url('/bg/user.png')_center/50px_no-repeat,url('/bg/wallet.png')_right_200px_center/50px_no-repeat]">
      <div className="flex flex-col gap-8 md:gap-12 w-full h-full justify-between content-between   ">
      
            <div className="flex md:flex-row flex-col gap-4 md:gap-6 md:h-16 md:items-center">
      <div className="w-14 h-14 rounded-full border overflow-hidden bg-blue-100 ">
        <Image
          alt="user image"
          src={"/image/test_user.png"}
          width={74}
          height={74}
          className="rounded-full  w-14 h-14 object-cover"
        />
      </div>
      <div className="">
        <h2 className="md:text-2xl text-lg font-medium text-black whitespace-nowrap">
          Welcome back, {"Olamileken"}
        </h2>
        <p className="text-[#4F555F] md:text-base text-sm whitespace-nowrap">
          What would you like to do today?
        </p>
      </div>
    </div>
        <div className="flex flex-col md:flex-row gap-4 items-center ">
          <button className="bg-black cursor-pointer text-base font-medium text-white rounded-2xl lg:w-54 py-3 px-8 whitespace-nowrap">
            Open a Dot Account
          </button>
          <PrimaryButtons
            text={"Update Your Profile"}
            icon={"/icons/chevron_right.svg"}
            className={"bg-white text-black"}
          />
        </div>
      </div>
    </div>
        <div className="offers grid grid-col-1 lg:grid-cols-3 xl:grid-cols-3 xs:w-full   lg:gap-4 gap-5 md:gap-8  justify-center w-auto sm:justify-evenly   lg:p-0">
         {
          offerInfo.map((item, index) => (
            <OffersCard key={index}  image={item.image} link={item.link} description={item.description} icon={item.icon} />
          ))
         }
        </div>
      </main> 
    </div>
  );
};

export default page;
