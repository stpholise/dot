"use client";
import { useEffect } from "react";
import clsx from "clsx";
import FormHeader from "@/app/_components/ui/units/FormHeader";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import ImageDropzone from "@/app/_components/ImageDropzone";
import * as Yup from "yup";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";

export interface PersonalDetailsType {
  fName: string;
  mName: string;
  lName: string;
  dob: string;
  phone?: string; 
  relationship?: string;
  gender: string;
  photo?: File | undefined;
}

const DependantPopupModal = ({
  customerPhoto,
  setCustomerPhoto,
  setIsDependantModalOpen,
}: {
  customerPhoto: File | undefined;
  setCustomerPhoto: React.Dispatch<React.SetStateAction<File | undefined>>;
  setIsDependantModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  console.log(customerPhoto, setCustomerPhoto);

  useEffect(() => {
    window.document.body.style.overflowY = "hidden";
    return () => {
      window.document.body.style.overflowY = "auto";
    };
  }, []);
 

  const initialValues: PersonalDetailsType = {
    fName: "",
    mName: "",
    lName: "",
    dob: "",
    relationship: "",
    gender: "",
    photo: undefined,
  };

  const validationSchima = Yup.object({
    fName: Yup.string().required(),
    mName: Yup.string(),
    lName: Yup.string().required(),
    dob: Yup.string().required(),
    relationship: Yup.string().oneOf(
      ["single", "married", "devorced", "widowed"],
      "Invalid marital status"
    ),
    gender: Yup.string().oneOf(
      ["male", "feamle"],
      "they are only two genders "
    ),
  });

  const addDependant = (
    values: PersonalDetailsType,
    formik: FormikHelpers<PersonalDetailsType>
  ) => {
    console.log(values);
    console.log(formik);
  };

  return (
    <div className="">
      <div
        className={clsx(
          "w-full bg-white lg:w-[468px] md:w-[440px] z-80 fixed bottom-0 top-0 right-0 left-0 lg:left-auto bg-red lg:max-h-[600px] h-screen md:h-fit  md:top-1/2 md:right-1/2   transition-opacity md:translate-x-1/2 md:rounded-3xl  md:-translate-y-1/2 opacity-100 ease-in-out duration-500 overflow-hidden  transform   ",
        )}
      >
        <FormHeader
          icon={{
            src: "/icons/security.png",
            alt: "user",
          }}
          primaryText="Add a Dependant"
        />
        <button
          className="absolute top-6 right-6"
          onClick={() => setIsDependantModalOpen(false)}
        >
          <Image
            src={"/icons/close.svg"}
            alt={"close"}
            width={16}
            height={16}
            className="min-w-4 min-h-4"
          />
        </button>
        <Formik
          initialValues={initialValues}
          onSubmit={addDependant}
          validationSchema={validationSchima}
        >
          {({ values, isValid, dirty, isSubmitting, setFieldValue }) => (
            <Form className="">
              <div className="py-6 px-8 overflow-y-auto h-[400px] gap-4 flex flex-col">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fName" className="text-sm text-[#454547]">
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
                    Relationship *
                  </label>
                  <Field
                    type="select"
                    as="select"
                    name="maritalStatus"
                    value={values.relationship}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Choose a marital status"
                  >
                    <option className="text-gray-400 " disabled value="">
                      Select relationship
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
                        onChange={() => setFieldValue("gender", "female")}
                        className="cursor-pointer w-5 h-5"
                      />
                    </label>
                  </div>
                </div>
                <div className="py-6 flex gap-6">
                  <ImageDropzone
                    fieldName="photo"
                    text="customer photo"
                    setFieldValue={setFieldValue}
                    setFile={setCustomerPhoto}
                    file={customerPhoto}
                  />
                </div>
              </div>
              <footer className=" bg-[#eaeaea] flex gap-4 px-4 sm:px-8 py-4 mt-auto sm:flex-row flex-col-reverse">
                <PrimaryButtons
                  text={"Cancel"}
                  type="button"
                  className="flex-row-reverse font-medium border-[#D0D5DD]  border text-black h-[48px] rounded-lg  justify-center items-center"
                  // onClick={() => router.push("/hmo/buy-hmo")}
                />
                <PrimaryButtons
                  text={"Add Dependant"}
                  type="submit"
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
      <div
        onClick={() => setIsDependantModalOpen(false)}
        className="fixed top-0 left-0 right-0 bottom-0 w-full z-60 bg-[rgba(0,0,0,0.5)]"
      ></div>
    </div>
  );
};

export default DependantPopupModal;
