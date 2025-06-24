"use client";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes } from "react";

interface PrimaryButtonsProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: string;
  border?: boolean;
  url?: string;
  bg?: string;
}

const PrimaryButtons = ({
  text,
  icon,
  border,
  url,
  bg,
  ...rest
}: PrimaryButtonsProp) => {
  const router = useRouter();
  const content = (
    <>
      {text}
      {icon && <Image alt="more" src={icon} width={24} height={24} />}
    </>
  );
  return (
    <>
      <button
        onClick={url ? () => router.push(url) : rest.onClick}
        {...rest}
        className={clsx(
          `flex gap-[6px] cursor-pointer px-6 py-2 rounded-xl ${bg} whitespace-nowrap w-fit`,
          {
            "border border-gray-400": border,
          },
          rest.className
        )}
      >
        {content}
      </button>
    </>
  );
};

export default PrimaryButtons;
