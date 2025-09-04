"use client";
import Steps from "../_components/ui/cards/Steps";
import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import PrimaryButtons from "../_components/ui/units/buttons/PrimaryButtons";
import PersonalDetailsForm from "./_components/PersonalDetailsForm";
import GuarantorForm from "./_components/GuarantorForm";
import NextOfKinDetailsForm from "./_components/NextOfKinDetailsForm";
import CheckCreditForm from "./_components/CheckCreditForm";
import ApplicationInformation from "./_components/ApplicationInformation";
import ReviewLoan from "./_components/ReviewLoan";
import { PersonalDetailsType } from "./_components/PersonalDetailsForm";
import Address from "../hmo/buy-hmo/_components/OriginandAddress";
import { useFetchState } from "../account/create-account/_components/useFetchState";
import { GuarantorDataDetailsType } from "./_components/GuarantorForm";
import { NextOfKinDetailsType } from "./_components/NextOfKinDetailsForm";
import { CreditFormProp } from "./_components/CheckCreditForm";
import { LoanData } from "./_components/ApplicationInformation";

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
  const [selectedState, setSelectedState] = useState<string>("");
  const [originAddress, setOriginAddress] = useState<
    CustomerAddress | undefined
  >();

  const [customerPhoto, setCustomerPhoto] = useState<File | undefined>(
    undefined
  );
  const cancelRegistration = () => {
    setCurrentStep(0);
    console.log("cancelRegistration");
  };
  const { states, isLoading, error } = useFetchState() as {
    states: string[];
    isLoading: boolean;
    error: string;
  };
  const [loanPersonalDetail, setLoanPersonalDetail] = useState<PersonalDetailsType>({
       dotAcct: '',
      fName: '',
      mName:'',
      lName:'',
      dob: '',
      phone: '',
      maritalStatus: '',
      occupation: '',
      gender: '',
      photo: undefined,
      identity: undefined,
      businessExp: '',
  });
  const [guarantorData, setGuarantorData] = useState<GuarantorDataDetailsType>({
    fName: "",
    lName: "",
    phone: "",
    relationship: "",
    address: "",
    lga: "",
    state: "",
    guarantorPhoto: undefined,
    identity: undefined,
    employmentLetter: undefined,
    signature: undefined,
  });
  const [nextOfKinData, setNextOfKinData] = useState<NextOfKinDetailsType>({
    fName: "",
    lName: "",
    phone: "",
    relationship: "",
    address: "",
    state: "",
    lga: "",
  });

  const [creditDetail, setCreditDetail] = useState<CreditFormProp>({
    householdIncome: "",
    specialFoodOccurance: "",
    householdFeeding: "",
    householdCondition: "",
  });

  const [appInformation, setAppInformation] = useState<LoanData>({
    amountRequested: "",
    loanType: "",
    loanStage: "",
    loanDuration: "",
    loanPurpose: "",
    loanHistory: false,
  });

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
            Loans \ Apply for Loan
          </h4>
          <h1 className="h1 text-base sm:text-2xl font-medium text-black">
            Register Customer for Loans
          </h1>
        </div>
        <PrimaryButtons
          className="mt-4 text-black hidden lg:flex bg-white border border-gray-300 hover:bg-gray-100 h-[48px] items-center justify-center"
          text="Cancel Registration"
          icon="/icons/close.svg"
          onClick={cancelRegistration}
        />
        <button
          className=" text-black flex md:hidden bg-white border border-gray-300 hover:bg-gray-100 h-[40px] w-[40px] items-center justify-center rounded-lg"
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
              setLoanPersonalDetail={setLoanPersonalDetail}
              loanPersonalDetail={loanPersonalDetail}
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
            <GuarantorForm
              setCurrentStep={setCurrentStep}
              customerPhoto={customerPhoto}
              setCustomerPhoto={setCustomerPhoto}
              states={states}
              setGuarantorData={setGuarantorData}
              guarantorData={guarantorData}
            />
          )}
          {currentStep === 3 && (
            <NextOfKinDetailsForm
              setCurrentStep={setCurrentStep}
              states={states}
              setNextOfKinData={setNextOfKinData}
              nextOfKinData={nextOfKinData}
            />
          )}
          {currentStep === 4 && (
            <CheckCreditForm
              setCurrentStep={setCurrentStep}
              setCreditDetail={setCreditDetail}
              creditDetail={creditDetail}
            />
          )}
          {currentStep === 5 && (
            <ApplicationInformation
              setCurrentStep={setCurrentStep}
              setAppInformation={setAppInformation}
              appInformation={appInformation}
            />
          )}
          {currentStep === 6 && (
            <ReviewLoan
              setCurrentStep={setCurrentStep}
              loanPersonalDetail={loanPersonalDetail}
              guarantorData={guarantorData}
              nextOfKinData={nextOfKinData}
              creditDetail={creditDetail}
              appInformation={appInformation}
            />
          )}
        </div>
      </div>
    </div>
  );
};

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
  {
    id: 5,
    title: "How can we locate the customer?",
    image: "/image/step_4.png",
    style: "",
  },
  {
    id: 6,
    title: "How can we locate the customer?",
    image: "/image/step_4.png",
    style: "",
  },
  {
    id: 7,
    title: "How can we locate the customer?",
    image: "/image/step_4.png",
    style: "",
  },
];

export default Page;
