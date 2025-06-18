import Link from "next/link";
import Image from "next/image";
interface NavItems {
  icon: string;
  title: string;
  link: string;
}

const navItems: NavItems[] = [
  {
    icon: "/icons/setting.svg",
    title: "Settings",
    link: "/setting",
  },
  {
    icon: "/icons/logout.svg",
    title: "Logout",
    link: "/login",
  },
];

const SecondaryNav = () => {
  return (
    <div role="list" className="flex flex-col gap-2 w-11/12 sticky bottom-10 ">
      {navItems.map((item) => (
        <Link
          href={item.link}
          className="flex transition duration-300 ease lg:px-6 xs:px-6 px-4 lg:text-black lg:text-base font-medium py-2 justify-start items-center gap-4 text-[#363739]  whitespace-nowrap  group"
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

export default SecondaryNav;
