import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

interface PrimaryButtonsProp {
  text: string;
  icon?: string;
  border?: boolean;
  url?: string;
}

const PrimaryButtons = ({ text, icon, border, url }: PrimaryButtonsProp) => {
  const content = (
    <>
      {text}
      {icon && <Image alt="more" src={icon} width={24} height={24} />}
    </>
  );
  return (
    <>
      {url ? (
        <Link
          href={url}
          className={clsx(" flex gap-[6px] px-6 py-2 rounded-xl text-black  whitespace-nowrap w-fit", {
            "border border-[#E1E4EA]": border,
          })}
        >
          {content}
        </Link>
      ) : (
        <button
          className={clsx("px-4 py-2", {
            "border border-gray-400": border,
          })}
        >
          {" "}
          {content}
        </button>
      )}
    </>
  );
};

export default PrimaryButtons;
