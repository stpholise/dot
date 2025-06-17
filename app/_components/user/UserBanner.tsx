import Image from "next/image";
interface UserBannerProp {
  userImage?: string;
  userFirstName: string;
}

const UserBanner = ({userImage, userFirstName}: UserBannerProp) => {
  return (
    <div className="flex md:flex-row flex-col gap-4 md:gap-6 md:h-16 md:items-center">
      <div className="w-14 h-14 rounded-full border overflow-hidden bg-blue-100 ">
        <Image
          alt="user image"
          src={userImage ? userImage : "/image/test_user.png"}
          width={74}
          height={74}
          className="rounded-full  w-14 h-14 object-cover"
        />
      </div>
      <div className="">
        <h2 className="md:text-2xl text-lg font-medium text-black whitespace-nowrap">
          Welcome back, {userFirstName}
        </h2>
        <p className="text-[#4F555F] md:text-base text-sm whitespace-nowrap">
          What would you like to do today?
        </p>
      </div>
    </div>
  );
};

export default UserBanner;
