"use client";
import Image from "next/image";
import clsx from "clsx"; 
import { ButtonHTMLAttributes } from "react";

interface PrimaryButtonsProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: string;
  url? : string;
}

const PrimaryButtons = ({
  text,
  icon, 
  ...rest
}: PrimaryButtonsProp) => {

  const content = (
    <>
      {text}
      {icon && <Image alt="more" src={icon} width={24} height={24} />}
    </>
  );
  return (
    <>
      <button
     
        {...rest}
        className={clsx(
          `flex gap-[6px] cursor-pointer px-6 py-2 rounded-xl  whitespace-nowrap w-fit`,
          rest.className
        )}
      >
        {content}
      </button>
    </>
  );
};

export default PrimaryButtons;
