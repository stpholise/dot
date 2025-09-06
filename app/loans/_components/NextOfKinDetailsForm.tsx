"use client";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import FormHeader from "@/app/_components/ui/units/FormHeader";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import * as Yup from "yup";
import { useFetchLGA } from "@/app/account/create-account/_components/useFetchState";
import clsx from "clsx";
import { Step } from "@/app/hmo/buy-hmo/page";
import FormTitle from "@/app/_components/ui/units/FormTitle";

export interface NextOfKinDetailsType {
  fName: string;
  lName: string;
  phone: string;
  relationship: string;
  address: string;
  state: string;
  lga: string;
}

interface PersonalDetailsFormProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setNextOfKinData: React.Dispatch<React.SetStateAction<NextOfKinDetailsType>>;
  nextOfKinData: NextOfKinDetailsType;
  states: string[];
  steps: Step[];
}

const NextOfKinDetailsForm = ({
  setCurrentStep,
  nextOfKinData,
  setNextOfKinData,
  states,
  steps,
}: PersonalDetailsFormProps) => {
  const initialValues: NextOfKinDetailsType = {
    fName: nextOfKinData.fName || "",
    lName: nextOfKinData.lName || "",
    phone: nextOfKinData.phone || "",
    relationship: nextOfKinData.relationship || "",
    address: nextOfKinData.address || "",
    state: nextOfKinData.state || "",
    lga: nextOfKinData.lga || "",
  };

  const validationSchima = Yup.object({
    fName: Yup.string().required("First name is required"),
    lName: Yup.string().required("Last name is required"),
    phone: Yup.string().required("Phone number is required"),
    relationship: Yup.string().required("Relationship is required"),
    address: Yup.string().required("Address is required"),
    state: Yup.string().required("State is required"),
    lga: Yup.string().required("LGA is required"),
  });

  const { lga, loadingLga, errorFetchinLga } = useFetchLGA(
    nextOfKinData?.state ?? ""
  ) as {
    lga: string[] | undefined;
    loadingLga: boolean;
    errorFetchinLga: string | null;
  };

  const handleFormSubmission = (
    values: NextOfKinDetailsType,
    formik: FormikHelpers<NextOfKinDetailsType>
  ) => {
    setCurrentStep(4);

    setNextOfKinData({
      fName: values.fName,
      lName: values.lName,
      phone: values.phone,
      relationship: values.relationship,
      address: values.address,
      state: values.state,
      lga: values.lga,
    });
    console.log(values);
    formik.resetForm();
  };

  return (
    <div>
      <FormTitle title="Next of Kin Details" currentStep={3} steps={steps} />
      <FormHeader
        icon={{
          src: "/icons/security.png",
          alt: "user",
        }}
        primaryText="Next of Kin Details"
        secondaryText="- Verify next of kin identity"
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
                    placeholder="Enter registered phone number"
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
                    placeholder="Enter relationship"
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
                    type="string"
                    name="address"
                    value={values.address}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter registered phone number"
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
                        setFieldValue("state", e.target.value);
                        setNextOfKinData((prev) => ({
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
                        ) : !nextOfKinData?.state ||
                          nextOfKinData?.state == "" ? (
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
            </div>
            <footer className="flex gap-4 px-4 sm:px-8 py-4 mt-auto sm:flex-row flex-col-reverse">
              <PrimaryButtons
                text={"Cancel"}
                type="button"
                className="flex-row-reverse font-medium border-[#D0D5DD]  border text-black h-[48px] rounded-lg  justify-center items-center"
                onClick={() => setCurrentStep(2)}
              />
              <PrimaryButtons
                text={"Proceed  "}
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

export default NextOfKinDetailsForm;
