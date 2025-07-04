import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import { setCurrentStep } from "@/app/store/slices/UserAccountSlice";

interface DotAccountBenefit {
  icon: string;
  title: string;
  text?: string;
}

const Successful = () => {
  const dispatch = useDispatch()
  const customerAccountDetail = useSelector(
    (state: RootState) =>
      state.userAccount.userAccountInitialState.customerAccountDetail
  );

  const currentStep = useSelector((state: RootState) => state.userAccount.initialStepState.currentStep) 
 const decrementStep = () => {
    const newStep = currentStep - 1;
    dispatch(setCurrentStep(newStep));
  };
  const incrementStep = () => {
    const newStep = currentStep + 1;
    dispatch(setCurrentStep(newStep));
  };
  return (
    <div>
      <Image
        src={"/icons/success.png"}
        alt={"account created"}
        width={85}
        height={85}
        className=""
      />

      <h2>Account created successfully, see details below.</h2>
      <div className=" ">
        <div className=" flex justify-between font-medium ">
          <h4>Account Name</h4>
          <p className="">{customerAccountDetail.AccountName}</p>
        </div>
        <div className=" flex justify-between font-medium ">
          <h4>Account Number</h4>
          <p className="">{customerAccountDetail.AccountNumber}</p>
        </div>
        <div className=" flex justify-between font-medium ">
          <h4>Account AccountLevel</h4>
          <p className="">{customerAccountDetail.AccountTier}</p>
        </div>
      </div>

      <div className="">
        <h4 className="text-[#667085]">
          {" "}
          Here are some benefits of owning a DOT account
        </h4>
        <div className="grid grid-cols-2">
          {dotAccountBenefit.map((item, index) => (
            <div className="flex" key={item.title + index}>
              <Image
                src={item.icon}
                alt={item.title}
                width={20}
                height={20}
                className=""
              />
              <div className="">
                <h4 className="text-sm font-medium text-black">
                  {" "}
                  {item.title}
                </h4>
                <p className="text-xs front-medium text-[#454547]">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
           <footer className="flex gap-4  py-4 mt-auto">
        <PrimaryButtons
          text={"Edit Credentials"}
          className="flex-row-reverse font-medium border-[#D0D5DD] border text-black h-[52px] rounded-lg  justify-center items-center"
          icon="/icons/arrow_back.png"
          onClick={decrementStep}
        />
        <PrimaryButtons
          text={"Proceed - Passport Capture"}
          onClick={incrementStep}
          className={
            " h-[52px] bg-black text-white font-medium rounded-lg w-96 justify-center items-center"
          }
        />
      </footer>
    </div>
  );
};

const dotAccountBenefit: DotAccountBenefit[] = [
  {
    icon: "/icons/home.svg",
    title: "Quick Loans",
    text: "Call 09088991091 to request personal or business loans.",
  },
  {
    icon: "/icons/more.svg",
    title: "Health Insurance",
    text: "Call 08170369507 to access Dot health insurance plan.",
  },
  {
    icon: "/icons/home.svg",
    title: "Offline Banking",
    text: "Dial *5525# on your mobile to transfer, pay bills, buy airtime or check account balance.",
  },
  {
    icon: "/icon/home.svg",
    title: "and many more",
  },
];

export default Successful;
