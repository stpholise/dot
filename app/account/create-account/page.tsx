"use client";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import clsx from "clsx";
import Image from "next/image";
import { useState, useEffect } from "react";
import CustomerDetailsForm from "./_components/CustomerDetailsForm";
import CaptureCustomer from "./_components/CaptureCustomer";
import Identification from "./_components/Identification";
import Address from "./_components/Address";
import ReviewCredentials from "./_components/ReviewCredentials";
import Successful from "./_components/Successful";
interface Step {
  id: number;
  title: string;
  image?: string;
  style?: string;
}

const Page = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  // const testingGeolocation = () => {
  // testing navigator for picture taking

  // navigator.mediaDevices.getUserMedia({video: {
  //   facingMode: "user",
  //   width: { ideal: 1280 },
  //   height: { ideal: 720 }
  // }, audio: false })
  //   .then((stream) => {
  //     const video = document.createElement("video");
  //     video.srcObject = stream;
  //     video.play();
  //     console.log("Video stream started successfully");
  //   })
  //   .catch((error) => {
  //     console.error("Error accessing camera:", error);
  //   });

  // testing navigator
  //   console.log("pdf viewer", navigator.pdfViewerEnabled);
  //   console.log("testing online", navigator.onLine);
  //   console.log("user agent", navigator.userAgent);
  //   console.log("language", navigator.language);
  //   console.log("credentitals", navigator.credentials);
  //   console.log("connection", navigator.connection?.effectiveType);
  //   navigator.permissions
  //     .query({ name: "geolocation" })
  //     .then((permissionStatus) => {
  //       console.log("Geolocation permission status:", permissionStatus.state);
  //     });
  //   navigator.getBattery().then((battery) => {
  //     console.log("Battery level:", battery.level);
  //     console.log("is charging:", battery.charging);
  //   });
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         console.log("Latitude:", position.coords.latitude);
  //         console.log("Longitude:", position.coords.longitude);
  //       },
  //       (error) => {
  //         console.error("Error getting location:", error);
  //       }
  //     );
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //   }
  // };
  useEffect(() => {
    console.log(currentStep);
  }, [currentStep]);

  return (
    <div className="lg:ml-56 lg:px-8 lg:max-w[calc(100%-15rem)] lg:py-8 px-4 py-6">
      <div className=" flex items-center justify-between mb-4">
        <div className="">
          <h4 className="text-sm text-[#454547]">
            Dot MFB Account Opening \ Create Account
          </h4>
          <h1 className="h1 text-2xl font-medium text-black">
            Create a Dot MFB Account
          </h1>
        </div>
        <PrimaryButtons
          className="mt-4 text-black bg-white border border-gray-300 hover:bg-gray-100 h-[52px] items-center justify-center"
          text="Cancel Registration"
          icon="/icons/close.svg"
        />
      </div>
      <div className=" flex lg:gap-8  gap-5 justify-between">
        <div
          className="  xl:w-[473px] lg-[444px] lg:h-[585px] bg-white rounded-2xl px-8 py-8
        flex flex-col items-center gap-4 "
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
              <div className=" flex flex-col gap-3 items-start justify-start  w-10/12">
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
                  height={90}
                  width={359}
                  className={clsx("lg:w-[390px]", step.style)}
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
        <div className="w-[600px] min-h-[580px] text-[#667085] bg-white rounded-3xl  ">
        
          {currentStep === 0 ? (
            <CustomerDetailsForm setCurrentStep={setCurrentStep} />
          ) : currentStep === 1 ? (
            <CaptureCustomer />
          ) : currentStep === 2 ? (
            <Identification />
          ) : currentStep === 3 ? (
            <Address />
          ) : currentStep === 4 ? (
            <ReviewCredentials />
          ) : currentStep === 5 ? (
            <Successful />
          ) : (
            <CustomerDetailsForm setCurrentStep={setCurrentStep} />
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
