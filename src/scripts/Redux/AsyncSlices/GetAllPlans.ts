import { getPlans } from "@redux/AsyncThunks/AsyncThunks";
import { createSlice } from "@reduxjs/toolkit";

const allPlansInit: {
  status: null | "fulfilled" | "pending" | "failed";
  value: any;
} = {
  status: null,
  value: null,
};

export const allPlansSlice = createSlice({
  name: "allPlans",
  initialState: allPlansInit,
  reducers: {
    setPlans: (state, action) => {
      state.status = "fulfilled";
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPlans.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value = action.payload;
    });
    builder.addCase(getPlans.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getPlans.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { setPlans } = allPlansSlice.actions;
