"use client";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import FormHeader from "@/app/_components/ui/units/FormHeader";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import * as Yup from "yup";
import clsx from "clsx";
import ImageDropzone from "@/app/_components/ImageDropzone";
import { useFetchLGA } from "@/app/account/create-account/_components/useFetchState";
import FormTitle from "@/app/_components/ui/units/FormTitle";
import { Step } from "@/app/hmo/buy-hmo/page";

export interface GuarantorDataDetailsType {
  fName: string;
  lName: string;
  phone: string;
  relationship: string;
  address: string;
  state: string;
  lga: string;
  guarantorPhoto: File | undefined;
  identity: File | undefined;
  employmentLetter: File | undefined;
  signature: File | undefined;
}

interface PersonalDetailsFormProps {
  states: string[];
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setCustomerPhoto: React.Dispatch<React.SetStateAction<File | undefined>>;
  customerPhoto: File | undefined;
  guarantorData?: GuarantorDataDetailsType;
  setGuarantorData: React.Dispatch<
    React.SetStateAction<GuarantorDataDetailsType>
  >;
  steps: Step[];
}

const GuarantorForm = ({
  states,
  setCurrentStep,
  guarantorData,
  setGuarantorData,
  steps,
}: PersonalDetailsFormProps) => {
  const initialValues: GuarantorDataDetailsType = {
    fName: guarantorData?.fName || "",
    lName: guarantorData?.lName || "",
    phone: guarantorData?.phone || "",
    relationship: guarantorData?.relationship || "",
    address: guarantorData?.address || "",
    state: guarantorData?.state || "",
    lga: guarantorData?.lga || "",
    guarantorPhoto: undefined,
    identity: undefined,
    signature: undefined,
    employmentLetter: undefined,
  };

  const validationSchima = Yup.object({
    fName: Yup.string().required('First Name is required'),
    lName: Yup.string().required('Surname is required'),
    phone: Yup.string().required('Guarantors phone number is required'),
    relationship: Yup.string().required('What is your relationship with guarantor'),
    address: Yup.string().required('Guarantors address is required'),
    state: Yup.string().required('Guarantors state is required'),
    lga: Yup.string().required('Guarantors Local Government is required'),
    guarantorPhoto: Yup.mixed<File>().required('Add guarantors photo'),
    identity: Yup.mixed<File>().required('Add guarantors Identity image'),
    signature: Yup.mixed<File>().required('Add guarantors signature'),
    employmentLetter: Yup.mixed<File>().required('Add guarantors emplyment letter'),
  });

  const setGuarantorPhoto = (photo: File | undefined) => {
    setGuarantorData((prev) => ({ ...prev, guarantorPhoto: photo }));
  };
  const setGuarantorIdentity = (photo: File | undefined) => {
    setGuarantorData((prev) => ({ ...prev, identity: photo }));
  };
  const setGuarantorEmploymentLetter = (photo: File | undefined) => {
    setGuarantorData((prev) => ({ ...prev, employmentLetter: photo }));
  };
  const setGuarantorSignature = (photo: File | undefined) => {
    setGuarantorData((prev) => ({ ...prev, signature: photo }));
  };

  const handleFormSubmission = (
    values: GuarantorDataDetailsType,
    formik: FormikHelpers<GuarantorDataDetailsType>
  ) => {
    setCurrentStep(3);
    setGuarantorData({
      fName: values.fName,
      lName: values.lName,
      phone: values.phone,
      relationship: values.relationship,
      address: values.address,
      state: values.state,
      lga: values.lga,
      guarantorPhoto: values.guarantorPhoto,
      identity: values.identity,
      employmentLetter: values.employmentLetter,
      signature: values.signature,
    });

    formik.resetForm();
  };

  const { lga, loadingLga, errorFetchinLga } = useFetchLGA(
    guarantorData?.state ?? ""
  ) as {
    lga: string[] | undefined;
    loadingLga: boolean;
    errorFetchinLga: string | null;
  };

  return (
    <div>
      <FormTitle currentStep={2} title="Guarantor Details" steps={steps} />
      <FormHeader
        icon={{
          src: "/icons/security.png",
          alt: "user",
        }}
        primaryText="Guarantor Details"
        secondaryText="- Guarantor can’t be a family relative"
      />

      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmission}
        validationSchema={validationSchima}
      >
        {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
          <Form>
            <div className="lg:px-8 px-4 md:px-6">
              <div className="py-6 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="dotA  cct" className="text-sm text-[#454547]">
                    First Name *
                  </label>
                  <Field
                    type="text"
                    name="fName"
                    value={values.fName}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter customer first name"
                  />
                  <ErrorMessage
                    name="fName"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="lName" className="text-sm text-[#454547]">
                    Surname *
                  </label>
                  <Field
                    type="text"
                    name="lName"
                    value={values.lName}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter customer surname"
                  />
                  <ErrorMessage
                    name="lName"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm text-[#454547]">
                    Phone number*
                  </label>
                  <Field
                    type="text"
                    name="phone"
                    value={values.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const numericValue = e.target.value.replace(/\D/g, "");
                      setFieldValue("phone", numericValue);
                    }}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Guarantor phone number"
                    maxLength={11}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="relationship"
                    className="text-sm text-[#454547]"
                  >
                    Relationship *
                  </label>
                  <Field
                    type="text"
                    name="relationship"
                    value={values.relationship}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter guarantor relationship with customer"
                  />
                  <ErrorMessage
                    name="relationship"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="address" className="text-sm text-[#454547]">
                    Address *
                  </label>
                  <Field
                    type="text"
                    name="address"
                    value={values.address}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="House number, street name (land mark)"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="fname" className="text-sm text-[#454547]">
                    State *
                  </label>
                  {
                    <Field
                      as="select"
                      name="state"
                      value={values.state}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        // setSelectedState(e.target.value);
                        setFieldValue("state", e.target.value);
                        setGuarantorData((prev) => ({
                          ...prev,
                          state: e.target.value,
                        }));
                        setFieldValue("lga", "");
                      }}
                      className="w-full cursor-pointer px-4 py-3 outline-none border text-black border-gray-300 rounded-lg"
                    >
                      {!states ? (
                        <option value="" className="text-gray-300" disabled>
                          Error fetching State
                        </option>
                      ) : (
                        <option value="" className="text-gray-300" disabled>
                          select a state
                        </option>
                      )}
                      {states &&
                        states.map((state) => (
                          <option
                            className="text-black"
                            value={state}
                            key={state}
                          >
                            {state}
                          </option>
                        ))}
                    </Field>
                  }
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                {
                  <div className="">
                    <label htmlFor="lga" className="text-sm text-[#454547]">
                      Local Government Area *
                    </label>
                    {
                      <Field
                        as="select"
                        name="lga"
                        className="w-full cursor-pointer px-4 py-3 outline-none border text-black border-gray-300 rounded-lg"
                      >
                        {loadingLga ? (
                          <option value="" className="text-gray-300" disabled>
                            Loading...
                          </option>
                        ) : errorFetchinLga ? (
                          <option value="" className="text-gray-300" disabled>
                            Error fetching LGA
                          </option>
                        ) : !guarantorData?.state ||
                          guarantorData?.state == "" ? (
                          <option value="" className="text-gray-300" disabled>
                            select a state first
                          </option>
                        ) : (
                          <option value="" className="text-gray-300" disabled>
                            select a local government area
                          </option>
                        )}
                        {lga &&
                          lga.map((lgaItem) => (
                            <option
                              className="text-black"
                              value={lgaItem}
                              key={lgaItem}
                            >
                              {lgaItem}
                            </option>
                          ))}
                      </Field>
                    }
                    <ErrorMessage
                      name="lga"
                      component="div"
                      className="text-xs text-red-500"
                    />
                  </div>
                }
              </div>
              <div className="py-6 grid grid-cols-1 md:grid-cols-2 overflow-hidden gap-6 w-full">
                <div className="">
                  <ImageDropzone
                    fieldName="guarantorPhoto"
                    text="Upload or Take a photo"
                    setFieldValue={setFieldValue}
                    setFile={setGuarantorPhoto}
                    file={guarantorData?.guarantorPhoto}
                    className=" flex-col justify-center items-center gap-2 sm:h-[158px] lg:max-w-[248px] text-center"
                  />
                  <ErrorMessage
                    name="guarantorPhoto"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="">
                  <ImageDropzone
                    fieldName="identity"
                    text="Upload Identity Card"
                    setFieldValue={setFieldValue}
                    setFile={setGuarantorIdentity}
                    file={guarantorData?.identity}
                    className="flex-col justify-center items-center gap-2 sm:h-[158px] lg:max-w-[248px] text-center"
                  />
                  <ErrorMessage
                    name="identity"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="">
                  <ImageDropzone
                    fieldName="employmentLetter"
                    text="Upload Employment Letter"
                    setFieldValue={setFieldValue}
                    setFile={setGuarantorEmploymentLetter}
                    file={guarantorData?.employmentLetter}
                    className="flex-col justify-center items-center gap-2 sm:h-[158px] lg:max-w-[248px] text-center"
                  />
                  <ErrorMessage
                    name="employmentLetter"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="">
                  <ImageDropzone
                    fieldName="signature"
                    text="Upload Signature"
                    setFieldValue={setFieldValue}
                    setFile={setGuarantorSignature}
                    file={guarantorData?.signature}
                    className="flex-col justify-center items-center gap-2 sm:h-[158px] lg:max-w-[248px] text-center"
                  />
                  <ErrorMessage
                    name="signature"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
              </div>
            </div>
            <footer className="flex gap-4 px-4 sm:px-8 py-4 mt-auto sm:flex-row flex-col-reverse">
              <PrimaryButtons
                text={"Go Back"}
                icon="/icons/arrow_back.png"
                type="button"
                className="flex-row-reverse font-medium border-[#D0D5DD]  border text-black h-[48px] rounded-lg  justify-center items-center"
                onClick={() => setCurrentStep(1)}
              />
              <PrimaryButtons
                text={"Proceed "}
                type="submit"
                disabled={!isValid || isSubmitting}
                className={clsx(
                  " h-[48px]  font-medium rounded-lg sm:w-96 justify-center items-center",
                  {
                    "bg-black text-white":
                      (isValid && !isSubmitting && dirty) ||
                      (isValid && !dirty),
                    "bg-[#9A9A9A] text-white":
                      !isValid || !dirty || isSubmitting,
                  }
                )}
              />
            </footer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GuarantorForm;
