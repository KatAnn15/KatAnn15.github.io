import { createSlice } from "@reduxjs/toolkit";

const initPageState: { value: number } = { value: 1 };
export const pageSlice = createSlice({
  name: "page",
  initialState: initPageState,
  reducers: {
    setPage: (state: { value: number }, action) => {
      state.value = action.payload;
    },
  },
});

const initPlan = {
  value: null,
};
export const planSlice = createSlice({
  name: "plan",
  initialState: initPlan,
  reducers: {
    setPlan: (state: { value: any }, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;
export const { setPlan } = planSlice.actions;
