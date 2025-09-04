import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import FormHeader from "@/app/_components/ui/units/FormHeader";
import * as Yup from "yup";
import Image from "next/image";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export interface LoanData {
  amountRequested: string;
  loanType: string;
  loanStage: string;
  loanDuration: string;
  loanPurpose: string;
  loanHistory: true | false;
}

interface ApplicationInformationProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setAppInformation: React.Dispatch<React.SetStateAction<LoanData>>;
  appInformation: LoanData;
}

const ApplicationInformation = ({
  setCurrentStep,
  setAppInformation,
  appInformation,
}: ApplicationInformationProps) => {
  const router = useRouter();
  const initialValues: LoanData = {
    amountRequested: appInformation.amountRequested || "0",
    loanType: appInformation.loanType || "",
    loanStage: appInformation.loanStage || "",
    loanDuration: appInformation.loanDuration || "",
    loanPurpose: appInformation.loanPurpose || "",
    loanHistory: appInformation.loanHistory || false,
  };

  const validationSchema = Yup.object({
    amountRequested: Yup.string().required(),
    loanType: Yup.string()
      .required()
      .oneOf(
        [
          "personal",
          "business",
          "mortgage",
          "auto",
          "education",
          "agricultural",
          "salary",
          "medical",
          "other",
        ],
        "slect an option"
      ),
    loanStage: Yup.string()
      .required()
      .oneOf([
        "submitted",
        "review",
        "pending-docs",
        "approved",
        "disbursed",
        "repayment",
        "closed",
        "rejected",
      ]),
    loanDuration: Yup.string().required(),
    loanHistory: Yup.boolean(),
  });

  const onSubmit = (values: LoanData, formik: FormikHelpers<LoanData>) => {
    setAppInformation({
      amountRequested: values.amountRequested,
      loanType: values.loanType,
      loanStage: values.loanStage,
      loanDuration: values.loanDuration,
      loanPurpose: values.loanPurpose,
      loanHistory: values.loanHistory,
    });
    setCurrentStep(6);
    formik.resetForm();
  };

  return (
    <div>
      <FormHeader
        icon={{
          src: "/icons/security.png",
          alt: "user",
        }}
        primaryText="Application Information"
        secondaryText="- Management fee of 1% is applied"
      />
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchem={validationSchema}
      >
        {({ values, isValid, dirty, isSubmitting, setFieldValue }) => (
          <Form>
            <div className="lg:px-8">
              <div className="py-6 flex flex-col gap-4 mb-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="dotA  cct" className="text-sm text-[#454547]">
                    Amount Requested *
                  </label>
                  <Field
                    autoFocus
                    type="text"
                    name="amountRequested"
                    value={values.amountRequested}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const numericValue =
                        parseInt(e.target.value.replace(/\D/g, "")) | 0;
                      setFieldValue(
                        "amountRequested",
                        numericValue.toLocaleString("en-NG", {
                          minimumFractionDigits: 0,
                        })
                      );
                    }}
                    inputMode="numric"
                    maxLength={7}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter customer first name"
                  />
                  <ErrorMessage
                    name="amountRequested"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="dotA  cct" className="text-sm text-[#454547]">
                    Loan Type *
                  </label>
                  <Field
                    type="text"
                    name="loanType"
                    as="select"
                    value={values.loanType}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter customer first name"
                  >
                    <option value="">Select loan type</option>
                    <option value="personal">Personal Loan</option>
                    <option value="business">Business Loan</option>
                    <option value="mortgage">Mortgage / Home Loan</option>
                    <option value="auto">Auto Loan</option>
                    <option value="education">Education Loan</option>
                    <option value="agriculture">Agricultural Loan</option>
                    <option value="salary">Salary Advance / Payday Loan</option>
                    <option value="medical">Medical Loan</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="loanType"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="dotA  cct" className="text-sm text-[#454547]">
                    Loan Stage *
                  </label>
                  <Field
                    type="text"
                    as="select"
                    name="loanStage"
                    value={values.loanStage}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter customer first name"
                  >
                    <option value="">Select loan stage</option>
                    <option value="submitted">Application Submitted</option>
                    <option value="review">Under Review</option>
                    <option value="pending-docs">Pending Documentation</option>
                    <option value="approved">Approved</option>
                    <option value="disbursed">Disbursed</option>
                    <option value="repayment">In Repayment</option>
                    <option value="closed">Completed / Closed</option>
                    <option value="rejected">Rejected</option>
                  </Field>
                  <ErrorMessage
                    name="loanStage"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="dotA  cct" className="text-sm text-[#454547]">
                    Loan Duration *
                  </label>
                  <Field
                    type="number"
                    name="loanDuration"
                    value={values.loanDuration  } 
                    inputMode="numeric"
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter customer first name"
                  />
                  <ErrorMessage
                    name="loanDuration"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="dotcct" className="text-sm text-[#454547]">
                    Purpose of Loan? *
                  </label>
                  <Field
                    type="text"
                    name="loanPurpose"
                    value={values.loanPurpose}
                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                    placeholder="Enter customer first name"
                  />
                  <ErrorMessage
                    name="loanPurpose"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="occupation"
                    className="text-sm text-[#454547]"
                  >
                    Have you taken a loan before? *
                  </label>
                  <div className="display flex gap-4 mt-2 w-full justify-stretch">
                    <label
                      htmlFor="loanHistory_true"
                      className=" cursor-pointer flex items-center gap-2 px-4 py-3 border border-[#D2D5E1] text-[#454547] rounded-lg w-1/2 justify-between"
                    >
                      Yes, I have
                      <Field
                        type="radio"
                        name="loanHistory"
                        checked={values.loanHistory}
                        id="loanHistory_true"
                        onChange={() => setFieldValue("loanHistory", true)}
                        className="cursor-pointer w-5 h-5"
                      />
                    </label>
                    <label
                      htmlFor="loanHistory_false"
                      className=" cursor-pointer flex items-center gap-2 px-4 py-3 border border-[#D2D5E1] text-[#454547] rounded-lg w-1/2 justify-between"
                    >
                      No, I have not
                      <Field
                        type="radio"
                        name="loanHistory"
                        checked={!values.loanHistory}
                        id="loanHistory_false"
                        onChange={() => setFieldValue("loanHistory", false)}
                        className="cursor-pointer w-5 h-5"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex bg-[#F9F9F9] px-4 py-4 rounded-lg gap-2 items-start mt-6 ">
                <Image
                  alt="lock icon"
                  src="/icons/security.png"
                  height={16}
                  width={16}
                  className="mb-2"
                />
                <p className="text-xs text-[#667085]">
                  Management fee is 1%. When customers are faced with
                  difficulties in repaying their loans due to severe ill health,
                  natural disasters, they can meet their branch manager to
                  discuss possible adjustment in loan schedule as contained in
                  the institutional loan rescheduling policy.
                </p>
              </div>
            </div>
            <footer className="flex gap-4 px-4 sm:px-8 py-4 justify-between sm:flex-row flex-col-reverse">
              <PrimaryButtons
                text={"Cancel"}
                type="button"
                className="flex-row-reverse font-medium border-[#D0D5DD]  border text-black h-[48px] rounded-lg  justify-center items-center"
                onClick={() => router.push("/hmo/buy-hmo")}
              />
              <PrimaryButtons
                text={"Proceed - Address Details"}
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

export default ApplicationInformation;
