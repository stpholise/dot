import Image from "next/image";
import MainNav from "../menu/MainNav";
import SecondaryNav from "../menu/SecondaryNav";

const Sidebar = () => {
  return (
    <div className="bg-white   lg:h-screen sm:w-60 py-6 fixed lg:top-0 bottom-0 left-0 top-20 lg:flex lg:flex-col ">
      <div className="h-full">
        <div className="w-60 h-28 lg: hidden lg:flex items-center justify-center">
          <Image
            src="/icons/dot_logo.svg"
            alt="logo"
            height="200"
            width="200"
            className="w-16 h-16"
          />
        </div>

        <div className="flex flex-col justify-between h-[calc(100%-20%)]">
          <div className="">
            <p className="text-[#667085] font-mdeium text-sm uppercase ml-6 my-2">
              MAIN
            </p>
            <MainNav />
          </div>
          <div className="">
            <SecondaryNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
