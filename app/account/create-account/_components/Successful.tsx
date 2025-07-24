import Image from "next/image";
import { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import { setCurrentStep } from "@/app/store/slices/UserAccountSlice";
import { scrollToTop } from "@/app/_utils/ScrollToTop";
import { useEffect } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface DotAccountBenefit {
  icon: string;
  iconBg?: string;
  title: string;
  text?: string;
}

const Successful = () => {
  const router = useRouter();

  useEffect(() => {
    scrollToTop();
  }, []);
  const dispatch = useDispatch();
  const customerAccountDetail = useSelector(
    (state: RootState) =>
      state.userAccount.userAccountInitialState.customerAccountDetail
  );

  const decrementStep = () => {
    dispatch(setCurrentStep(0));
  };
  const incrementStep = () => {
    router.push("/account");
    dispatch(setCurrentStep(0));
  };

  return (
    <div className="sm:px-10 sm:py-8 px-8 py-4">
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
      <div className="bg-[#F9F9F9] px-4 py-4 flex flex-col gap-3 my-4 rounded-2xl ">
        <div className=" flex justify-between font-medium ">
          <h4>Account Name</h4>
          <p className="text-black capitalize">
            {customerAccountDetail.AccountName}
          </p>
        </div>
        <div className=" flex justify-between font-medium ">
          <h4>Account Number</h4>
          <p className="text-black">{customerAccountDetail.AccountNumber}</p>
        </div>
        <div className=" flex justify-between font-medium ">
          <h4>Account Level</h4>
          <p className="text-black">{customerAccountDetail.AccountTier}</p>
        </div>
      </div>

      <div className="">
        <h4 className="text-[#667085] text-center">
          Here are some benefits of owning a DOT account
        </h4>
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
      <footer className="flex gap-4  py-4 mt-8 sm:flex-row flex-col-reverse">
        <PrimaryButtons
          text={"Create another Account"}
          className="flex-row-reverse font-medium border-[#D0D5DD] border text-black h-[48px] rounded-lg  justify-center items-center"
          icon=""
          onClick={decrementStep}
        />
        <PrimaryButtons
          text={"View Created Accounts"}
          onClick={incrementStep}
          className={
            " h-[48px] bg-black text-white font-medium rounded-lg sm:w-96 justify-center items-center"
          }
        />
      </footer>
    </div>
  );
};

const dotAccountBenefit: DotAccountBenefit[] = [
  {
    icon: "/icons/quick_loan_frame.png",
    iconBg: "bg-[#FDF3EB]",
    title: "Quick Loans",
    text: "Call 09088991091 to request personal or business loans.",
  },
  {
    icon: "/icons/health_insurance_frame.png",
    iconBg: "bg-[#EAFAE9]",
    title: "Health Insurance",
    text: "Call 08170369507 to access Dot health insurance plan.",
  },
  {
    icon: "/icons/offline_banking_frame.png",
    iconBg: "bg-[#EBF8FE]",
    title: "Offline Banking",
    text: "Dial *5525# on your mobile to transfer, pay bills, buy airtime or check account balance.",
  },
  {
    icon: "/icons/Confetti.png",
    iconBg: "bg-[#F3F4F6]",
    title: "and many more",
  },
];

export default Successful;
