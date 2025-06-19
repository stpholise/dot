import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

interface PrimaryButtonsProp {
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
}: PrimaryButtonsProp) => {
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
          className={clsx(
            ` flex cursor-pointer gap-[6px] px-6 py-2 rounded-xl  whitespace-nowrap w-fit ${bg} `,
            {
              "border border-[#E1E4EA]": border,
              bg,
            }
          )}
        >
          {content}
        </Link>
      ) : (
        <button
          className={clsx(
            `flex gap-[6px] cursor-pointer px-6 py-2 rounded-xl ${bg} whitespace-nowrap w-fit`,
            {
              "border border-gray-400": border,
            }
          )}
        >
          {" "}
          {content}
        </button>
      )}
    </>
  );
};

export default PrimaryButtons;
