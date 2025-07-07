"use client";
import Image from "next/image";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { toggleMenu } from "../../store/slices/AppSlice";

const MenuButton = () => {
  const dispatch = useDispatch();
  const menuIsOpen = useSelector((state: RootState) => state.app.isMenuOpen);

  return (
    <div className="">
      <button
        onClick={() => dispatch(toggleMenu())}
        className={clsx(
          "lg:hidden flex gap-2 border w-20  border-[#D0D5DD] z-20 rounded-3xl p-1 ease-in-out transition-all duration-700"
        )}
      >
        <div
          className={clsx("transition duraion-100 ", {
            "flip-0": !menuIsOpen,
            "translate-x-10": menuIsOpen,
          })}
        >
          <Image
            src={"/icons/dot_logo.svg"}
            alt="logo"
            width={32}
            height={32}
            className=""
          />
        </div>
        <div
          className={clsx("transition duration-100 ", {
            "flip-0": !menuIsOpen,
            "-translate-x-10": menuIsOpen,
          })}
        >
          <Image
            src={"/icons/Hamburger Menu.svg"}
            alt="logo"
            width={32}
            height={32}
            className=""
          />
        </div>
      
      </button>
    </div>
  );
};

export default MenuButton;
