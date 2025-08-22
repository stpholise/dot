'use client'
import React from "react";
import Steps from "../_components/ui/cards/Steps";
import  { useState } from 'react'

interface Step {
  id: number;
  title: string;
  image?: string;
  style?: string;
}




const Page = () => {
    const [ currentStep, setCurrentStep ] = useState<number>(0);
  return (
    <div className="">
      <div
        className="
        ml-64 mt-12 text-black"
      >
        page
        <Steps steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
    </div>
  );
};

export default Page;

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
