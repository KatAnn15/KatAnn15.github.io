import { setStorageData } from "@redux/AsyncThunks/AsyncThunks";
import { createSlice } from "@reduxjs/toolkit";

const setStorageInit: {
  status: null | "fulfilled" | "pending" | "failed";
  value: any;
} = {
  status: null,
  value: null,
};
export const setStorageSlice = createSlice({
  name: "storageData",
  initialState: setStorageInit,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setStorageData.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value = action.payload;
    });
    builder.addCase(setStorageData.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(setStorageData.rejected, (state) => {
      state.status = "failed";
    });
  },
});
