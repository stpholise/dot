"use client";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import FormHeader from "@/app/_components/ui/units/FormHeader";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import ImageDropzone from "@/app/_components/ImageDropzone";
import { useState } from "react";

export interface PersonalDetailsType {
  dotAcct?: string;
  fName: string;
  mName: string;
  lName: string;
  dob: string;
  phone: string;
  maritalStatus: string;
  businessExp: string;
  occupation: string;
  gender: string;
  photo: File | undefined;
  identity: File | undefined;
}

interface PersonalDetailsFormProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setCustomerPhoto: React.Dispatch<React.SetStateAction<File | undefined>>;
  setLoanPersonalDetail: React.Dispatch<
    React.SetStateAction<PersonalDetailsType>
  >;
  loanPersonalDetail: PersonalDetailsType;
  customerPhoto: File | undefined;
}

const PersonalDetailsForm = ({
  setCurrentStep,
  customerPhoto,
  setCustomerPhoto,
  setLoanPersonalDetail,
  loanPersonalDetail,
}: PersonalDetailsFormProps) => {
  const router = useRouter();

  const initialValues: PersonalDetailsType = {
    dotAcct: loanPersonalDetail?.dotAcct || "",
    fName: loanPersonalDetail?.fName || "",
    mName: loanPersonalDetail?.mName || "",
    lName: loanPersonalDetail?.lName || "",
    dob: loanPersonalDetail?.dob || "",
    phone: loanPersonalDetail?.phone || "",
    maritalStatus: loanPersonalDetail?.maritalStatus || "",
    businessExp: loanPersonalDetail?.businessExp || "0",
    occupation: loanPersonalDetail?.occupation || "",
    gender: loanPersonalDetail?.gender || "",
    photo: loanPersonalDetail?.photo || undefined,
    identity: loanPersonalDetail?.identity || undefined,
  };

  const validationSchima = Yup.object({
    dotAcct: Yup.string().required("Dot Account is required"),
    fName: Yup.string().required("First name is required"),
    mName: Yup.string(),
    lName: Yup.string().required("Surname is required"),
    dob: Yup.string().required("Date of birth is required"),
    phone: Yup.string().required("Phone is required"),
    occupation: Yup.string().required("Occupation is required"),
    businessExp: Yup.string().required("Business experience is required"),
    gender: Yup.string().oneOf(["male", "female"], "Select male or female"),
    maritalStatus: Yup.string().required(),
    photo: Yup.mixed().required(),
    identity: Yup.mixed().required(),
  });

  const [userIdentity, setUserIdentity] = useState<File | undefined>();

  const handleFormSubmission = (
    values: PersonalDetailsType,
    formik: FormikHelpers<PersonalDetailsType>
  ) => {
    setCurrentStep(1);
    console.log("values", values);
    setLoanPersonalDetail({
      dotAcct: values.dotAcct,
      fName: values.fName,
      mName: values.mName,
      lName: values.lName,
      dob: values.dob,
      phone: values.phone,
      maritalStatus: values.maritalStatus,
      occupation: values.occupation,
      gender: values.gender,
      photo: customerPhoto,
      identity: userIdentity,
      businessExp: values.businessExp,
    });
    formik.resetForm();
  };
  const storedCustomerDetailsCheck = () => {
    setCurrentStep(0);
    return true;
  };

  return (
    <div>
      <FormHeader
        icon={{
          src: "/icons/security.png",
          alt: "user",
        }}
        primaryText="Personal Details"
        secondaryText="- Ensure name matches identity document"
      />

      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmission}
        validationSchema={validationSchima}
      >
        {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
          <Form>
            <div className="lg:px-8">
              <div className="py-6 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="dotA  cct" className="text-sm text-[#454547]">
                    Dot Account *
                  </label>
                  <Field
                    type="text"
                    name="dotAcct"
                    value={values.dotAcct}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const numericValue = e.target.value.replace(/\D/g, "");
                      setFieldValue("dotAcct", numericValue);
                    }}
                    maxLength={11}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter customer first name"
                  />
                  <ErrorMessage
                    name="dotAcct"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
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
                  <label htmlFor="mName" className="text-sm text-[#454547]">
                    Middele Name
                  </label>
                  <Field
                    type="text"
                    name="mName"
                    value={values.mName}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter customer middle name"
                  />
                  <ErrorMessage
                    name="mName"
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
                  <label htmlFor="dob" className="text-sm text-[#454547]">
                    Date of Birth *
                  </label>
                  <Field
                    type="date"
                    name="dob"
                    value={values.dob}
                    max={"2007-12-31"}
                    onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                      (e.target as HTMLInputElement).showPicker();
                    }}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Day - Month - Year, ex. 01-12-1990"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lname" className="text-sm text-[#454547]">
                    Phone *
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
                    placeholder="Enter registered phone number"
                    maxLength={11}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>

                <div className="">
                  <label
                    htmlFor="occupation"
                    className="text-sm text-[#454547]"
                  >
                    Customer Gender *
                  </label>
                  <div className="display flex gap-4 mt-2 w-full justify-stretch">
                    <label
                      htmlFor="gender_male"
                      className=" cursor-pointer flex items-center gap-2 px-4 py-3 border border-[#D2D5E1] text-[#454547] rounded-lg w-1/2 justify-between"
                    >
                      Male
                      <Field
                        type="radio"
                        name="gender"
                        value="male"
                        id="gender_male"
                        checked={values.gender === "male"}
                        onChange={() => setFieldValue("gender", "male")}
                        className="cursor-pointer w-5 h-5"
                      />
                    </label>
                    <label
                      htmlFor="gender_female"
                      className=" cursor-pointer flex items-center gap-2 px-4 py-3 border border-[#D2D5E1] text-[#454547] rounded-lg w-1/2 justify-between"
                    >
                      Female
                      <Field
                        type="radio"
                        name="gender"
                        value="female"
                        id="gender_female"
                        checked={values.gender === "female"}
                        onChange={() => setFieldValue("gender", "female")}
                        className="cursor-pointer w-5 h-5"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lname" className="text-sm text-[#454547]">
                    Marital Status *
                  </label>
                  <Field
                    type="select"
                    as="select"
                    name="maritalStatus"
                    value={values.maritalStatus}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Choose a marital status"
                  >
                    <option className="text-gray-400 " disabled value="">
                      Select marital status
                    </option>
                    <option value="single" className="text-black">
                      Single
                    </option>
                    <option value="married" className="text-black">
                      Married
                    </option>
                    <option value="devorced" className="text-black">
                      Devorced
                    </option>
                    <option value="widowed" className="text-black">
                      Widowed
                    </option>
                  </Field>
                  <ErrorMessage
                    name="maritalStatus"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="occupation"
                    className="text-sm text-[#454547]"
                  >
                    Occupation *
                  </label>
                  <Field
                    type="text"
                    name="occupation"
                    value={values.occupation}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter occupation"
                  />
                  <ErrorMessage
                    name="occupation"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="occupation"
                    className="text-sm text-[#454547]"
                  >
                    Years of Business Experience *
                  </label>
                  <Field
                    type="number"
                    name="businessExp"
                    value={values.businessExp}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter registered phone number"
                  />
                  <ErrorMessage name="businessExp" />
                </div>
              </div>
              <div className="py-6 flex gap-6">
                <ImageDropzone
                  fieldName="photo"
                  text="Upload or Take a photo"
                  setFieldValue={setFieldValue}
                  setFile={setCustomerPhoto}
                  file={customerPhoto}
                  className="flex-col justify-center items-center gap-2 sm:h-[158px] lg:max-w-[248px] text-center"
                />
                <ImageDropzone
                  fieldName="identity"
                  text="Upload Identity Card"
                  setFieldValue={setFieldValue}
                  setFile={setUserIdentity}
                  file={userIdentity}
                  className="flex-col justify-center items-center gap-2 sm:h-[158px] lg:max-w-[248px] text-center"
                />
              </div>
            </div>
            <footer className="flex gap-4 px-4 sm:px-8 py-4 mt-auto sm:flex-row flex-col-reverse">
              <PrimaryButtons
                text={"Cancel"}
                type="button"
                className="flex-row-reverse font-medium border-[#D0D5DD]  border text-black h-[48px] rounded-lg  justify-center items-center"
                onClick={() => router.push("/hmo/buy-hmo")}
              />
              <PrimaryButtons
                text={"Proceed - Address Details"}
                type="submit"
                disabled={
                  !isValid || isSubmitting  
                }
                className={clsx(
                  " h-[48px]  font-medium rounded-lg sm:w-96 justify-center items-center",
                  {
                    "bg-black text-white":
                      (isValid && !isSubmitting && dirty) ||
                      (storedCustomerDetailsCheck() && isValid && !dirty),
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

export default PersonalDetailsForm;
