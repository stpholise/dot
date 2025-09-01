"use client";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { usePathname } from "next/navigation";
import { menuState, toggleMenu } from "@/app/store/slices/AppSlice";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useClerk } from "@clerk/nextjs";

const Sidebar = () => {
  const { isSignedIn, signOut } = useClerk();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const isMenuOpen = useSelector((state: RootState) => state.app.isMenuOpen);

  const secondaryNavItems: NavItems[] = [
    {
      icon: "/icons/setting.svg",
      title: "Settings",
      link: "/setting",
      onClick: () => handleNavigation("/setting"),
    },
    {
      icon: "/icons/logout.svg",
      title: "Logout",
      link: "/login",
      onClick: () => {
        signOut();
        handleNavigation("/");
      },
    },
  ];

  const handleNavigation = (item: NavItems | string) => {
    if (typeof item === "string") {
      router.push(item);
    } else {
      router.push(item.link);
    }
    dispatch(menuState(false));
  };

  return (
    <div
      className={clsx(
        "bg-white transition-transform ease-in-out duration-500 fixed top-16 lg:top-0 z-40 left-0 bottom-0 lg:h-screen sm:w-56 pb-6 pt-10 w-9/12 lg:flex lg:flex-col transform",
        {
          "-translate-x-full lg:translate-x-0": !isMenuOpen,
          "translate-x-0": isMenuOpen,
        }
      )}
    >
      <div className="h-full bg-white">
        <div className="w-56 h-28 lg: hidden lg:flex items-center justify-center">
          <Image
            src="/icons/dot_logo.svg"
            alt="logo"
            height="200"
            width="200"
            className="w-16 h-16"
          />
        </div>

        <div className="flex flex-col justify-between h-[calc(100%-20%)] w-full">
          <div className="">
            <p className="text-[#667085] font-mdeium text-sm uppercase ml-6 my-2">
              MAIN
            </p>
            <div
              role="list"
              className="flex flex-col gap-2 w-full 2xs:w-11/12 sm:w-11/12"
            >
              {navItems.map((item) => {
                const isActive =
                  !pathname && item.link === "/"
                    ? true
                    : pathname === item.link ||
                      (pathname.includes(item.link) && item.link !== "/");
                return (
                  <button
                    onClick={() => handleNavigation(item)}
                    className={clsx(
                      "flex transition duration-300 ease lg:px-6 xs:px-6 px-4  lg:text-base font-medium py-2 justify-start items-center gap-4   whitespace-nowrap rounded-r-md group",
                      isActive ? " bg-black text-white" : "text-[#363739]"
                    )}
                    key={item.title}
                  >
                    <Image
                      className="group-hover:stroke-white"
                      alt={item.title}
                      src={item.icon}
                      height="17"
                      width="16"
                    />
                    {item.title}{" "}
                  </button>
                );
              })}
            </div>
          </div>
          <div
            role="list"
            className="flex flex-col gap-2 w-11/12 sticky bottom-10 "
          >
            {isSignedIn &&
              secondaryNavItems.map((item) => (
                <button
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    } else {
                      handleNavigation(item);
                    }
                  }}
                  className="flex  transition duration-300 ease lg:px-6 xs:px-6 px-4 lg:text-black lg:text-base font-medium py-2 justify-start items-center gap-4 text-[#363739]  whitespace-nowrap  group"
                  key={item.title}
                >
                  <Image
                    className="group-hover:stroke-white"
                    alt={item.title}
                    src={item.icon}
                    height="17"
                    width="16"
                  />{" "}
                  {item.title}{" "}
                </button>
              ))}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div
          onClick={() => dispatch(toggleMenu())}
          className="overlay  w-screen h-screen -z-60 bg-transparent fixed top-0 right-0 bottom-0 left-0"
        ></div>
      )}
    </div>
  );
};

interface NavItems {
  icon: string;
  title: string;
  link: string;
  onClick?: () => void;
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
    link: "/remittance",
  },
  {
    icon: "/icons/remitance.svg",
    title: "HMO",
    link: "/hmo/buy-hmo",
  },
  {
    icon: "/icons/remitance.svg",
    title: "Loans",
    link: "/loans",
  },
];

export default Sidebar;
