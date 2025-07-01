import { createSlice } from "@reduxjs/toolkit";

interface CustomerDetails {
  withBvn: boolean;
  bvn?: string;
  fname: string;
  lname: string;
  phone: string;
  dob: Date;
  gender: "male" | "female" | "other";
}

interface CusstomerImage {
  url: string;
  selfie?: string;
  idCard?: string;
  signature?: string;
}

interface CustomerIdentification {
  idType: "NIN" | "Voter ID" | "Driver's License";
  idNumber: string;
  issuedBy?: string;
  issueDate: Date;
  expiryDate: Date;
  idImagefront: File | null;
  idImageback: File | null;
}

interface CustomerAddress {
  state: string;
  city: string;
  address: string;
  country?: string;
  postalCode?: string;
  utilityBillImage?: File | null;
}

interface UserAccountState {
  customerDetails: CustomerDetails;
  customerImage: CusstomerImage;
  customerIdentification: CustomerIdentification;
  customerAddress: CustomerAddress;
}
interface currentStepState {
  currentStep: number;
}

const initialState: UserAccountState = {
  customerDetails: {
    withBvn: false,
    fname: "",
    lname: "",
    phone: "",
    dob: new Date(),
    gender: "male",
  },
  customerImage: {
    url: "",
    selfie: "",
    idCard: "",
    signature: "",
  },
  customerIdentification: {
    idType: "NIN",
    idNumber: "",
    issueDate: new Date(),
    expiryDate: new Date(),
    idImagefront: null,
    idImageback: null,
  },
  customerAddress: {
    state: "",
    city: "",
    address: "",
    country: "",
    postalCode: "",
    utilityBillImage: null,
  },
};
const initialStepState: currentStepState = {
  currentStep: 0,
};

export const userAccountSlice = createSlice({
  name: "userAccount",
  initialState: {
    userAccountInitialState: initialState,
    initialStepState: initialStepState,
  },
  reducers: {
    setCustomerDetails: (state, action) => {
      state.userAccountInitialState.customerDetails = {
        ...state.userAccountInitialState.customerDetails,
        ...action.payload,
      };
    },
    setCustomerImage: (state, action) => {
      state.userAccountInitialState.customerImage = {
        ...state.userAccountInitialState.customerImage,
        ...action.payload,
      };
    },
    setCustomerIdentification: (state, action) => {
      state.userAccountInitialState.customerIdentification = {
        ...state.userAccountInitialState.customerIdentification,
        ...action.payload,
      };
      console.log(action.payload);
    },
    setCustomerAddress: (state, action) => {
      state.userAccountInitialState.customerAddress = {
        ...state.userAccountInitialState.customerAddress,
        ...action.payload,
      };
    },
    setCurrentStep: (state, action) => {
      state.initialStepState.currentStep = action.payload;
    },
  },
});

export const {
  setCustomerDetails,
  setCustomerImage,
  setCustomerIdentification,
  setCustomerAddress,
  setCurrentStep,
} = userAccountSlice.actions;

export default userAccountSlice.reducer;
