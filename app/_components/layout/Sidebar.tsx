"use client";
import Image from "next/image";
import MainNav from "../menu/MainNav";
import SecondaryNav from "../menu/SecondaryNav";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { menuState } from "@/app/store/slices/AppSlice";
import clsx from "clsx";

const Sidebar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const isMenuOpen = useSelector((state: RootState) => state.app.isMenuOpen);

  useEffect(() => {
 
      dispatch(menuState(false));
 
  }, [pathname]);

  return (
    <div
      className={clsx(
        "bg-white transition-transform ease-in-out duration-500 fixed top-20 lg:top-0 z-30 left-0 bottom-0 lg:h-screen sm:w-60 py-6 w-9/12 lg:flex lg:flex-col transform",
        {
          "-translate-x-full lg:translate-x-0": !isMenuOpen,
          "translate-x-0": isMenuOpen,
        }
      )}
    >
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

        <div className="flex flex-col justify-between h-[calc(100%-20%)] w-11/12 ">
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
