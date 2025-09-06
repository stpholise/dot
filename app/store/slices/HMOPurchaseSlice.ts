import { createSlice } from "@reduxjs/toolkit";
import { PersonalDetailsType } from "@/app/hmo/buy-hmo/_components/PersonalDetailsForm";
import { CustomerAddress } from "@/app/hmo/buy-hmo/_components/OriginandAddress";
import { PlanValidityTypes } from "@/app/hmo/buy-hmo/_components/Plan&Validity";
import { GuarantorDataDetailsType } from "@/app/loans/_components/GuarantorForm";
import { LoanData } from "@/app/loans/_components/ApplicationInformation";

type PersonalDetailsStringOnly = Omit<
  PersonalDetailsType,
  "photo" | "identity"
> & {
  id: string;
  photo?: string;
  identity?: string;
};

type PlanType = Omit<PlanValidityTypes, "dependants"> & {
  dependants?: PersonalDetailsStringOnly[];
};

type GuarantorDataDetailsStringOnly = Omit<
  GuarantorDataDetailsType,
  "guarantorPhoto" | "identity" | "employmentLetter" | "signature"
> & {
  guarantorPhoto: string;
  identity: string;
  employmentLetter: string;
  signature: string;
};

const personalDetail: PersonalDetailsStringOnly = {
  id: "",
  fName: "",
  mName: "",
  lName: "",
  dob: "",
  phone: "",
  maritalStatus: "",
  occupation: "",
  gender: "",
  photo: "",
  identity: "",
};

const originandAddress: CustomerAddress = {
  state: "",
  city: "",
  address: "",
  lga: "",
};

const plan: PlanType = {
  id: "",
  planType: "",
  validityPeriod: "",
  providerState: "",
  provider: "",
  dependants: [],
};

const guarantor: GuarantorDataDetailsStringOnly = {
  fName: "",
  lName: "",
  phone: "",
  relationship: "",
  address: "",
  state: "",
  lga: "",
  guarantorPhoto: "",
  identity: "",
  signature: "",
  employmentLetter: "",
};

const loanValues: LoanData = {
  amountRequested: "0",
  loanType: "",
  loanStage: "",
  loanDuration: "",
  loanPurpose: "",
  loanHistory: false,
};

interface HmoState {
  id: string;
  personalDetail: PersonalDetailsStringOnly;
  originandAddress: CustomerAddress;
  plan: PlanType;
}

interface LoanState {
  id: string;
  personalDetail: PersonalDetailsStringOnly; 
  guarantor: GuarantorDataDetailsStringOnly;
  loanValues: LoanData;
}

const initialState: { hmo: HmoState; loan: LoanState } = {
  hmo: {
    id: "",
    personalDetail,
    originandAddress,
    plan,
  },
  loan: {
    id: "",
    personalDetail, 
    guarantor,
    loanValues,
  },
};

const HmoSlice = createSlice({
  name: "HMOSlice",
  initialState,
  reducers: {
    setHmo: (state, action) => {
      state.hmo = action.payload;
    },
    setLoan: (state, action) => {
      state.loan = action.payload
      console.log(action.payload)
    }
  },
});

export const { setHmo, setLoan} = HmoSlice.actions;

export default HmoSlice.reducer;
