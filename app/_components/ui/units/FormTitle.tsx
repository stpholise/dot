import Image from "next/image";
import { Step } from "@/app/hmo/buy-hmo/page";
import clsx from "clsx";

const FormTitle = ({
  currentStep,
  steps,
  title,
}: {
  currentStep: number;
  steps: Step[];
  title?: string;
}) => {
  return (
    <div className=" lg:hidden px-4 sm:px-8 mt-4 flex flex-col gap-6">
      <div className=" gap-2 flex lg:gap-4  w-full ">
        {steps.slice(0, steps.length - 1).map((step, index) => (
          <div
            key={index}
            className={clsx(" flex-1    h-1 rounded-sm   ", {
              "bg-gray-300": currentStep !== index,
              "bg-gray-400": currentStep >= index,
            })}
          ></div>
        ))}
      </div>
      {title && (
        <div className=" flex gap-4 ">
          <Image
            src={"/image/Frame 48.png"}
            alt="doc"
            height={80}
            width={80}
            className="rounded-xl max-h-20 max-w-20 sm:w-20 sm:h-20 w-14 h-14"
          />
          <div className=" ">
            <p className=" text-xs sm:text-sm text-[#667085] text-medium">
              {title}
            </p>
            <h3 className="text-black text-base sm:text-3xl font-medium">
              {steps[currentStep].title}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormTitle;
