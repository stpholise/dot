"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormHeader from "@/app/_components/ui/units/FormHeader";
import Image from "next/image";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import clsx from "clsx";
import * as Yup from "yup";
import DependantPopupModal from "./DependantPopupModal";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface PlanValidityTypes {
  id: string;
  planType: string;
  validityPeriod: string;
  providerState: string;
  provider: string;
  dependants: PersonalDetailsType[];
}

export interface PersonalDetailsType {
  id: string;
  fName: string;
  mName: string;
  lName: string;
  dob: string;
  phone?: string;
  relationship?: string;
  gender: string;
  photo?: File | undefined;
}

const PlanValidity = ({
  setCurrentStep,
  setPlan, 
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setPlan: React.Dispatch<React.SetStateAction<PlanValidityTypes>>; 
}) => {
  const [isDependantModalOpen, setIsDependantModalOpen] =
    useState<boolean>(false);

  const [dependants, setDependants] = useState<PersonalDetailsType[]>([]);

  const initialValues: PlanValidityTypes = {
    id: "",
    planType: "",
    validityPeriod: "",
    providerState: "",
    provider: "",
    dependants: [],
  };
  const validationSchema = Yup.object({
    planType: Yup.string().required(),
    validityPeriod: Yup.string().required(),
    providerState: Yup.string().required(),
    provider: Yup.string().required(),
  });
  const removeDependant = (item: PersonalDetailsType) => {
    const filteredList = dependants.filter(
      (dependant) => dependant.id !== item.id
    );
    setDependants(filteredList); 
  };



  const handleFormSubmission = (values: PlanValidityTypes) => {
    setPlan({
      id: uuidv4(),
      planType: values.planType,
      validityPeriod: values.validityPeriod,
      providerState: values.providerState,
      provider: values.provider,
      dependants: dependants,
    });
 
    setCurrentStep(3);
  };

  const decrementStep = () => {
    setCurrentStep(1);
  };

  return (
    <div>
      <FormHeader
        icon={{ src: "/icons/setting.svg", alt: "morde details" }}
        primaryText="Plan & Validity"
        secondaryText="- Every field is important"
      />
      {isDependantModalOpen && (
        <DependantPopupModal
          setIsDependantModalOpen={setIsDependantModalOpen}
          setDependants={setDependants} 
        />
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmission}
        validationSchema={validationSchema}
      >
        {({ values, isSubmitting, isValid }) => {
          return (
            <Form>
              <div className="py-6 px-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="planType" className="text-sm text-[#454547]">
                    Plan Type*
                  </label>
                  <Field
                    type="text"
                    name="planType"
                    as="select"
                    value={values.planType}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter customer first name"
                  >
                    <option value="">-- Select a plan --</option>
                    <option value="individual">Individual Plan</option>
                    <option value="family">Family Plan</option>
                    <option value="corporate">Corporate/Group Plan</option>
                    <option value="student">Student Plan</option>
                    <option value="basic">Basic / Bronze Plan</option>
                    <option value="standard">Standard / Silver Plan</option>
                    <option value="premium">Premium / Gold Plan</option>
                    <option value="vip">VIP / Platinum Plan</option>
                    <option value="maternity">Maternity Plan</option>
                    <option value="senior">Senior Citizen Plan</option>
                    <option value="international">
                      International Coverage Plan
                    </option>
                  </Field>
                  <ErrorMessage
                    name="planType"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="validityPeriod"
                    className="text-sm text-[#454547]"
                  >
                    Validity Period *
                  </label>
                  <Field
                    type="text"
                    name="validityPeriod"
                    as="select"
                    value={values.validityPeriod}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter customer first name"
                  >
                    <option value="">-- Select validity period --</option>
                    <option value="1_month">1 Month</option>
                    <option value="3_months">3 Months (Quarterly)</option>
                    <option value="6_months">6 Months</option>
                    <option value="12_months">12 Months (Annual)</option>
                    <option value="24_months">24 Months (2 Years)</option>
                  </Field>
                  <ErrorMessage
                    name="validityPeriod"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="providerState"
                    className="text-sm text-[#454547]"
                  >
                    Provider State *
                  </label>
                  <Field
                    type="text"
                    as="select"
                    name="providerState"
                    value={values.providerState}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter customer first name"
                  >
                    <option value="">-- Select status --</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                    <option value="terminated">Terminated</option>
                  </Field>
                  <ErrorMessage
                    name="providerState"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="provider" className="text-sm text-[#454547]">
                    Provider *
                  </label>
                  <Field
                    type="text"
                    as="select"
                    name="provider"
                    value={values.provider}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter customer first name"
                  >
                    <option value="">-- Select provider --</option>
                    <option value="axa_mansard">AXA Mansard</option>
                    <option value="avon_hmo">Avon HMO</option>
                    <option value="hygeia">Hygeia</option>
                    <option value="leadway">Leadway Health</option>
                    <option value="redcare">Redcare HMO</option>
                  </Field>
                  <ErrorMessage
                    name="provider"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
              </div>

              <div className="px-8 py-6 mb-4">
                <h5 className="font-medium text-sm text-[#4F555F] leading-5 mb-2">
                  Dependant Information
                </h5>
                <div
                  className={clsx(" flex flex-col gap-4  mb-9", {
                    "px-4 pb-4 border border-[#E1E4EA] rounded-2xl ":
                      dependants.length > 0,
                  })}
                >
                  <div className="">
                    {dependants.map((item) => (
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
                        <button
                          type="button"
                          onClick={() => removeDependant(item)}
                          className="ml-auto"
                        >
                          {" "}
                          remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    disabled={dependants.length >= 4}
                    onClick={() => setIsDependantModalOpen(true)}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg flex items-center justify-between bg-[#F7F7F7] "
                  >
                    <div className=" flex items-center gap-3">
                      <Image
                        src={"/icons/user.png"}
                        alt="icon"
                        width="12"
                        height="15"
                        className="max-w-4 max-h-4"
                      />
                      Add a dependent
                    </div>
                    <Image
                      src={"/icons/arrow-right.png"}
                      alt="icon"
                      width="16"
                      height="16"
                      className="max-w-4 max-h-4"
                    />
                  </button>
                </div>
                <div className="h-[193px] bg-[#E7FAE3] rounded-2xl  py-6 mb-4  px-8 flex flex-col justify-between gap-8">
                  <div className="flex gap-2">
                    <Image
                      src={"/icons/arrow-right.png"}
                      alt="icon"
                      width="16"
                      height="16"
                      className="max-w-4 max-h-4"
                    />
                    <p className="text-sm font-medium text-black">
                      Total Payable Amount
                    </p>
                  </div>
                  <div className="">
                    <p className="text-4xl font-medium text-[#4F555F] py-2">
                      ₦0.00
                    </p>
                    <p className="text-[#868C98] text-sm">
                      Covers from 0 months
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-8 mt-4 mb-2">
                <div className="rounded-lg bg-[#F9F9F9] flex gap-4 px-4 py-4 justify-start items-start ">
                  <Image
                    src="/icons/setting.svg"
                    alt="morde details"
                    width={16}
                    height={16}
                  />
                  <p className="text-xs">
                    Ensure the credentials provided by the customer matches
                    their means of identification, Dot Technologies does not
                    support third party account creation.
                  </p>
                </div>
              </div>
              <footer className="flex gap-4 px-4 sm:px-8 py-4 mt-auto sm:flex-row flex-col-reverse lg:flex-col-reverse xl:flex-row">
                <PrimaryButtons
                  text={"Go Back"}
                  type="button"
                  className="flex-row-reverse font-medium border-[#D0D5DD] border text-black h-[48px] rounded-lg  justify-center  items-center"
                  icon="/icons/arrow_back.png"
                  onClick={decrementStep}
                />
                <PrimaryButtons
                  text={"Proceed - Plan & Validity"}
                  type={"submit"}
                  disabled={!isValid || isSubmitting}
                  className={clsx(
                    " h-[48px] font-medium rounded-lg sm:w-96 lg:w-full xl:w-96 justify-center items-center",
                    {
                      "bg-black text-white": isValid && !isSubmitting,
                      "bg-[#9A9A9A] text-white": !isValid || isSubmitting,
                    }
                  )}
                />
              </footer>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PlanValidity;
