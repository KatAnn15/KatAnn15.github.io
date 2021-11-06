import { setMemberProfile } from "@redux/AsyncThunks/AsyncThunksMembers";
import { createSlice } from "@reduxjs/toolkit";

const memberProfileInit: {
  status: null | "fulfilled" | "pending" | "failed";
  value: {
    displayName: string | null | undefined;
    photoURL: any;
    uid: string;
  };
} = {
  status: null,
  value: {
    displayName: "",
    photoURL: "",
    uid: "",
  },
};

export const memberProfileSlice = createSlice({
  name: "profile",
  initialState: memberProfileInit,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setMemberProfile.fulfilled, (state, action) => {
      state.status = "fulfilled";
    });
    builder.addCase(setMemberProfile.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(setMemberProfile.rejected, (state) => {
      state.status = "failed";
    });
  },
});
