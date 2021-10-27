import { postCheckout } from "@redux/AsyncThunks/AsyncThunks";
import { createSlice } from "@reduxjs/toolkit";

export interface CheckoutTypes {
  status: null | "fulfilled" | "pending" | "failed";
  value: any;
}
const checkoutInit: CheckoutTypes = {
  status: null,
  value: null,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: checkoutInit,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postCheckout.fulfilled, (state, action: any) => {
      state.status = "fulfilled";
      state.value = action.payload;
    });
    builder.addCase(postCheckout.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(postCheckout.rejected, (state) => {
      state.status = "failed";
    });
  },
});
