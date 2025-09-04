"use client";
import React from "react";
import Steps from "../../_components/ui/cards/Steps";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import PrimaryButtons from "../../_components/ui/units/buttons/PrimaryButtons";
import PersonalDetailsForm from "./_components/PersonalDetailsForm";
import { useFetchState } from "@/app/account/create-account/_components/useFetchState";
import Address from "./_components/OriginandAddress";
import PlanValidity from "./_components/Plan&Validity";
import ReviewHMO from "./_components/ReviewHMO";
import SuccessfulHMOPurchase from "./_components/SuccessfulHMOPurchase";

interface Step {
  id: number;
  title: string;
  image?: string;
  style?: string;
}
 interface CustomerAddress {
  state: string;
  city: string;
  address: string;
  lga: string;
  utilityBillImage?: File | null;
}

const Page = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { states, isLoading, error } = useFetchState() as {
    states: string[];
    isLoading: boolean;
    error: string;
  };

const [originAddress, setOriginAddress] = useState<CustomerAddress | undefined>()

  const [selectedState, setSelectedState] = useState<string>("");

  const [customerPhoto, setCustomerPhoto] = useState<File | undefined>(
    undefined
  );
  const cancelRegistration = () => {
    setCurrentStep(0);
  };
  return (
    <div className="lg:ml-56 lg:px-8 lg:max-w[calc(100%-15rem)] lg:py-8 xs:px-4 py-6">
      <div
        className={clsx(" items-center justify-between mb-4 px-4 xs:px-0", {
          hidden: currentStep == steps.length - 1,
          flex: currentStep !== steps.length,
        })}
      >
        <div className="">
          <h4 className="text-sm text-[#454547] sm:block hidden md:hidden lg:block">
            HMO \ Buy HMO
          </h4>
          <h1 className="h1 text-base sm:text-2xl font-medium text-black">
            Register Customer for HMO
          </h1>
        </div>
        <PrimaryButtons
          className="mt-4 text-black hidden lg:flex bg-white border border-gray-300 hover:bg-gray-100 h-[48px] items-center justify-center"
          text="Cancel Registration"
          icon="/icons/close.svg"
          // disabled={currentStep === 1}
          onClick={cancelRegistration}
        />
        <button
          className=" text-black flex md:hidden bg-white border border-gray-300 hover:bg-gray-100 h-[40px] w-[40px] items-center justify-center rounded-lg"
          // disabled={currentStep === 1}
          onClick={cancelRegistration}
        >
          {" "}
          <Image
            src="/icons/close.svg"
            alt="cancel registration"
            width={24}
            height={24}
            className=""
          />
        </button>
        <p className="bg-[#EBF8FE] text-[#46809B] rounded-3xl py-1 px-2 w-fit hidden lg:hidden md:flex">
          step {currentStep + 1} of {steps.length}
        </p>
      </div>
      <div className={" flex   gap-5  justify-center w-full"}>
        <Steps
          steps={steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        <div
          className={clsx(
            "  mx-auto xl:w-full max-w-[600px] w-full lg:w-[400px]   min-h-[580px] text-[#667085] bg-white rounded-xs sm:rounded-3xl ",
            {
              "lg:mx-auto lg:w-[750px]  xl:w-[600px]":
                currentStep >= steps.length - 2,
            }
          )}
        >
          {currentStep === 0 && (
            <PersonalDetailsForm
              setCurrentStep={setCurrentStep}
              customerPhoto={customerPhoto}
              setCustomerPhoto={setCustomerPhoto}
            />
          )}
          {currentStep === 1 && (
            <Address
              states={states}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              isLoading={isLoading}
              error={error}
              setCurrentStep={setCurrentStep}
              setOriginAddress={setOriginAddress}
              originAddress={originAddress}
            />
          )}
          {currentStep === 2 && (
            <PlanValidity setCurrentStep={setCurrentStep} />
          )}
          {currentStep === 3 && <ReviewHMO setCurrentSep={setCurrentStep} />}
          {currentStep === 4 && (
            <SuccessfulHMOPurchase setCurrentStep={setCurrentStep} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;

const steps: Step[] = [
  {
    id: 0,
    title: "Who is buying this HMO plan?",
    image: "/image/Frame.png",
    style: "",
  },
  {
    id: 1,
    title: "Take a selfie of the customer",
    image: "/image/step_2.png",
    style: "",
  },
  {
    id: 2,
    title: "Provide your current valid means of identification",
    image: "/image/step_3.png",
    style: "",
  },
  {
    id: 3,
    title: "How can we locate the customer?",
    image: "/image/step_4.png",
    style: "",
  },
  {
    id: 4,
    title: "How can we locate the customer?",
    image: "/image/step_4.png",
    style: "",
  },
];
