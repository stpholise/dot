"use client";
import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";

const MenuButton = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <button
      onClick={() => setMenuIsOpen(!menuIsOpen)}
      className={clsx(
        "lg:hidden flex gap-2 border border-[#D0D5DD] rounded-3xl p-1 ease-in-out transition-all duration-700"
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
  );
};

export default MenuButton;
