import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import {
  setCurrentStep,
  setCustomerAccountDetail,
  resetUserDetails,
} from "@/app/store/slices/UserAccountSlice";
import { useState } from "react";

const ReviewCredentials = () => {
  const generateAccountNumber = () => {
    let accountNumber = "";
    Array.from({ length: 11 }).forEach(() => {
      accountNumber += Math.floor(Math.random() * 10);
    });
    return accountNumber;
  };

  const CreateUserAccount = () => {
    const customerFullName =
      customerDetails.lname + " " + customerDetails.fname;
    dispatch(
      setCustomerAccountDetail({
        AccountName: customerFullName,
        AccountNumber: generateAccountNumber(),
        AccountTier: "Tier 2",
      })
    );
    incrementStep();
    dispatch(resetUserDetails());
  };
  const dispatch = useDispatch();
  const [wantATM, setWantATM] = useState<boolean>(false);
  const userImage = useSelector(
    (state: RootState) =>
      state.userAccount.userAccountInitialState.customerImage.url
  );
  const customerDetails = useSelector(
    (state: RootState) =>
      state.userAccount.userAccountInitialState.customerDetails
  );
  const customerIdentification = useSelector(
    (state: RootState) =>
      state.userAccount.userAccountInitialState.customerIdentification
  );

  const CustomerAddress = useSelector(
    (state: RootState) =>
      state.userAccount.userAccountInitialState.customerAddress
  );

  const currentStep = useSelector(
    (state: RootState) => state.userAccount.initialStepState.currentStep
  );
  const dateFn = (date: string | Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  const decrementStep = () => {
    const newStep = currentStep - 1;
    dispatch(setCurrentStep(newStep));
  };
  const incrementStep = () => {
    const newStep = currentStep + 1;
    dispatch(setCurrentStep(newStep));
  };
  return (
    <div className="px-8 py-8 flex flex-col gap-8 ">
      <div className=" flex items-center text-[#3FB12C] bg-[#EFFBEE] py-1 px-2 rounded-3xl font-medium w-fit">
        <Image
          src={"/icons/user_review.png"}
          alt="review document"
          width={18}
          height={18}
          className="max-w-5 max-h-5"
        />
        Review Credentials
      </div>

      <div className=" ">
        <div className=" flex gap-8 items-center py-4">
          <Image
            alt={"customer"}
            src={userImage}
            width={80}
            height={80}
            className="rounded-full w-20 h-20"
          />
          <div className=" flex flex-col gap-2">
            <h3 className="font-medium text-3xl text-black">
              {customerDetails.fname} {customerDetails.lname}
            </h3>
            <p className="text-sm">
              BVN{" "}
              {customerDetails.bvn ? customerDetails.bvn : "no bvn submitted"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2  gap-4 py-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-[#667085]">Phone Number</p>
            <div className=" flex gap-2 items-center">
              <Image
                alt={"country"}
                src={userImage}
                width={16}
                height={16}
                className="max-h-6"
              />
              <p className="text-black">
                {customerDetails.phone
                  ? customerDetails.phone
                  : "no phone number"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-[#667085]">Gender</p>
            <div className="">
              <p className="text-black ">
                {customerDetails.gender ? customerDetails.gender : ""}{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-[#667085]">Date of Birth</p>
            <div className="">
              <p className="text-black">
                {customerDetails.dob && dateFn(customerDetails.dob)}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-[#667085]">Address</p>
            <div className="">
              <p className="text-black">{CustomerAddress.address} </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-[#667085]">ID Type</p>
            <div className="">
              <p className="text-black">{customerIdentification.idType} </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-[#667085]">ID Number</p>
            <div className="">
              <p className="text-black">{customerIdentification.idNumber} </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-[#667085]">Issue Date</p>
            <div className="">
              <p className="text-black">
                {customerIdentification.issueDate &&
                  dateFn(customerIdentification.issueDate)}{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-[#667085]">Expiry Date</p>
            <div className="">
              {customerIdentification.expiryDate && (
                <p className="text-black">
                  {dateFn(customerIdentification.expiryDate)}{" "}
                </p>
              )}
            </div>
          </div>
        </div>
        {customerIdentification.idFront && customerIdentification.idBack && (
          <div className="flex flex-col gap-4 py-4">
            <div className="flex gap-4 whitespace-nowrap items-center text-xs uppercase font-medium">
              Uploaded Documents
              <div className="h-0 border border-gray-200 w-full"></div>
            </div>

            <div className="flex gap-4 rounded-2xl h-16 px-4 py-2 bg-[#F7F7F7]  ">
              <Image
                src={"/icons/document.png"}
                alt={"document"}
                width={40}
                height={40}
                className=""
              />
              <div className="">
                <h4 className="text-black text-sm">ID Image (Front)</h4>
                <p className="text-[#868C98] text-xs overflow-hidden">
                  {customerIdentification.idFront}
                </p>
              </div>
            </div>

            <div className=" flex gap-4 rounded-2xl h-16 py-2 px-4 bg-[#F7F7F7]">
              <Image
                src={"/icons/document.png"}
                alt={"document"}
                width={40}
                height={40}
                className=""
              />
              <div className="">
                <h4 className="text-black text-sm">ID Image (Back)</h4>
                <p className="text-[#868C98] text-xs overflow-hidden">
                  {customerIdentification.idBack}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-4 py-4">
          <input
            type="checkbox"
            name="withATM"
            checked={wantATM}
            onChange={() => setWantATM((prev) => !prev)}
            className="w-4 h-4 rounded-md"
          />
          <div className="">
            <h3 className="text-sm font-medium text-black">
              I want an ATM Card
            </h3>
            <p className="text-[#667085] text-xs">
              {" "}
              Request an ATM card for the customer to make payments.
            </p>
          </div>
        </div>
      </div>
      <footer className="flex gap-4  py-4 mt-auto sm:flex-row flex-col-reverse">
        <PrimaryButtons
          text={"Edit Credentials"}
          className="flex-row-reverse font-medium border-[#D0D5DD] border text-black h-[48px] rounded-lg  justify-center items-center"
          icon="/icons/arrow_back.png"
          onClick={decrementStep}
        />
        <PrimaryButtons
          text={"Proceed - Passport Capture"}
          onClick={CreateUserAccount}
          className={
            " h-[48px] bg-black text-white font-medium rounded-lg sm:w-96 justify-center items-center"
          }
        />
      </footer>
    </div>
  );
};

export default ReviewCredentials;
