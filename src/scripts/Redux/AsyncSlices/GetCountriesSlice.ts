import { getCountries } from "@redux/AsyncThunks/AsyncThunks";
import { createSlice } from "@reduxjs/toolkit";

export interface CountriesTypes {
  status: null | "fulfilled" | "pending" | "failed";
  value: { data: any[] } | string;
}
const countriesInit: CountriesTypes = {
  status: null,
  value: { data: [] },
};

export const countriesSlice = createSlice({
  name: "checkout",
  initialState: countriesInit,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value = action.payload;
    });
    builder.addCase(getCountries.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getCountries.rejected, (state) => {
      state.status = "failed";
    });
  },
});
