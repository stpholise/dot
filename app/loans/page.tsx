"use client";
import Steps from "../_components/ui/cards/Steps";
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
    <div>
      <div className="">
        <Steps
          steps={steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
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
];

export default Page;
