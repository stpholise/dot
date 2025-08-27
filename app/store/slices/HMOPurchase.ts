import { createSlice } from "@reduxjs/toolkit";
import { PersonalDetailsType } from "@/app/hmo/buy-hmo/_components/PersonalDetailsForm";
import { CustomerAddress } from "@/app/hmo/buy-hmo/_components/OriginandAddress";

 const personalDetail: PersonalDetailsType = {
    fName: "",
    mName: "",
    lName: "",
    dob: "",
    phone: "",
    maritalStatus: "",
    occupation: "",
    gender: "",
    photo: undefined,
    identity: undefined,
  };

   const originandAddress: CustomerAddress = {
      state:  "",
      city:  "",
      address: "",
      lga:   "",
    };
  
  


const HmoSlice = createSlice({
    name:'HMOSlice',
    initialState: {personalDetail, originandAddress},
    reducers: {}

})


export default HmoSlice.reducer;