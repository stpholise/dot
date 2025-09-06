"use client";
import Image from "next/image";
import { useState } from "react";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import { PersonalDetailsType } from "./PersonalDetailsForm";
import { GuarantorDataDetailsType } from "./GuarantorForm";
import { NextOfKinDetailsType } from "./NextOfKinDetailsForm";
import { CreditFormProp } from "./CheckCreditForm";
import { LoanData } from "./ApplicationInformation";
import { useDispatch } from "react-redux";
import { setLoan } from "@/app/store/slices/HMOPurchaseSlice";
import { v4 as uuidv4 } from "uuid";

const ReviewLoan = ({
  setCurrentStep,
  loanPersonalDetail,
  guarantorData,
  nextOfKinData,
  creditDetail,
  appInformation,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  loanPersonalDetail: PersonalDetailsType;
  guarantorData: GuarantorDataDetailsType;
  nextOfKinData: NextOfKinDetailsType;
  creditDetail: CreditFormProp;
  appInformation: LoanData;
}) => {
  const dispatch = useDispatch();
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);

  const confirmLoanApplication = () => {
    setCurrentStep(7);
    dispatch(
      setLoan({
        id: uuidv4(),
        personalDetail: {
          ...loanPersonalDetail,
          photo: loanPersonalDetail.photo?.name,
          identity: loanPersonalDetail.identity?.name,
        },
        guarantor: {
          ...guarantorData,
          guarantorPhoto: guarantorData.guarantorPhoto?.name,
          identity: guarantorData.identity?.name,
          employmentLetter: guarantorData.employmentLetter?.name,
          signature: guarantorData.signature?.name,
        },
        loanValues: appInformation,
      })
    );
  };

  return (
    <div className="py-6 px-8 ">
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

      <div className="flex items-center gap-2 my-6">
        <div className="size-12 bg-gray-200 flex items-center justify-center rounded-full uppercase">
          {loanPersonalDetail.fName.charAt(0) +
            loanPersonalDetail.lName.charAt(0)}
        </div>
        <div className="">
          <h4 className="text-black font-medium text-xl">
            {loanPersonalDetail.fName + " " + loanPersonalDetail.lName}
          </h4>
          <p className="text-[#667085] text-sm">
            &#9743; {loanPersonalDetail.phone}{" "}
          </p>
        </div>
      </div>
      <div className=" grid grid-cols-2 gap-4">
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">Date of Birth</p>
          <p className="font-medium text-base text-black">
            {loanPersonalDetail.dob}
          </p>
        </div>
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">Gender</p>
          <p className="font-medium text-base text-black">
            {loanPersonalDetail.gender}
          </p>
        </div>
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">Marital Status</p>
          <p className="font-medium text-base text-black">
            {loanPersonalDetail.maritalStatus}
          </p>
        </div>
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">Occupation</p>
          <p className="font-medium text-base text-black">
            {loanPersonalDetail.occupation}
          </p>
        </div>
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">BVN</p>
          <p className="font-medium text-base text-black">
            {loanPersonalDetail.dotAcct}
          </p>
        </div>
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">
            {" "}
            Dot Account Number
          </p>
          <p className="font-medium text-base text-black">
            {loanPersonalDetail.dotAcct}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 my-6">
        <div className=" flex gap-4 rounded-2xl h-16 py-2 px-4 bg-[#F7F7F7]">
          <Image
            src={"/icons/document.png"}
            alt={"document"}
            width={40}
            height={40}
            className=""
          />
          <div className="">
            <h4 className="text-black text-sm">Customer Photo</h4>
            <p className="text-[#868C98] text-xs overflow-hidden">
              {loanPersonalDetail?.photo?.name ?? "No ID back image uploaded"}
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
            <h4 className="text-black text-sm">Identity Document</h4>
            <p className="text-[#868C98] text-xs overflow-hidden">
              {loanPersonalDetail?.identity?.name ??
                "No ID back image uploaded"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 whitespace-nowrap items-center text-xs uppercase font-medium py-4">
        Guarantor’s details
        <div className="h-0 border border-gray-200 w-full "></div>
      </div>
      <div className="flex items-center gap-2 my-6">
        <div className="size-12 bg-gray-200 flex items-center justify-center rounded-full uppercase">
          {guarantorData.fName.charAt(0) + guarantorData.lName.charAt(0)}
        </div>
        <div className="">
          <h4 className="text-black font-medium text-xl">
            {guarantorData.fName + " " + guarantorData.lName}
          </h4>
          <p className="text-[#667085] text-sm">
            &#9743; {guarantorData.phone}{" "}
          </p>
        </div>
      </div>
      <div className=" grid grid-cols-2 gap-4 py-4">
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5"> RelationShip</p>
          <p className="font-medium text-base text-black">
            {guarantorData.relationship}
          </p>
        </div>
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">Address</p>
          <p className="font-medium text-base text-black">
            {guarantorData.address}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 my-6">
        <div className=" flex gap-4 rounded-2xl h-16 py-2 px-4 bg-[#F7F7F7]">
          <Image
            src={"/icons/document.png"}
            alt={"document"}
            width={40}
            height={40}
            className=""
          />
          <div className="">
            <h4 className="text-black text-sm">Selfie Photo</h4>
            <p className="text-[#868C98] text-xs overflow-hidden">
              {guarantorData?.guarantorPhoto?.name ??
                "No ID back image uploaded"}
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
            <h4 className="text-black text-sm">Identity Document</h4>
            <p className="text-[#868C98] text-xs overflow-hidden">
              {guarantorData?.identity?.name ?? "No ID back image uploaded"}
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
            <h4 className="text-black text-sm">Employment Letter</h4>
            <p className="text-[#868C98] text-xs overflow-hidden">
              {guarantorData?.employmentLetter?.name ??
                "No ID back image uploaded"}
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
            <h4 className="text-black text-sm">Signature</h4>
            <p className="text-[#868C98] text-xs overflow-hidden">
              {guarantorData?.signature?.name ?? "No ID back image uploaded"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 whitespace-nowrap items-center text-xs uppercase font-medium py-4">
        next of kin
        <div className="h-0 border border-gray-200 w-full"></div>
      </div>

      <div className="flex items-center gap-2 my-6">
        <div className="size-12 bg-gray-200 flex items-center justify-center rounded-full uppercase">
          {nextOfKinData.fName.charAt(0) + nextOfKinData.lName.charAt(0)}
        </div>
        <div className="">
          <h4 className="text-black font-medium text-xl">
            {nextOfKinData.fName + " " + nextOfKinData.lName}
          </h4>
          <p className="text-[#667085] text-sm">
            &#9743; {nextOfKinData.phone}{" "}
          </p>
        </div>
      </div>

      <div className=" grid grid-cols-2 gap-4 py-4">
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">Relationship</p>
          <p className="font-medium text-base text-black">
            {nextOfKinData.relationship}
          </p>
        </div>
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">Address</p>
          <p className="font-medium text-base text-black">
            {nextOfKinData.address}
          </p>
        </div>
      </div>
      <div className="flex gap-4 whitespace-nowrap items-center text-xs uppercase font-medium py-4">
        Credit Check
        <div className="h-0 border border-gray-200 w-full"></div>
      </div>
      <div className="flex flex-col gap-4 my-6">
        <div className="border border-[#E1E4EA] rounded-2xl pl-4 py-2 pr-10 w-fit">
          <p className="text-[#667085] text-xs">
            Total household income per month?
          </p>
          <p className="font-medium text-black  ">
            {creditDetail.householdIncome}
          </p>
        </div>
        <div className="border border-[#E1E4EA] rounded-2xl pl-4 py-2 pr-10 w-fit">
          <p className="text-[#667085] text-xs">
            Times you cook special food in your household?
          </p>
          <p className="font-medium text-black  ">
            {creditDetail.specialFoodOccurance}
          </p>
        </div>
        <div className="border border-[#E1E4EA] rounded-2xl pl-4 py-2 pr-10 w-fit">
          <p className="text-[#667085] text-xs">
            How regular is the daily feeding in your household?
          </p>
          <p className="font-medium text-black  ">
            {creditDetail.householdFeeding}
          </p>
        </div>
        <div className="border border-[#E1E4EA] rounded-2xl pl-4 py-2 pr-10 w-fit">
          <p className="text-[#667085] text-xs">
            The interior/exterior condition of your house’s ceiling/walls?
          </p>
          <p className="font-medium text-black  ">
            {creditDetail.householdCondition}
          </p>
        </div>
      </div>
      <div className="flex gap-4 whitespace-nowrap items-center text-xs uppercase font-medium py-4">
        application information
        <div className="h-0 border border-gray-200 w-full"></div>
      </div>

      <div className="h-[193px] bg-[#E7FAE3] rounded-2xl  py-6 px-8 flex flex-col justify-between gap-8  ">
        <div className="flex gap-2">
          <Image
            src={"/icons/arrow-right.png"}
            alt="icon"
            width="16"
            height="16"
            className="max-w-4 max-h-4"
          />
          <p className="text-sm font-medium text-black">
            Total Amount Requested
          </p>
        </div>
        <div className="">
          <p className="text-4xl font-medium text-[#4F555F] py-2">
            ₦{appInformation.amountRequested}
          </p>
          <p className="text-[#868C98] text-sm">for 3 months</p>
        </div>
      </div>
      <div className=" grid grid-cols-2 gap-4 my-6">
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">Loan Type</p>
          <p className="font-medium text-base text-black">
            {appInformation.loanType}
          </p>
        </div>
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">Loan Stage</p>
          <p className="font-medium text-base text-black">
            {appInformation.loanStage}
          </p>
        </div>
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">Purpose of Loan</p>
          <p className="font-medium text-base text-black">
            {appInformation.loanPurpose}
          </p>
        </div>
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">
            Have you taken a loan before?
          </p>
          <p className="font-medium text-base text-black">
            {appInformation.loanHistory === true
              ? "Yes, I have"
              : "No, I have not"}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4 py-4  mt-8">
        <input
          type="checkbox"
          name="agreeToTerms"
          checked={agreeToTerms}
          onChange={() => setAgreeToTerms((prev) => !prev)}
          className="w-4 h-4 rounded-md cursor-pointer"
        />
        <label
          onClick={() => setAgreeToTerms((prev) => !prev)}
          htmlFor="withATM"
          className="cursor-pointer flex flex-col gap-1 justify-start"
        >
          <h3 className="text-sm font-medium text-black">
            I agree with Dot HMO Contract
          </h3>
          <p className="text-[#667085] text-xs">
            Read through and accept our terms of HMO registration.
          </p>
        </label>
      </div>
      <footer className="flex gap-4  py-4 mt-auto sm:flex-row flex-col-reverse">
        <PrimaryButtons
          text={"Edit Credentials"}
          type="button"
          className="flex-row-reverse font-medium border-[#D0D5DD] border text-black h-[48px] rounded-lg  justify-center items-center"
          icon="/icons/arrow_back.png"
          onClick={() => setCurrentStep(5)}
        />
        <PrimaryButtons
          text={"Confirm HMO Purchase"}
          onClick={confirmLoanApplication}
          className={
            " h-[48px] bg-black text-white font-medium rounded-lg sm:w-96 justify-center items-center"
          }
        />
      </footer>
    </div>
  );
};

export default ReviewLoan;
