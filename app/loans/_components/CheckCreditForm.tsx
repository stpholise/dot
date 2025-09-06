import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import FormHeader from "@/app/_components/ui/units/FormHeader";
import * as Yup from "yup";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import clsx from "clsx";
import { Step } from "@/app/hmo/buy-hmo/page";
import FormTitle from "@/app/_components/ui/units/FormTitle";

export interface CreditFormProp {
  householdIncome: string;
  specialFoodOccurance: string;
  householdFeeding: string;
  householdCondition: string;
}

interface CheckCreditFormProp {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  creditDetail: CreditFormProp;
  setCreditDetail: React.Dispatch<React.SetStateAction<CreditFormProp>>;
  steps: Step[];
}

const CheckCreditForm = ({
  setCurrentStep,
  creditDetail,
  setCreditDetail,
  steps,
}: CheckCreditFormProp) => {
  const initialValues: CreditFormProp = {
    householdIncome: creditDetail.householdIncome || "",
    specialFoodOccurance: creditDetail.specialFoodOccurance || "",
    householdFeeding: creditDetail.householdFeeding || "",
    householdCondition: creditDetail.householdCondition || "",
  };
  const validationSchema = Yup.object({
    householdIncome: Yup.string()
      .required('Please select the option that best applies.')
      .oneOf([
        "₦0-₦50,000",
        "₦50,000 - ₦99,999",
        "₦100,000 - ₦499,999",
        "₦500,000 - ₦999,999",
        "₦1,000,000 - ₦1,999,999",
        "₦2,000,000 and above",
      ]),
    specialFoodOccurance: Yup.string()
      .required('Please select the option that best applies.')
      .oneOf(["Very often", "Often", "Sometimes", "Rarely", "Never"]),
    householdFeeding: Yup.string()
      .required('Please select the option that best applies.')
      .oneOf([
        "Always Regular",
        "Mostly Regular",
        "Sometimes Irregular",
        "Frequently Irregular",
        "Rarely Regular",
      ]),
    householdCondition: Yup.string()
      .required('Please select the option that best applies.')
      .oneOf(["Excellent", "Good", "Fair", "Poor", "Needs urgent repair"]),
  });

  const handleSubmit = (
    values: CreditFormProp,
    formik: FormikHelpers<CreditFormProp>
  ) => {
    setCurrentStep(5);

    setCreditDetail({
      householdIncome: values.householdIncome,
      specialFoodOccurance: values.specialFoodOccurance,
      householdFeeding: values.householdFeeding,
      householdCondition: values.householdCondition,
    });

    formik.resetForm();
  };

  return (
    <div>
      <FormTitle title="Credit Check" currentStep={4} steps={steps} />

      <FormHeader
        icon={{
          src: "/icons/security.png",
          alt: "user",
        }}
        primaryText="Credit Check"
        secondaryText="- Every field is important"
      />

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, isValid, dirty, values }) => (
          <Form>
            <div className="lg:px-8 px-4 md:px-6 py-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="householdIncome"
                  className="text-sm text-[#454547]"
                >
                  Total household income per month? *
                </label>
                <Field
                  type="text"
                  as="select"
                  name="householdIncome"
                  value={values.householdIncome}
                  className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                >
                  <option value="" disabled>--Select--</option>
                  <option value={"₦0-₦50,000"}>Less than ₦50,000</option>
                  <option value="₦50,000 - ₦99,999">₦50,000 - ₦99,999</option>
                  <option value="₦100,000 - ₦499,999">
                    ₦100,000 - ₦499,999
                  </option>
                  <option value="₦500,000 - ₦999,999">
                    ₦500,000 - ₦999,999
                  </option>
                  <option value="₦1,000,000 - ₦1,999,999">
                    ₦1,000,000 - ₦1,999,999
                  </option>
                  <option value="₦2,000,000 and above">
                    ₦2,000,000 and above
                  </option>
                </Field>
                <ErrorMessage
                  name="householdIncome"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="specialFoodOccurance"
                  className="text-sm text-[#454547]"
                >
                  Times you cook special food in your household? *
                </label>
                <Field
                  type="text"
                  as="select"
                  name="specialFoodOccurance"
                  value={values.specialFoodOccurance}
                  className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                >
                  <option value=""  disabled>--Select--</option>
                  <option value={"Very often"}>Daily</option>
                  <option value="Often">A few times a week</option>
                  <option value="Sometimes">Once a week</option>
                  <option value="Rarely">A few times a month</option>
                  <option value="Never">On special occasions only</option>
                </Field>
                <ErrorMessage
                  name="specialFoodOccurance"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="householdFeeding"
                  className="text-sm text-[#454547]"
                >
                  How regular is the daily feeding in your household? *
                </label>
                <Field
                  type="text"
                  as="select"
                  name="householdFeeding"
                  value={values.householdFeeding}
                  className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                >
                  <option disabled value="">--Select--</option>
                  <option value={"Always Regular"}>
                    Very Regular – Meals are always on time
                  </option>
                  <option value="Mostly Regular">
                    Regular – Meals are mostly on time, with minor variations
                  </option>
                  <option value="Sometimes Irregular">
                    Occasional – Sometimes meals are skipped or irregular
                  </option>
                  <option value="Frequently Irregular">
                    Irregular – Meals are often missed or inconsistent
                  </option>
                  <option value="Rarely Regular">
                    Rare – Meals are hardly provided on a daily basis
                  </option>
                </Field>
                <ErrorMessage
                  name="householdFeeding"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="householdCondition"
                  className="text-sm text-[#454547]"
                >
                  The interior/exterior condition of your house’s ceiling/walls?
                  *
                </label>
                <Field
                  type="text"
                  as="select"
                  name="householdCondition"
                  value={values.householdCondition}
                  className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
       
                >
                  <option disabled value="">--Select--</option>
                  <option value={"Excellent"}>
                    Excellent - No visible issues
                  </option>
                  <option value="Good">Good - Minor wear and tear</option>
                  <option value="Fair">
                    Fair - Noticeable cracks, stains, or peeling
                  </option>
                  <option value="Poor">
                    Poor – Significant damage or deterioration
                  </option>
                  <option value="Needs urgent repair">
                    Needs urgent repair – Structural or water damage present
                  </option>
                </Field>
                <ErrorMessage
                  name="householdCondition"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>
            </div>
            <footer className="flex gap-4 px-4 sm:px-8 py-4 mt-8 sm:flex-row flex-col-reverse">
              <PrimaryButtons
                text={"Go Back"}
                icon="/icons/arrow_back.png"
                type="button"
                className="flex-row-reverse font-medium border-[#D0D5DD]  border text-black h-[48px] rounded-lg  justify-center items-center"
                onClick={() => setCurrentStep(3)}
              />
              <PrimaryButtons
                text={"Proceed  "}
                type="submit"
                disabled={!isValid || !dirty || isSubmitting}
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

export default CheckCreditForm;
