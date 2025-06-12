"use client"; 
import AccountOpening from "../_components/wrapper/AccountOpening";


const page = () => {
  return (
    <div className="bg-[#FAF9F9] text-black min-h-screen w-screen">
      <div className="ml-68 mt-10 w-[calc(100%-320px)] py-4">
        <AccountOpening />
      </div>
    </div>
  );
};

export default page;
