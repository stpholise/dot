import Image from "next/image";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import PrimaryButtons from "@/app/_components/ui/units/buttons/PrimaryButtons";
import clsx from "clsx";
import {
  setCurrentStep,
  setCustomerIdentification,
} from "@/app/store/slices/UserAccountSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import ImageDropzone from "@/app/_components/ImageDropzone";

export interface IdentificationProps {
  idType: "NIN" | "Voter_ID" | "Driver_License" | "";
  idNumber: string;
  issueDate: Date;
  expiryDate: Date;
  idFront: File | null;
  idBack: File | null;
}

const initialValues: IdentificationProps = {
  idType: "",
  idNumber: "",
  issueDate: new Date(),
  expiryDate: new Date(),
  idFront: null,
  idBack: null,
};

const validationSchema = Yup.object().shape({
  idType: Yup.string().oneOf(["NIN", "voter_ID", "Drivers_License"]).required(),
  idNumber: Yup.string().matches(/^\d{11}$/, "Id number is required"),
  issueDate: Yup.date()
    .max(new Date(), "Date cannot be in the future")
    .required(),
  expiryDate: Yup.date()
    .min(new Date(), "expiry date cannot be in the past")
    .required(),
  idFront: Yup.mixed(),
  idBack: Yup.mixed(),
});

const Identification = () => {
  const dispatch = useDispatch();
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

  const onSubmit = (
    value: IdentificationProps,
    action: FormikHelpers<IdentificationProps>
  ) => {
    dispatch(
      setCustomerIdentification({
        idType: value.idType,
        idNumber: value.idNumber,
        issueDate: value.issueDate,
        expiryDate: value.expiryDate,
        idFront: value.idFront,
        idBack: value.idBack,
      })
    );
     
      incrementStep()
    action.resetForm();
  };
  return (
    <div>
      <div className=" lg:hidden sm:flex gap-4 px-8 mt-4">
              <Image
                src={"/image/Frame 48.png"}
                alt="doc"
                height={80}
                width={80}
                className="rounded-xl max-h-20 max-w-20"
              />
              <div className=" ">
                <p className="text-sm text-[#667085] text-medium">Customer Identification</p>
                <h3 className="text-black text-3xl font-medium">
                 Provide your current valid means of identification
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
          <span className="text-black">Identification</span>
          <span className="text-gray-400">
            - The ID will be validated with the selfie
          </span>
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ dirty, isSubmitting, isValid, setFieldValue }) => (
          <Form>
            <div className="px-8 py-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="fname" className="text-sm text-[#454547]">
                  ID Type *
                </label>
                <Field
                  as="select"
                  name="idType"
                  className={clsx(
                    "w-full px-4 py-3 outline-none border border-gray-300 rounded-lg focus:ring-1 focus:ring-black"
                  )}
                  placeholder="select identity type"
                >
                  <option className="text-gray-400" disabled value="">
                    select identity type
                  </option>
                  <option className="text-black" value="NIN">
                    NIN
                  </option>
                  <option className="text-black" value="voter_ID">
                    Voter ID
                  </option>
                  <option className="text-black" value="Drivers_License">
                    Drivers License
                  </option>
                </Field>
                <ErrorMessage
                  name="fname"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="fname" className="text-sm text-[#454547]">
                  ID Number *
                </label>
                <Field
                  type="text"
                  name="idNumber"
                  className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                  placeholder="Enter your id number"
                />
                <ErrorMessage
                  name="idNumber"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="issueDate" className="text-sm text-[#454547]">
                  Issue Date *
                </label>
                <Field
                  type="date"
                  name="issueDate"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('issueDate', e.target.value.toString())}
                  className="w-full px-4 py-3 border outline-none border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="issueDate"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="expiryDate" className="text-sm text-[#454547]">
                  Expiry Date *
                </label>
                <Field
                  type="date"
                  name="expiryDate"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setFieldValue('expiryDate', e.target.value.toString())}
                  className="w-full px-4 py-3 border outline-none border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="expiryDate"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>
              <ImageDropzone
                setFieldValue={setFieldValue}
                fieldName="idFront"
                text={" Upload ID Image (Front)"}
              />
              <ImageDropzone
                setFieldValue={setFieldValue}
                fieldName="idBack"
                text={" Upload ID Image (back)"}
              />
            </div>
            <footer className="flex gap-8 px-8 py-4 mt-auto">
              <PrimaryButtons
                text={"Go Back"}
                className="flex-row-reverse font-medium border-[#D0D5DD] border text-black h-[52px] rounded-lg  justify-center items-center"
                icon="/icons/arrow_back.png"
                onClick={decrementStep}
              />
              <div className=" flex gap-4">
                <PrimaryButtons
                  text={"skip"}
                  className="flex-row-reverse font-medium border-[#D0D5DD] border text-black h-[48px] rounded-lg  justify-center items-center"
                  onClick={incrementStep}
                />

                <PrimaryButtons
                  text={"Proceed - Passport Capture"}
                  type="submit"
                  className={clsx(
                    " h-[48px] font-medium rounded-lg w-44 justify-center items-center",
                    {
                      "bg-black text-white": isValid && dirty && !isSubmitting,
                      "bg-[#9A9A9A] text-white":
                        !isValid || !dirty || isSubmitting,
                    }
                  )}
                  disabled={!isValid || !dirty || isSubmitting}
             
                />
              </div>
            </footer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Identification;
