"use router";
import Image from "next/image";
import clsx from "clsx"; 
import { useEffect } from "react";
import { scrollToTop } from "@/app/_utils/ScrollToTop";

interface DotAccountBenefit {
  icon: string;
  iconBg?: string;
  title: string;
  text?: string;
}

const SuccessfulHMOPurchase = () => {
    
    useEffect(() => {
        scrollToTop()
    },[])
  return (
    <div className="py-6 px-8">
      <Image
        src={"/icons/success.png"}
        alt={"account created"}
        width={85}
        height={85}
        className="mx-auto my-4 lg:my-10"
      />
      <h2 className="text-center font-medium text-black text-lg ">
        Account created successfully, see details below.
      </h2>
      <div className="">
        <div className="flex justify-between">
          <p>Customer Name</p>
          <p>Benedicta Bamidele</p>
        </div>
        <div className="flex justify-between">
          <p>Policy ID</p>
          <p>0123320023</p>
        </div>
      </div>
      <div className="">
        <div className="flex justify-between">
          <p>Customer Name</p>
          <p>Benedicta Bamidele</p>
        </div>
        <div className="flex justify-between">
          <p>Policy ID</p>
          <p>0123320023</p>
        </div>
      </div>
      <div className="">
        <div className="flex justify-between">
          <p>Customer Name</p>
          <p>Benedicta Bamidele</p>
        </div>
        <div className="flex justify-between">
          <p>Policy ID</p>
          <p>0123320023</p>
        </div>
      </div>
      <div className="">
        These details have been sent to the respective phone numbers and can be
        used in any Dot HMO Affiliated Hospital to access premium healthcare.
      </div>
      <div className="">
        <p>what would you like to do next?</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 my-4 gap-4">
          {dotAccountBenefit.map((item, index) => (
            <div className="flex gap-3 items-start" key={item.title + index}>
              <div
                className={clsx(
                  "w-10 h-10 rounded-full p-2 flex items-center justify-center",
                  item.iconBg ? item.iconBg : "bg-[#F3F4F6]"
                )}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={20}
                  height={20}
                  className="min-w-5 min-h-5 object-cover"
                />
              </div>
              <div className="">
                <h4 className="text-base font-medium text-black mb-1">
                  {item.title}
                </h4>
                {item.text && (
                  <p className="text-xs front-medium text-[#454547]">
                    {item.text}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessfulHMOPurchase;

const dotAccountBenefit: DotAccountBenefit[] = [
  {
    icon: "/icons/quick_loan_frame.png",
    iconBg: "bg-[#FDF3EB]",
    title: "Apply Customer for a Loans",
    text: "Create loan for customer using the details entered.",
  },
  {
    icon: "/icons/health_insurance_frame.png",
    iconBg: "bg-[#EAFAE9]",
    title: "Register Another Customer for HMO",
    text: "Sell Dot HMO plan for another customer",
  },
  {
    icon: "/icons/offline_banking_frame.png",
    iconBg: "bg-[#EBF8FE]",
    title: "Return Home",
    text: "",
  },
  {
    icon: "/icons/Confetti.png",
    iconBg: "bg-[#F3F4F6]",
    title: "and many more",
  },
];
