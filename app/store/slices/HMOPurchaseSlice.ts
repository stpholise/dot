import { createSlice } from "@reduxjs/toolkit";
import { PersonalDetailsType } from "@/app/hmo/buy-hmo/_components/PersonalDetailsForm";
import { CustomerAddress } from "@/app/hmo/buy-hmo/_components/OriginandAddress";
import { PlanValidityTypes } from "@/app/hmo/buy-hmo/_components/Plan&Validity";

type PersonalDetailsStringOnly = Omit<
  PersonalDetailsType,
  "photo" | "identity"
> & {
  photo?: string;
  identity?: string;
};

type PlanType = Omit<PlanValidityTypes, "dependants"> & {
  dependants?: PersonalDetailsStringOnly[];
};

const personalDetail: PersonalDetailsStringOnly = {
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

interface HmoState {
  id: string;
  personalDetail: PersonalDetailsStringOnly;
  originandAddress: CustomerAddress;
  plan: PlanType;
}

const initialState: { hmo: HmoState } = {
  hmo: {
    id: "",
    personalDetail,
    originandAddress,
    plan,
  },
};

const HmoSlice = createSlice({
  name: "HMOSlice",
  initialState ,
  reducers: {
    setHmo: (state, action) => {
      state.hmo = action.payload;
      console.log(action.payload);
    },
  },
});

export const { setHmo } = HmoSlice.actions;

export default HmoSlice.reducer;
