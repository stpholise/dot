"use router";
import Image from "next/image";
import clsx from "clsx";
import { useEffect } from "react";
import { scrollToTop } from "@/app/_utils/ScrollToTop";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

interface DotAccountBenefit {
  icon: string;
  iconBg?: string;
  title: string;
  text?: string;
  path?: string;
  onClick?: () => void;
}

const SuccessfulLoan = ({
  cancelRegistration,
}: {
  cancelRegistration: () => void;
}) => {
  const router = useRouter();
  const loanData = useSelector((state: RootState) => state.hmo.loan);

  const dotAccountBenefit: DotAccountBenefit[] = [
    {
      icon: "/icons/quick_loan_frame.png",
      iconBg: "bg-[#FDF3EB]",
      title: "Apply Customer for a Loans",
      text: "Create loan for customer using the details entered.",
      path: "/loan",
      onClick: () => router.push("/loan"),
    },
    {
      icon: "/icons/health_insurance_frame.png",
      iconBg: "bg-[#EAFAE9]",
      title: "Register Another Customer for HMO",
      text: "Sell Dot HMO plan for another customer",
      path: "/hmo/buy-hmo",
      onClick: () => {
        router.push("/hmo/buy-hmo");
        cancelRegistration();
      },
    },
    {
      icon: "/icons/offline_banking_frame.png",
      iconBg: "bg-[#EBF8FE]",
      title: "Return Home",
      path: "/",
      onClick: () => router.push("/"),
    },
  ];
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="py-6 lg:px-16 md:px-12 sm:px-8 px-6">
      <Image
        src={"/icons/success.png"}
        alt={"account created"}
        width={85}
        height={85}
        className="mx-auto my-4 lg:my-10"
      />
      <h2 className="text-center font-medium text-black text-lg mb-3">
        Loan application sent, see details below
      </h2>
      <div className="flex flex-col gap-6">
        <div className="bg-[#F9F9F9] rounded-xl px-6 py-4 flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="text-[#454547] leading-6">Applicant’s Name</p>
            <p className="text-black font-medium text-base">
              {loanData.personalDetail.fName +
                " " +
                loanData.personalDetail.lName}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#454547]">Loan Requested</p>
            <p className="text-black font-medium text-base">
              ₦{loanData.loanValues.amountRequested}
               
            </p>
          </div>
        </div>
      </div>

      <div className="leading-6 py-8 text-[#868C98] font-medium">
        Upon approval, more details on next steps and repayment amount will be
        sent to the customer’s phone number.
      </div>
      <div className="">
        <p>what would you like to do next?</p>

        <div className="grid grid-cols-1 my-4 gap-4">
          {dotAccountBenefit.map((item, index) => (
            <button
              className="flex gap-3  border-2 border-[#E1E4EA] px-3 py-3 rounded-xl bg-white items-center"
              key={item.title + index}
              onClick={item.onClick}
            >
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
              <div className="flex flex-col justify-center   gap-1">
                <h4 className=" font-medium text-black leading-5 text-sm flex items-center  ">
                  {item.title}
                </h4>
                {item.text && (
                  <p className="text-xs front-medium text-[#868C98]  ">
                    {item.text}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessfulLoan;
