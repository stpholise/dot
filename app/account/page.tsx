"use client";
import AccountOpening from "../_components/wrapper/AccountOpening";

const page = () => {
  return (
    <div className="bg-[#FAF9F9] text-black min-h-screen w-screen">
      <div className="lg:ml-68 mt-10 lg:w-[calc(100%-320px)] py-4 px-4 lg:px-1">
        <AccountOpening />
      </div>
    </div>
  );
};

export default page;
