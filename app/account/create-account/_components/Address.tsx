"use client";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import {
  setCurrentStep,
  setCustomerAddress,
} from "@/app/store/slices/UserAccountSlice";
import { useFetchState } from "./useFetchState";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import clsx from "clsx";
import { RootState } from "@/app/store";
import ImageDropzone from "@/app/_components/ImageDropzone";

export interface CustomerAddress {
  state: string;
  city: string;
  address: string;
  utilityBillImage?: File | null;
}

const Address = () => {
  const dispatch = useDispatch();
  const { states, isLoading, error } = useFetchState() as {
    states: string[];
    isLoading: boolean;
    error: string;
  };
  console.log({ states: states, isLoading: isLoading, error: error });
  const currentStep = useSelector(
    (state: RootState) => state.userAccount.initialStepState.currentStep
  );
  const decrementStep = () => {
    const newStep = currentStep - 1;
    dispatch(setCurrentStep(newStep));
  };
  const incrementStep = () => {
    const newStep = currentStep + 1;
    dispatch(setCurrentStep(newStep));
  };

  const initialState: CustomerAddress = {
    state: "",
    city: "",
    address: "",
    utilityBillImage: null,
  };

  const validationSchema = Yup.object().shape({
    state: Yup.string()
      .min(3, "at least 3 character needed")
      .required("this value is required"),
    city: Yup.string()
      .min(3, "at least 3 characters required")
      .required("city is required"),
    address: Yup.string().min(3).required("your address is requried"),
    utilityBillImage: Yup.mixed().notRequired(),
  });

  const onSubmit = (
    value: CustomerAddress,
    actions: FormikHelpers<CustomerAddress>
  ) => {
    console.log({
      state: value.state,
      city: value.city,
      address: value.address,
      utilityBillImage: value.utilityBillImage,
    });
    dispatch(
      setCustomerAddress({
        state: value.state,
        city: value.city,
        address: value.address,
        utilityBillImage: value.utilityBillImage,
      })
    );
    actions.resetForm();
    incrementStep();
  };

  return (
    <div>
      <div className=" lg:hidden flex gap-4 px-8 mt-4">
        <Image
          src={"/image/Frame 48.png"}
          alt="doc"
          height={80}
          width={80}
          className="rounded-xl max-h-20 max-w-20 sm:w-20 sm:h-20 w-14 h-14"
        />
        <div className=" ">
          <p className=" text-xs sm:text-sm text-[#667085] text-medium">
            Customer Address
          </p>
          <h3 className="text-black text-base sm:text-3xl font-medium">
            How can we locate the customer?
          </h3>
        </div>
      </div>
      <div className=" hidden lg:flex gap-2 items-center font-medium w-full border-b-gray-300 border-b-2 py-4 px-6">
        <Image
          alt="user"
          src="/icons/security.png"
          height={14}
          width={14}
          className=""
        />
        <p className="">
          <span className="text-black">Customer Address</span>
          <span className="text-gray-400">- Landmarks are usually helpful</span>
        </p>
      </div>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty, isSubmitting, setFieldValue }) => (
          <Form>
            <div className="px-8 py-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="fname" className="text-sm text-[#454547]">
                  State *
                </label>
                {isLoading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error: {error}</p>
                ) : (
                  <Field
                    as="select"
                    name="state"
                    className="w-full px-4 py-3 outline-none border text-black border-gray-300 rounded-lg"
                  >
                    <option value="" className="text-gray-300" disabled>
                      select a state
                    </option>
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
                )}
                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="fname" className="text-sm text-[#454547]">
                  City *
                </label>
                <Field
                  type="text"
                  name="city"
                  className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                  placeholder="Enter your city"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="fname" className="text-sm text-[#454547]">
                  Street Address *
                </label>
                <Field
                  type="text"
                  name="address"
                  className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                  placeholder="Enter your id number"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>
              <div className="">
                <ImageDropzone
                  setFieldValue={setFieldValue}
                  fieldName="utilityBillImage"
                  text={"Upload Utility Bill (Optional)"}
                />
              </div>
              <div className="rounded-lg bg-[#F9F9F9] flex gap-4 px-4 py-4 justify-start items-start ">
                <Image
                  src="/icons/setting.svg"
                  alt="morde details"
                  width={16}
                  height={16}
                />
                <p className="text-xs">
                  Ensure the credentials provided by the customer matches their
                  means of identification, Dot Technologies does not support
                  third party account creation.
                </p>
              </div>
            </div>
            <footer className="flex gap-4 px-8 py-4 mt-auto sm:flex-row flex-col-reverse">
              <PrimaryButtons
                text={"Go Back"}
                className="flex-row-reverse font-medium border-[#D0D5DD] border text-black h-[48px] rounded-lg  justify-center items-center"
                icon="/icons/arrow_back.png"
                onClick={decrementStep}
              />
              <PrimaryButtons
                text={"Proceed - Passport Capture"}
                type={"submit"}
                className={clsx(
                  " h-[48px] font-medium rounded-lg sm:w-96 justify-center items-center",
                  {
                    "bg-black text-white": isValid && dirty && !isSubmitting,
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

export default Address;
