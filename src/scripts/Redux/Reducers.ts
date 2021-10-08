import { createSlice } from "@reduxjs/toolkit";
import {
  ReducerActionTypeString,
  ReducerActionTypeBoolean,
} from "./Interfaces";

const initEmail: ReducerActionTypeString["value"] = {
  value: null,
};
const initName: ReducerActionTypeString["value"] = {
  value: null,
};
const initEmailStatus: ReducerActionTypeBoolean["value"] = {
  value: false,
};
const initSubscribeStatus: ReducerActionTypeBoolean["value"] = {
  value: false,
};
const initMemberStatus: ReducerActionTypeBoolean["value"] = {
  value: false,
};

export const Email = createSlice({
  name: "email",
  initialState: initEmail,
  reducers: {
    setEmailValue: (state, action: ReducerActionTypeString["action"]) => {
      state.value = action.payload;
    },
  },
});

export const Name = createSlice({
  name: "name",
  initialState: initName,
  reducers: {
    setNameValue: (state, action: ReducerActionTypeString["action"]) => {
      state.value = action.payload;
    },
  },
});

export const EmailStatus = createSlice({
  name: "emailStatus",
  initialState: initEmailStatus,
  reducers: {
    setEmailStatus: (state, action: ReducerActionTypeBoolean["action"]) => {
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

export const { setEmailValue } = Email.actions;
export const { setNameValue } = Name.actions;
export const { setEmailStatus } = EmailStatus.actions;
export const { setSubscribedStatus } = SubscribedStatus.actions;
export const { setMemberStatus } = MemberStatus.actions;
