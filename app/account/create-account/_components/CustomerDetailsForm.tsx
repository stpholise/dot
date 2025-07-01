"use client";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import * as Yup from "yup";
import Image from "next/image";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep } from "@/app/store/slices/UserAccountSlice";
import { RootState } from "@/app/store";
interface CustomerDetails {
  withBvn: boolean;
  bvn?: string;
  fname: string;
  lname: string;
  phone: string;
  dob: Date;
  gender: "male" | "female" | "other";
}

const CustomerDetailsForm = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector(
    (state: RootState) => state.userAccount.initialStepState.currentStep
  );
  const initialValues: CustomerDetails = {
    withBvn: false,
    bvn: "",
    fname: "",
    lname: "",
    phone: "",
    dob: new Date(),
    gender: "male",
  };

  const validationSchema = Yup.object().shape({
    withBvn: Yup.boolean().required("This Field is required"),
    bvn: Yup.string().when("withBvn", {
      is: (withBvn: boolean) => withBvn === true,
      then: (schema) => schema.required("BVN is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    fname: Yup.string().required("First Name is required"),
    lname: Yup.string().required("Last Name is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{11}$/, "Phone number must be 11 digits"),
    dob: Yup.date()
      .required("Date of Birth is required")
      .max(new Date(), "Date of Birth cannot be in the future"),
    gender: Yup.string()
      .oneOf(["male", "female", "other"], "Gender is required")
      .required("Gender is required"),
  });

  const submitForm = (
    values: CustomerDetails,
    actions: FormikHelpers<CustomerDetails>
  ) => {
    console.log("Form submitted with values:", values);
    actions.setSubmitting(false);
    dispatch(setCurrentStep(1));
  };

  const incrementStep = () => {
    const newStep = currentStep + 1;
    dispatch(setCurrentStep(newStep));
  };
  return (
    <div>
      <div className=" flex gap-2 items-center font-medium w-full border-b-gray-300 border-b-2 py-4 px-6">
        <Image
          alt="user"
          src="/icons/security.png"
          height={14}
          width={14}
          className=""
        />
        <p className="">
          <span className="text-black">Customer Details</span>
          <span className="text-gray-400"> - Customer BVN is optional</span>
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {({ setFieldValue, isValid, dirty, isSubmitting, values }) => (
          <Form>
            <div className="  font-medium px-9 py-4">
              <div className=" flex flex-col gap-2 border-b border-gray-100 py-6">
                <p className="text-sm">Does the customer have a BVN? *</p>
                <div className="flex gap-4">
                  <label className="w-1/2 flex justify-between items-center gap-2 px-4 py-3 border border-[#D2D5E1] text-black text-base rounded-lg">
                    Yes, the BVN is present
                    <Field
                      type="radio"
                      name="withBvn"
                      value={true}
                      onChange={() => setFieldValue("withBvn", true)}
                      className="cursor-pointer w-5 h-5"
                    />
                  </label>
                  <label className="flex w-1/2 justify-between items-center gap-2 px-4 py-3 border border-[#D2D5E1] text-black text-base rounded-lg">
                    No, Bvn is not available
                    <Field
                      type="radio"
                      name="withBvn"
                      value={false}
                      onChange={() => setFieldValue("withBvn", false)}
                      className="cursor-pointer w-5 h-5"
                    />
                  </label>
                </div>
                <p className="text-sm">
                  Dial *252# from your BVN registered phone to view you BVN
                </p>
                <ErrorMessage
                  name="withBvn"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>
              <div className=" flex flex-col gap-4 py-6">
                {values.withBvn && (
                  <div className=" flex flex-col gap-2">
                    <label htmlFor="" className="text-[#454547] text-sm">
                      Customer BVN <sup>*</sup>
                    </label>
                    <Field
                      type="text"
                      name="bvn"
                      className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                      placeholder="Enter a valid Bank Verification Number (BVN)"
                    />
                    <ErrorMessage
                      name="bvn"
                      component="div"
                      className="text-xs text-red-500"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label htmlFor="fname" className="text-sm text-[#454547]">
                    First Name *
                  </label>
                  <Field
                    type="text"
                    name="fname"
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter First Name"
                  />
                  <ErrorMessage
                    name="fname"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lname" className="text-sm text-[#454547]">
                    Surname *
                  </label>
                  <Field
                    type="text"
                    name="lname"
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter Last Name"
                  />
                  <ErrorMessage
                    name="lname"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm text-[#454547]">
                    Phone Number *
                  </label>
                  <Field
                    type="text"
                    name="phone"
                    className="w-full px-4 py-3 outline-none border border-gray-300  rounded-lg"
                    placeholder="Enter Phone Number"
                  />
                  <ErrorMessage
                    name="phone"
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
                    className="w-full px-4 py-3 border outline-none border-gray-300 rounded-lg"
                  />
                  <ErrorMessage
                    name="dob"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-[#454547]"> Customer Gender *</p>
                  <div className="display flex gap-4 mt-2 w-full justify-stretch">
                    <label
                      htmlFor="gender_male"
                      className="flex items-center gap-2 px-4 py-3 border border-[#D2D5E1] text-[#454547] rounded-lg w-1/2 justify-between"
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
                      className="flex items-center gap-2 px-4 py-3 border border-[#D2D5E1] text-[#454547] rounded-lg w-1/2 justify-between"
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
                <div className="flex gap-2 items-start mt-4">
                  <Image
                    alt="lock icon"
                    src="/icons/security.png"
                    height={16}
                    width={16}
                    className="mb-2"
                  />
                  <p className="text-xs text-[#667085]">
                    Ensure the credentials provided by the customer matches
                    their means of identification,{" "}
                    <strong className="text-[#454547]">
                      Dot Technologies{" "}
                    </strong>
                    does not support third party account creation.
                  </p>
                </div>
              </div>
            </div>
            <footer className="flex gap-4 px-8 py-4 mt-auto">
              <PrimaryButtons
                text={"Go Back"}
                className="flex-row-reverse font-medium border-[#D0D5DD] border text-black h-[52px] rounded-lg  justify-center items-center"
                icon="/icons/arrow_back.png"
              />
              <PrimaryButtons
                text={"Proceed - Passport Capture"}
                className={clsx(
                  " h-[52px] font-medium rounded-lg w-96 justify-center items-center",
                  {
                    "bg-black text-white": isValid && dirty && !isSubmitting,
                    "bg-[#9A9A9A] text-white":
                      !isValid || !dirty || isSubmitting,
                  }
                )}
                onClick={incrementStep}
              />
            </footer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CustomerDetailsForm;
