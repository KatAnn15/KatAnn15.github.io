import { getSimilar } from "@redux/AsyncThunks/AsyncThunks";
import { createSlice } from "@reduxjs/toolkit";

export interface SimilarTypes {
  status: null | "fulfilled" | "pending" | "failed";
  value: any[];
}
const similarInit: SimilarTypes = {
  status: null,
  value: [],
};
export const similarSlice = createSlice({
  name: "similar",
  initialState: similarInit,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSimilar.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value = action.payload;
    });
    builder.addCase(getSimilar.pending, (state) => {
      state.status = "fulfilled";
      state.value = [];
    });
    builder.addCase(getSimilar.rejected, (state) => {
      state.status = "failed";
      state.value = [];
    });
  },
});
