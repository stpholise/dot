import Image from "next/image";

const UserBanner = () => {
  return (
    <div className="flex gap-6 h-16 items-center">
      <div className="w-14 h-14 rounded-full border overflow-hidden bg-blue-100 ">
        <Image
          alt="user image"
          src="/image/test_user.png"
          width={74}
          height={74}
          className="rounded-full  w-14 h-14 object-cover"
        />
      </div>
      <div className="">
        <h2 className="text-2xl font-medium text-black whitespace-nowrap">
          Welcome back, Olamilekan
        </h2>
        <p className="text-[#4F555F] whitespace-nowrap">
          What would you like to do today?
        </p>
      </div>
    </div>
  );
};

export default UserBanner;
