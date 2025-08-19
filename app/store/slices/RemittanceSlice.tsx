import { createSlice } from "@reduxjs/toolkit";
import { DummyRemittance } from "@/app/_data/RemittanceData";

const RemittanceSlice = createSlice({
  name: "remittance",
  initialState: {
    selectedRows: [],
    createdRemittance: null as DummyRemittance[] | null,
  },
  reducers: {
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
    createRemittance: (state, action) => {
        state.createdRemittance = [...(state.createdRemittance ?? []), action.payload];
      },
    
  },
});

export const { setSelectedRows, createRemittance     } = RemittanceSlice.actions;

export default RemittanceSlice.reducer;
    