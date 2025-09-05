"use client";
import Image from "next/image";
import { useState } from "react";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import { PersonalDetailsType } from "./PersonalDetailsForm";
import { PlanValidityTypes } from "./Plan&Validity";
import { CustomerAddress } from "./OriginandAddress";
import { setHmo } from "@/app/store/slices/HMOPurchaseSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const ReviewHMO = ({
  setCurrentSep,
  personalData,
  originAddress,
  plan,
}: {
  setCurrentSep: React.Dispatch<React.SetStateAction<number>>;
  personalData: PersonalDetailsType;
  originAddress?: CustomerAddress;
  plan: PlanValidityTypes;
}) => {
  const dispatch = useDispatch();
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);

  const confirmHMOPurchase = () => {
    setCurrentSep(4);
    dispatch(
      setHmo({
        id: uuidv4(),
        personalDetail: {
          fName: personalData.fName,
          mName: personalData.mName,
          lName: personalData.lName,
          dob: personalData.dob,
          phone: personalData.phone,
          maritalStatus: personalData.maritalStatus,
          occupation: personalData.occupation,
          gender: personalData.gender,
          photo: personalData.photo?.name,
          identity: personalData.identity?.name,
        },
        originandAddress: {
          state: originAddress?.state,
          city: originAddress?.city,
          address: originAddress?.address,
          lga: originAddress?.lga,
        },
        plan: {
          id: plan.id,
          planType: plan.planType,
          validityPeriod: plan.validityPeriod,
          providerState: plan.providerState,
          provider: plan.provider,
          dependants: plan.dependants.map((item) =>
            item.photo instanceof File ? item.photo.name : item.photo
          ),
        },
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
        <div className="size-12 bg-gray-200 flex items-center justify-center rounded-full">
          {personalData.fName.charAt(0) + personalData.lName.charAt(0)}
        </div>
        <div className="">
          <h4 className="text-black font-medium text-xl">
            {personalData.fName +
              " " +
              personalData.mName +
              " " +
              personalData.lName}
          </h4>
          <p className="text-[#667085] text-sm">&#9743; {personalData.phone}</p>
        </div>
      </div>
      <div className=" grid grid-cols-2 gap-4">
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">Date of Birth</p>
          <p className="font-medium text-base text-black">{personalData.dob}</p>
        </div>
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">Gender</p>
          <p className="font-medium text-base text-black">{personalData.dob}</p>
        </div>
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">Marital Status</p>
          <p className="font-medium text-base text-black">
            {personalData.maritalStatus}
          </p>
        </div>
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">Occupation</p>
          <p className="font-medium text-base text-black">
            {personalData.occupation}
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
              {personalData?.photo?.name ?? "No ID back image uploaded"}
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
              {personalData?.photo?.name ?? "No ID back image uploaded"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 whitespace-nowrap items-center text-xs uppercase font-medium py-4">
        origin & address
        <div className="h-0 border border-gray-200 w-full "></div>
      </div>
      <div className=" grid grid-cols-2 gap-4 py-4">
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5"> Place of Birth</p>
          <p className="font-medium text-base text-black">
            {originAddress?.city}
          </p>
        </div>
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">Address</p>
          <p className="font-medium text-base text-black">
            {originAddress?.address}
          </p>
        </div>
      </div>

      <div className="flex gap-4 whitespace-nowrap items-center text-xs uppercase font-medium py-4">
        plan & validity
        <div className="h-0 border border-gray-200 w-full"></div>
      </div>

      <div className=" grid grid-cols-2 gap-4 py-4">
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">Plan Type</p>
          <p className="font-medium text-base text-black">{plan.planType}</p>
        </div>
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">Validity Period</p>
          <p className="font-medium text-base text-black">
            {plan.validityPeriod}
          </p>
        </div>
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">Provider State</p>
          <p className="font-medium text-base text-black">
            {plan.providerState}
          </p>
        </div>
        <div className="">
          <p className="text-xs text-[#667085] leading-4.5">Provider</p>
          <p className="font-medium text-base text-black">{plan.provider}</p>
        </div>
      </div>

      <div className="dependent py-4">
        dependant
        <div className="">
          {plan.dependants.map((item) => (
            <div
              className="flex items-center gap-2 my-6 relative"
              key={item.id}
            >
              <div className="size-12 bg-gray-200 flex items-center justify-center rounded-full">
                {item.fName.charAt(0) + item.lName.charAt(0)}
              </div>
              <div className="">
                <h4 className="text-black font-medium text-xl">
                  {item.fName + " " + item.mName + " " + item.lName}
                </h4>
              </div>
            </div>
          ))}
        </div>
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
          <p className="text-sm font-medium text-black">Total Payable Amount</p>
        </div>
        <div className="">
          <p className="text-4xl font-medium text-[#4F555F] py-2">₦0.00</p>
          <p className="text-[#868C98] text-sm">Covers from 0 months</p>
        </div>
      </div>

      <div className="flex items-start gap-4 py-4">
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
          onClick={confirmHMOPurchase}
        />
        <PrimaryButtons
          text={"Confirm HMO Purchase"}
          onClick={confirmHMOPurchase}
          className={
            " h-[48px] bg-black text-white font-medium rounded-lg sm:w-96 justify-center items-center"
          }
        />
      </footer>
    </div>
  );
};

export default ReviewHMO;
