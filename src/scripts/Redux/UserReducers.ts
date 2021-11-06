import { createSlice } from "@reduxjs/toolkit";
import { ReducerActionTypeBoolean, ReducerActionTypeUser } from "./Interfaces";

const initUser: ReducerActionTypeUser["value"] = {
  value: null,
};
const initSubscribeStatus: ReducerActionTypeBoolean["value"] = {
  value: false,
};
const initMemberStatus: ReducerActionTypeBoolean["value"] = {
  value: false,
};

export const User = createSlice({
  name: "user",
  initialState: initUser,
  reducers: {
    setUserValue: (state, action: ReducerActionTypeUser["action"]) => {
      state.value = action.payload;
    },
  },
});

export const MemberStatus = createSlice({
  name: "memberStatus",
  initialState: initMemberStatus,
  reducers: {
    setMemberStatus: (state, action: ReducerActionTypeBoolean["action"]) => {
      state.value = action.payload;
    },
  },
});
export const SubscribedStatus = createSlice({
  name: "emailStatus",
  initialState: initSubscribeStatus,
  reducers: {
    setSubscribedStatus: (
      state,
      action: ReducerActionTypeBoolean["action"]
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setUserValue } = User.actions;
export const { setSubscribedStatus } = SubscribedStatus.actions;
export const { setMemberStatus } = MemberStatus.actions;
