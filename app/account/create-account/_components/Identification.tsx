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

interface IdentityProps {
  setIdFront: (state: File) => void;
  setIdBack: (state: File) => void;
  idFront?: File | undefined;
  idBack?: File | undefined;
}

export interface IdentificationProps {
  idType: "NIN" | "Voter_ID" | "Driver_License" | "";
  idNumber: string;
  issueDate: Date;
  expiryDate: Date;
  idFront: File | null;
  idBack: File | null;
}

const validationSchema = Yup.object().shape({
  idType: Yup.string()
    .oneOf(["NIN", "voter_ID", "Drivers_License"])
    .required("Required"),
  idNumber: Yup.string()
    .matches(/^\d{11}$/, "Id must be 11 characters")
    .required("Required"),
  issueDate: Yup.date()
    .typeError("Invalid date format")
    .min(new Date("1900-01-01"), "Date cannot be before 1900")
    .nullable()
    .max(new Date(), "Date cannot be in the future")
    .required("Requireed"),
  expiryDate: Yup.date()
    .typeError("Invalid date format")
    .min(new Date(), "expiry date cannot be in the past")
    .required("Requried"),
  idFront: Yup.mixed().required("Required"),
  idBack: Yup.mixed().required("Required"),
});

const Identification = ({ setIdFront, setIdBack, idFront, idBack }: IdentityProps) => {
  const dispatch = useDispatch();

  const storedIdentification = useSelector(
    (state: RootState) =>
      state.userAccount.userAccountInitialState.customerIdentification
  );

  const currentStep = useSelector(
    (state: RootState) => state.userAccount.initialStepState.currentStep
  );

  const initialValues: IdentificationProps = {
    idType: storedIdentification.idType || "",
    idNumber: storedIdentification.idNumber || "",
    issueDate: new Date(storedIdentification.issueDate) || new Date(),
    expiryDate: new Date(storedIdentification.expiryDate) || new Date(),
    idFront: null,
    idBack: null,
  };

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
        idFront: value.idFront?.name,
        idBack: value.idBack?.name,
      })
    );

    incrementStep();
    action.resetForm();
  };
  return (
    <div>
      <div className=" lg:hidden flex gap-4 px-8 mt-4">
        <Image
          src={"/image/Frame 48.png"}
          alt="doc"
          height={80}
          width={80}
          className="rounded-xl max-h-20 max-w-20 sm:w-20 sm:h-20 h-14 w-14"
        />
        <div className=" ">
          <p className="text-xs sm:text-sm text-[#667085] text-medium">
            Customer Identification
          </p>
          <h3 className="text-black text-base sm:text-3xl font-medium">
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
        {({  isSubmitting, isValid, setFieldValue }) => (
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
                    "w-full cursor-pointer px-4 py-3 outline-none border border-gray-300 rounded-lg focus:ring-1 focus:ring-black"
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
                  maxlength={11}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue(
                      "idNumber",
                      e.target.value.replace(/\D/g, "")
                    );
                  }}
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
                  max={new Date().toISOString().split("T")[0]}
                  onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                    (e.target as HTMLInputElement).showPicker()
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFieldValue("issueDate", e.target.value.toString())
                  }
                  className="w-full cursor-pointer px-4 py-3 border outline-none border-gray-300 rounded-lg"
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
                  min={new Date().toISOString().split("T")[0]}
                  onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                    (e.target as HTMLInputElement).showPicker()
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFieldValue("expiryDate", e.target.value.toString())
                  }
                  className="w-full cursor-pointer px-4 py-3 border outline-none border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="expiryDate"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>
              <div className="">
                <ImageDropzone
                  setFieldValue={setFieldValue}
                  fieldName="idFront"
                  text={" Upload ID Image (Front)"}
                  setFile={setIdFront}
                  file={idFront}
                />
              </div>
              <div className="">
                <ImageDropzone
                  setFieldValue={setFieldValue}
                  fieldName="idBack"
                  text={" Upload ID Image (back)"}
                  setFile={setIdBack}
                  file={idBack}
                />
              </div>
            </div>
            <footer className="flex gap-8 px-8 py-4 mt-auto sm:flex-row flex-col-reverse">
              <PrimaryButtons
                text={"Go Back"}
                className="flex-row-reverse font-medium border-[#D0D5DD] border text-black h-[52px] rounded-lg  justify-center items-center"
                icon="/icons/arrow_back.png"
                onClick={decrementStep}
              />
              <div className=" flex gap-4">
                <PrimaryButtons
                  text={"skip"}
                  className="flex-row-reverse font-medium border-[#D0D5DD] border text-black h-[48px] rounded-lg sm:w-5/12  justify-center items-center"
                  onClick={incrementStep}
                />

                <PrimaryButtons
                  text={"Proceed "}
                  type="submit"
                  className={clsx(
                    " h-[48px] font-medium rounded-lg sm:w-60  justify-center items-center",
                    {
                      "bg-black text-white": isValid  && !isSubmitting,
                      "bg-[#9A9A9A] text-white":
                        !isValid ||  isSubmitting,
                    }
                  )}
                  disabled={!isValid  || isSubmitting}
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
