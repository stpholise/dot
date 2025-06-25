"use client";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

interface Step {
  id: number;
  title: string;
  image?: string;
  style?: string;
}

const Page = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <div className="lg:ml-60 lg:px-8 lg:max-w[calc(100%-15rem)] lg:py-8 px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="">
          <h4 className="text-sm text-[#454547]">
            Dot MFB Account Opening \ Create Account
          </h4>
          <h1 className="h1 text-2xl font-medium text-black">
            Create a Dot MFB Account
          </h1>
        </div>
        <PrimaryButtons
          className="mt-4 text-black bg-white border border-gray-300 hover:bg-gray-100"
          text="Cancel Registration"
          icon="/icons/close.svg"
        />
      </div>
      <div className="">
        <div
          className="  lg:w-[473px] lg:h-[585px] bg-white rounded-2xl px-8 py-8
        flex flex-col items-center "
        >
          <div className="flex gap-2 lg:gap-4 justify-stretch  ">
            {steps.map((step, index) => (
              <div
                onClick={() => setCurrentStep(index)}
                key={index}
                className={clsx("w-12 lg:w-16 h-1 rounded-sm  ", {
                  "bg-gray-300": currentStep !== index,
                  "bg-gray-400": currentStep === index,
                })}
              ></div>
            ))}
          </div>
          {steps.map((step, index) => (
            <div
              key={step.id + index}
              className={clsx(
                "flex flex-col items-center gap-2 mt-4",

                currentStep === index ? " flex" : "hidden"
              )}
            >
              <div className="">
                <p className="bg-[#EBF8FE] text-[#46809B] rounded-3xl py-1 px-2 w-fit">
                  step {step.id} of {steps.length}
                </p>
                <h3 className="text-black font-medium text-xl">{step.title}</h3>
              </div>
              <div className="border border-gray-300 p-4 rounded-lg">
                <Image
                  alt={step.title}
                  src={step.image ? step.image : ""}
                  height={90}
                  width={200}
                  className={clsx("", step.style)}
                />
              </div>
            </div>
          ))}
          <div className="">
            <Image
              alt="lock icon"
              src="/icons/lock.svg"
              height={24}
              width={24}
              className="mb-2"
            />
            <p className="">
              All accounts created on Dot App are secure and safe from any
              privacy hacks. We ensure your privacy is yours alone.
            </p>
          </div>
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
    title: "Who is this account being created for?",
    image: "/image/Frame.png",
    style: "",
  },
  {
    id: 2,
    title: "Who is this account being created for?",
    image: "/image/Frame.png",
    style: "",
  },
  {
    id: 3,
    title: "Who is this account being created for?",
    image: "/image/Frame.png",
    style: "",
  },
  {
    id: 4,
    title: "Who is this account being created for?",
    image: "/image/Frame.png",
    style: "",
  },
];

export default Page;
