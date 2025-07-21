"use client";
import Searchbar from "../Searchbar";
import Image from "next/image";
import MenuButton from "./MenuButton";
import { useClerk, UserButton } from "@clerk/nextjs";
import PrimaryButtons from "../ui/units/buttons/PrimaryButtons";

const Header = () => {
  const { isSignedIn, openSignIn, openSignUp, openUserProfile,
    //  signOut 
    } =
    useClerk();

  return (
    <div className=" sticky top-0 right-0 z-50 h-20 lg:h-20 md:gap-12 bg-white w-full lg:w-[calc(100%-222px)] lg:ml-56 flex justify-between items-center text-[#343434] font-medium p-4 xs:px-10">
      <div className="flex items-center gap-4">
        <MenuButton />
        <Searchbar />
      </div>

      {isSignedIn ? (
        <div className="flex justify-end  items-center w-48  gap-8">
          <Image
            alt="notification"
            src="/icons/notification.svg"
            height="24"
            width="23"
            className=""
          />

          <div className="flex items-center gap-1">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center gap-1">
              {/* <Image
                alt="user"
                src={"/icons/gray_user.svg"}
                height={24}
                width={24}
                className=""
              /> */}
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Mange Account"
                    labelIcon={
                      <Image
                        src="/icons/setting.svg"
                        width={20}
                        height={20}
                        alt="Mange account"
                      />
                    }
                    onClick={() => openUserProfile()}
                  />
                </UserButton.MenuItems>
              </UserButton>
            </div>
            <p className="hidden lg:block">Admin</p>
            <Image
              alt="more"
              src={"/icons/chevron_down.svg"}
              height={20}
              width={20}
              className="hidden xs:block"
            />
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <PrimaryButtons
            text="Sign In"
            className="text-white bg-black h-[44px] rounded-lg w-fit justify-center items-center"
            onClick={() => openSignIn()}
          />
          <PrimaryButtons
            text="Sign up"
            className="text-black bg-gray-300 h-[44px] rounded-lg w-fit justify-center items-center"
            onClick={() => openSignUp()}
          />
        </div>
      )}
    
    
    </div>
  );
};

export default Header;
