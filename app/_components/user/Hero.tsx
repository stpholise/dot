import UserBanner from "./UserBanner";
import Image from "next/image";
const Hero = () => {
  return (
    <div className="h-80 w-[calc(100%-40px)] p-10 bg-white rounded-2xl [background:linear-gradient(90deg,_white_0%,_white_30%,_transparent_30%,_transparent),url('/bg/BG.png')_center/cover_no-repeat,url('/bg/line.png')_bottom_right/400px_no-repeat,url('/bg/user.png')_center/50px_no-repeat,url('/bg/wallet.png')_right_200px_center/50px_no-repeat]">
      <div className="flex flex-col gap-12 w-full h-full justify-between content-between   ">
        <UserBanner />
        <div className="flex gap-4">
          <button className="bg-black text-base font-medium text-white rounded-2xl lg:w-54 h-16">
            Open a Dot Account
          </button>
          <button className=" text-base font-medium text-black rounded-2xl lg:w-54 h-16 flex items-center justify-center">
            Update Your Profile{" "}
            <Image
              alt="more"
              src="/icons/chevron_right.svg"
              height={24}
              width={24}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
