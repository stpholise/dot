import Image from "next/image";
const RoleAndNotification = () => {
  return (
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
          <Image
            alt="user"
            src={"/icons/gray_user.svg"}
            height={24}
            width={24}
            className=""
          />
        </div>
         <p className="hidden lg:block">Admin</p>
          <Image
            alt="more"
            src={"icons/chevron_down.svg"}
            height={20}
            width={20}
            className="hidden xs:block"
          />
      </div>
    </div>
  );
};

export default RoleAndNotification;
