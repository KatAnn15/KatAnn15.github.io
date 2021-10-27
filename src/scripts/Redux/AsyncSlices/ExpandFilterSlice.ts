import { createSlice } from "@reduxjs/toolkit";

const initFilter: { value: Boolean } = {
  value: false,
};

export const moviesFilterSlice = createSlice({
  name: "filter",
  initialState: initFilter,
  reducers: {
    toggleFilter: (state) => {
      state.value === true ? (state.value = false) : (state.value = true);
    },
  },
});

export const { toggleFilter } = moviesFilterSlice.actions;
