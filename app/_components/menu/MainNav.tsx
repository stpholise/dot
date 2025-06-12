"use client";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";
interface NavItems {
  icon: string;
  title: string;
  link: string;
}

const navItems: NavItems[] = [
  {
    icon: "/icons/home.svg",
    title: "Home",
    link: "/",
  },
  {
    icon: "/icons/user_account.svg",
    title: "Dot MFB Accounts",
    link: "/account",
  },
  {
    icon: "/icons/remitance.svg",
    title: "Remittance",
    link: "/remottance",
  },
];

const MainNav = () => {
  const pathname = usePathname();
  return (
    <div role="list" className="flex flex-col gap-2 w-11/12">
      {navItems.map((item) => (
        <Link
          href={item.link}
          className={clsx(
            "flex transition duration-300 ease lg:px-6  lg:text-base font-medium py-2 justify-start items-center gap-4   whitespace-nowrap rounded-r-md group",
            {
              "text-[#363739]": pathname !== item.link,
              " bg-black text-white":
                pathname == item.link ||
                (item.link !== "/" && pathname.startsWith(item.link)),
            }
          )}
          key={item.title}
        >
          {" "}
          <Image
            className="group-hover:stroke-white"
            alt={item.title}
            src={item.icon}
            height="17"
            width="16"
          />{" "}
          {item.title}{" "}
        </Link>
      ))}
    </div>
  );
};

export default MainNav;
