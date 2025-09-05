"use client";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import FormHeader from "@/app/_components/ui/units/FormHeader";
import Image from "next/image";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import clsx from "clsx";
import * as Yup from "yup";
import DependantPopupModal from "./DependantPopupModal";
import { useState } from "react";

interface PlanValidityTypes {
  id: string;
  planType: string;
  validityPeriod: string;
  providerState: string;
  provider: string;
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
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  // const [customerPhoto, setCustomerPhoto] = useState<File | undefined>(
  //   undefined
  // );
  const [isDependantModalOpen, setIsDependantModalOpen] =
    useState<boolean>(false);

  const [dependants, setDependants] = useState<PersonalDetailsType[]>([]);

  const initialValues: PlanValidityTypes = {
    id: "",
    planType: "",
    validityPeriod: "",
    providerState: "",
    provider: "",
  };
  const validationSchema = Yup.object({
    palyType: Yup.string().required(),
    validityPeriod: Yup.string().required(),
    ProviderState: Yup.string().required(),
    Provider: Yup.string().required(),
  });

  const handleFormSubmission = (
    values: PlanValidityTypes,
    formik: FormikHelpers<PlanValidityTypes>
  ) => {
    console.log(values);
    console.log("formik", formik);
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
          dependants={dependants}
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
                  <label htmlFor="fName" className="text-sm text-[#454547]">
                    Plan Type*
                  </label>
                  <Field
                    type="text"
                    name="planType"
                    value={values.planType}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter customer first name"
                  />
                  <ErrorMessage
                    name="planType"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="fName" className="text-sm text-[#454547]">
                    Validity Period *
                  </label>
                  <Field
                    type="text"
                    name="validityPeriod"
                    value={values.validityPeriod}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter customer first name"
                  />
                  <ErrorMessage
                    name="validityPeriod"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="fName" className="text-sm text-[#454547]">
                    Provider State *
                  </label>
                  <Field
                    type="text"
                    name="providerState"
                    value={values.providerState}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter customer first name"
                  />
                  <ErrorMessage
                    name="providerState"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="fName" className="text-sm text-[#454547]">
                    Provider *
                  </label>
                  <Field
                    type="text"
                    name="provider"
                    value={values.provider}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter customer first name"
                  />
                  <ErrorMessage
                    name="provider"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
              </div>

              <div className="px-8 py-6">
                <div
                  className={clsx("", {
                    "px-4": dependants.length > 0,
                  })}
                >
                  <button
                    onClick={() => setIsDependantModalOpen(true)}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg flex items-center justify-between bg-[#F7F7F7] my-6"
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
                <div className="h-[193px] bg-[#E7FAE3] rounded-2xl  py-6 px-8 flex flex-col justify-between gap-8">
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
              <div className="px-8 my-6">
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
