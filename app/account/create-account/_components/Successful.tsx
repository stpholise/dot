import Image from "next/image";
import { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import { setCurrentStep } from "@/app/store/slices/UserAccountSlice"; 

interface DotAccountBenefit {
  icon: string;
  title: string;
  text?: string;
}
 

const Successful= () => {
  const dispatch = useDispatch();
  const customerAccountDetail = useSelector(
    (state: RootState) =>
      state.userAccount.userAccountInitialState.customerAccountDetail
  );

 
  const decrementStep = () => { 
     dispatch(setCurrentStep(0));
  };
  const incrementStep = () => { 
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
          <p className="text-black capitalize">{customerAccountDetail.AccountName}</p>
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
          {" "}
          Here are some benefits of owning a DOT account
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 my-4 gap-4">
          {dotAccountBenefit.map((item, index) => (
            <div className="flex gap-3 items-start" key={item.title + index}>
              <div className="w-10 h-10 rounded-full bg-gray-100 p-2 flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={20}
                  height={20}
                  className="min-w-5 min-h-5"
                />
              </div>
              <div className="">
                <h4 className="text-base font-medium text-black mb-1">
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
      <footer className="flex gap-4  py-4 mt-auto sm:flex-row flex-col-reverse">
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
