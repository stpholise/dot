import PrimaryButtons from "../ui/units/buttons/PrimaryButtons";
import UserBanner from "./UserBanner";
const Hero = () => {
  return (
    <div className="h-80  sm:w-[327px]  xs:w-[327px] md:w-full w-full mx-auto md:mx-start p-6  md:p-10 bg-white rounded-2xl [background:linear-gradient(90deg,_white_0%,_white_30%,_transparent_30%,_transparent),url('/bg/BG.png')_center/cover_no-repeat,url('/bg/line.png')_bottom_right/400px_no-repeat,url('/bg/user.png')_center/50px_no-repeat,url('/bg/wallet.png')_right_200px_center/50px_no-repeat]">
      <div className="flex flex-col gap-8 md:gap-12 w-full h-full justify-between content-between   ">
        <UserBanner
          userImage={"/image/test_user.png"}
          userFirstName="Olamileken"
        />
        <div className="flex flex-col md:flex-row gap-4 items-center ">
          <button className="bg-black text-base font-medium text-white rounded-2xl lg:w-54 py-3 px-8 whitespace-nowrap">
            Open a Dot Account
          </button>
          <PrimaryButtons
            text={"Update Your Profile"}
            icon={"/icons/chevron_right.svg"}
            bg={"bg-white text-black"}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
