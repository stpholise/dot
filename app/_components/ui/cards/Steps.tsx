import Image from "next/image";
import clsx from "clsx";       
interface Step {
  id: number;
  title: string;
  image?: string;
  style?: string;
}

interface StepsProps {
  steps: Step[];
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const Steps = ({ currentStep, steps, setCurrentStep }: StepsProps) => {
  return (
    <div className={" flex lg:gap-8  gap-5 lg:justify-between justify-center"}>
      <div
        className={clsx(
          "sticky md:top-24 xl:w-[473px] lg-[444px] lg:h-[585px] bg-white rounded-2xl px-8 py-8 hidden flex-col items-center gap-4 ",
          {
            hidden: currentStep >= steps.length - 1,
            "lg:flex": currentStep < 4,
          }
        )}
      >
        <div className="grid gap-2 grid-cols-5 lg:gap-4 justify-stretch  ">
          {steps.map((step, index) => (
            <div
              onClick={() => {
                console.log(index);
                setCurrentStep(index);
              }}
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
              <h3 className="text-black font-medium text-2xl">{step.title}</h3>
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
            All accounts created on Dot App are secure and safe from any privacy
            hacks. We ensure your privacy is yours alone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Steps;
