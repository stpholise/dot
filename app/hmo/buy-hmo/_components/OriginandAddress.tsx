"use client";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons"; 
import { useFetchLGA } from "@/app/account/create-account/_components/useFetchState"; 
import * as Yup from "yup";
import clsx from "clsx"; 
import { useEffect } from "react";
import { scrollToTop } from "@/app/_utils/ScrollToTop";
import FormHeader from "@/app/_components/ui/units/FormHeader";

export interface CustomerAddress {
  state: string;
  city: string;
  address: string;
  lga: string;
  utilityBillImage?: File | null;
}

interface AddressProps {
  states: string[];
  isLoading: boolean;
  error?: string;
  selectedState: string;
  setSelectedState: (state: string) => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setOriginAddress: React.Dispatch<
    React.SetStateAction<CustomerAddress | undefined>
  >;
  originAddress: CustomerAddress | undefined;
}

const Address = ({
  states,
  isLoading,
  error,
  selectedState,
  setSelectedState,
  setCurrentStep,
  setOriginAddress,
  originAddress,
}: AddressProps) => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const { lga, loadingLga, errorFetchinLga } = useFetchLGA(selectedState) as {
    lga: string[] | undefined;
    loadingLga: boolean;
    errorFetchinLga: string | null;
  };

  
  const decrementStep = () => {
    setCurrentStep(0);
  };
  const incrementStep = () => {
    setCurrentStep(2);
    setCurrentStep(2);
  };

  const initialState: CustomerAddress = {
    state: selectedState || "",
    city: originAddress?.city || "",
    address: originAddress?.address || "",
    lga: originAddress?.lga || "",
  };

  const validationSchema = Yup.object().shape({
    state: Yup.string()
      .min(3, "at least 3 character needed")
      .trim()
      .required("Required"),
    lga: Yup.string()
      .min(3, "at least 3 character needed")
      .trim()
      .required("Required"),
    city: Yup.string()
      .min(3, "at least 3 characters required")
      .trim()
      .required("Required"),
    address: Yup.string().min(3).required("Requried"),
  });

  const onSubmit = (
    value: CustomerAddress,
    actions: FormikHelpers<CustomerAddress>
  ) => {
    setOriginAddress({
      state: value.state,
      city: value.city,
      address: value.address,
      lga: value.lga,
    });
    actions.resetForm();
    incrementStep();
  };

  return (
    <div>
      <div className=" lg:hidden flex gap-4 px-4 sm:px-8 mt-4">
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
      <FormHeader
        icon={{
          src: "/icons/security.png",
          alt: "user",
        }}
        primaryText="Origin & Address"
        secondaryText=" - Landmarks are usually helpful"
      />
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, isSubmitting, setFieldValue }) => (
          <Form>
            <div className="px-4 sm:px-8 py-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="city" className="text-sm text-[#454547]">
                  Place of Birth *
                </label>
                <Field
                  type="text"
                  name="city"
                  className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                  placeholder="Select a place of birth"
                />
                <ErrorMessage
                  name="city"
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
                    value={selectedState}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setSelectedState(e.target.value);
                      setFieldValue("state", e.target.value);
                      setFieldValue("lga", "");
                    }}
                    className="w-full cursor-pointer px-4 py-3 outline-none border text-black border-gray-300 rounded-lg"
                  >
                    {isLoading ? (
                      <option value="" className="text-gray-300" disabled>
                        Loading...
                      </option>
                    ) : error ? (
                      <option value="" className="text-gray-300" disabled>
                        Error fetching LGA
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
                      ) : !selectedState || selectedState == "" ? (
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
        )}
      </Formik>
    </div>
  );
};

export default Address;
