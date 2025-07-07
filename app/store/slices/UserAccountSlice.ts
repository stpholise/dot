import { createSlice } from "@reduxjs/toolkit";

interface CustomerDetails {
  withBvn: boolean;
  bvn?: string;
  fname: string;
  lname: string;
  phone: string;
  dob: string;
  gender: "male" | "female" | "other";
}

interface CustomerAccountDetail {
  AccountName: string;
  AccountNumber: string;
  AccountTier: string;
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
  issueDate: string;
  expiryDate: string;
  idFront: string | null;
  idBack: string | null;
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
  customerAccountDetail: CustomerAccountDetail;
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
    dob: "",
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
    issueDate: "",
    expiryDate: "",
    idFront: null,
    idBack: null,
  },
  customerAddress: {
    state: "",
    city: "",
    address: "",
    country: "",
    postalCode: "",
    utilityBillImage: null,
  },
  customerAccountDetail: {
    AccountName: "",
    AccountNumber: "",
    AccountTier: "",
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
      console.log("customer identification :", action.payload);
    },
    setCustomerAddress: (state, action) => {
      state.userAccountInitialState.customerAddress = {
        ...state.userAccountInitialState.customerAddress,
        ...action.payload,
      };
    },
    setCustomerAccountDetail: (state, action) => {
      state.userAccountInitialState.customerAccountDetail = {
        ...state.userAccountInitialState.customerAccountDetail,
        ...action.payload,
      };
    },
    setCurrentStep: (state, action) => {
      state.initialStepState.currentStep = action.payload;
    },
    resetUserDetails: (state) => {
      state.userAccountInitialState.customerDetails =
        initialState.customerDetails;
      state.userAccountInitialState.customerAddress =
        initialState.customerAddress;
      state.userAccountInitialState.customerIdentification =
        initialState.customerIdentification;
    },
  },
});

export const {
  setCustomerDetails,
  setCustomerImage,
  setCustomerIdentification,
  setCustomerAddress,
  setCurrentStep,
  setCustomerAccountDetail,
  resetUserDetails,
} = userAccountSlice.actions;

export default userAccountSlice.reducer;
