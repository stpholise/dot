"use client";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import clsx from "clsx";
import Image from "next/image";
import CustomerDetailsForm from "./_components/CustomerDetailsForm";
import CaptureCustomer from "./_components/CaptureCustomer";
import Identification from "./_components/Identification";
import Address from "./_components/Address";
import ReviewCredentials from "./_components/ReviewCredentials";
import Successful from "./_components/Successful";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentStep,
  resetUserDetails,
} from "@/app/store/slices/UserAccountSlice";
import { RootState } from "@/app/store";
import { useState } from "react";
import { useFetchState } from "./_components/useFetchState";
 

interface Step {
  id: number;
  title: string;
  image?: string;
  style?: string;
}

const Page = () => {
  const dispatch = useDispatch();
  const { states, isLoading, error } = useFetchState() as {
    states: string[];
    isLoading: boolean;
    error: string;
  };
  const currentStep = useSelector(
    (state: RootState) => state.userAccount.initialStepState.currentStep
  );

  const [picture, setPicture] = useState<File | undefined>();
  const [idFront, setIdFront] = useState<File | undefined>();
  const [idBack, setIdBack] = useState<File | undefined>();
  const [selectedState, setSelectedState] = useState<string>("");

  const cancelRegistration = () => {
    setSelectedState("");
    setPicture(undefined);
    setIdFront(undefined);
    setIdBack(undefined);
    dispatch(resetUserDetails());
    dispatch(setCurrentStep(0));
  };

  return (
    <div className="lg:ml-56 lg:px-8 lg:max-w[calc(100%-15rem)] lg:py-8 xs:px-4 py-6">
      <div
        className={clsx(" items-center justify-between mb-4 px-4 xs:px-0", {
          hidden: currentStep == 5,
          flex: currentStep !== 5,
        })}
      >
        <div className="">
          <h4 className="text-sm text-[#454547] sm:block hidden md:hidden lg:block">
            Dot MFB Account Opening \ Create Account
          </h4>
          <h1 className="h1 text-base sm:text-2xl font-medium text-black">
            Create a Dot MFB Account
          </h1>
        </div>
        <PrimaryButtons
          className="mt-4 text-black hidden lg:flex bg-white border border-gray-300 hover:bg-gray-100 h-[48px] items-center justify-center"
          text="Cancel Registration"
          icon="/icons/close.svg"
          disabled={currentStep === 1}
          onClick={cancelRegistration}
        />
        <button
          className=" text-black flex md:hidden bg-white border border-gray-300 hover:bg-gray-100 h-[40px] w-[40px] items-center justify-center rounded-lg"
          disabled={currentStep === 1}
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
      <div
        className={" flex lg:gap-8  gap-5 lg:justify-between justify-center"}
      >
        <div
          className={clsx(
            "sticky md:top-24 xl:w-[473px] lg-[444px] lg:h-[585px] bg-white rounded-2xl px-8 py-8 hidden flex-col items-center gap-4 ",
            {
              hidden: currentStep >= 4,
              "lg:flex": currentStep < 4,
            }
          )}
        >
          <div className="grid gap-2 grid-cols-5 lg:gap-4 justify-stretch  ">
            {steps.map((step, index) => (
              <div
                onClick={() => setCurrentStep(index)}
                key={index}
                className={clsx(
                  "w-12 lg:w-16 h-1 rounded-sm hover:cursor-pointer ",
                  {
                    "bg-gray-300": currentStep !== index,
                    "bg-gray-400": currentStep >= index,
                  }
                )}
              ></div>
            ))}
          </div>
          {steps.map((step, index) => (
            <div
              key={step.id + index}
              className={clsx(
                "flex flex-col items-start gap-2 mt-4 lg:gap-8",

                currentStep === index ? " flex" : "hidden"
              )}
            >
              <div className=" flex flex-col gap-3 items-start justify-start  xl:w-10/12 w-10/12 lg:w-full">
                <p className="bg-[#EBF8FE] text-[#46809B] rounded-3xl py-1 px-2 w-fit">
                  step {step.id + 1} of {steps.length}
                </p>
                <h3 className="text-black font-medium text-2xl">
                  {step.title}
                </h3>
              </div>
              <div className="border border-gray-300 p-4 rounded-lg">
                <Image
                  alt={step.title}
                  src={step.image ? step.image : ""}
                  height={190}
                  width={359}
                  className={clsx("lg:w-[390px] h-[190px]", step.style)}
                />
              </div>
            </div>
          ))}

          <div className="text-xs text-[#667085] flex gap-4 items-start mt-auto">
            <Image
              alt="lock icon"
              src="/icons/security.png"
              height={16}
              width={16}
              className="mb-2"
            />
            <p className="">
              All accounts created on Dot App are secure and safe from any
              privacy hacks. We ensure your privacy is yours alone.
            </p>
          </div>
        </div>
        <div
          className={clsx(
            "xl:w-[600px] max-w-[600px] w-full lg:w-[400px]   min-h-[580px] text-[#667085] bg-white rounded-xs sm:rounded-3xl  ",
            {
              "lg:mx-auto lg:w-[750px]  xl:w-[600px]": currentStep >= 4,
            }
          )}
        >
          <div
            className={clsx(
              "grid gap-2 grid-cols-5 lg:gap-4 justify-stretch lg:hidden px-4 sm:px-8 py-4 mt-4 ",
              {
                hidden: currentStep >= 4,
              }
            )}
          >
            {steps.map((step, index) => (
              <div
                onClick={() => setCurrentStep(index)}
                key={index}
                className={clsx(
                  "md:w-24 sm:w-20  h-1 rounded-sm hover:cursor-pointer ",
                  {
                    "bg-gray-300": currentStep !== index,
                    "bg-gray-400": currentStep >= index,
                  }
                )}
              ></div>
            ))}
          </div>
          {currentStep === 0 ? (
            <CustomerDetailsForm
              setSelectedState={setSelectedState}
              setPicture={setPicture}
              setIdFront={setIdFront}
              setIdBack={setIdBack}
            />
          ) : currentStep === 1 ? (
            <CaptureCustomer setPicture={setPicture} picture={picture} />
          ) : currentStep === 2 ? (
            <Identification
              setIdFront={setIdFront}
              setIdBack={setIdBack}
              idFront={idFront}
              idBack={idBack}
            />
          ) : currentStep === 3 ? (
            <Address
              states={states}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              isLoading={isLoading}
              error={error}
            />
          ) : currentStep === 4 ? (
            <ReviewCredentials
              picture={picture}
              setPicture={setPicture}
              idFront={idFront}
              idBack={idBack}
              setIdFront={setIdFront}
              setIdBack={setIdBack}
              setSelectedState={setSelectedState}
            />
          ) : currentStep === 5 ? (
            <Successful />
          ) : (
            <CustomerDetailsForm
              setSelectedState={setSelectedState}
              setPicture={setPicture}
              setIdFront={setIdFront}
              setIdBack={setIdBack}
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
    title: "Who is this account being created for?",
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
    title: "Who is this account being created for?",
    image: "/image/step_4.png",
    style: "",
  },
];

export default Page;
