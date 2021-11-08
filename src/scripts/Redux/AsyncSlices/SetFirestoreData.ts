import { setFirestoreData } from "@redux/AsyncThunks/AsyncThunks";
import { createSlice } from "@reduxjs/toolkit";

const setFirestoreInit: {
  status: null | "fulfilled" | "pending" | "failed";
  value: any;
} = {
  status: null,
  value: null,
};
export const setFirestoreSlice = createSlice({
  name: "firestoreData",
  initialState: setFirestoreInit,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setFirestoreData.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value = action.payload;
    });
    builder.addCase(setFirestoreData.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(setFirestoreData.rejected, (state) => {
      state.status = "failed";
    });
  },
});
