import { createSlice } from "@reduxjs/toolkit";
import { DummyRemittance } from "@/app/_data/RemittanceData";
import { DummyLoanData } from "@/app/_data/RemittanceData";
 



const RemittanceSlice = createSlice({
  name: "remittance",
  initialState: {
    selectedRows: [],
    createdRemittance: null as DummyRemittance[] | null,
    selectedCustomer: [] as DummyLoanData[],
  },
  reducers: {
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
    createRemittance: (state, action) => {
      state.createdRemittance = [
        ...(state.createdRemittance ?? []),
        action.payload,
      ];
    },
    addSelectedCustomer: (state, action) => {
      state.selectedCustomer = [
        ...(state.selectedCustomer ?? []),
        ...action.payload,
      ];
    },
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    }
  },
});

export const { setSelectedRows, createRemittance, addSelectedCustomer, setSelectedCustomer } =
  RemittanceSlice.actions;

export default RemittanceSlice.reducer;
