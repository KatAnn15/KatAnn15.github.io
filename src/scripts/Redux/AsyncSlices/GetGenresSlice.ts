import { getGenres } from "@redux/AsyncThunks/AsyncThunks";
import { createSlice } from "@reduxjs/toolkit";

const genresInit: {
  status: null | "fulfilled" | "pending" | "failed";
  value: any[];
} = {
  status: null,
  value: [],
};
export const genresSlice = createSlice({
  name: "genres",
  initialState: genresInit,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value = action.payload;
    });
    builder.addCase(getGenres.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getGenres.rejected, (state) => {
      state.status = "failed";
    });
  },
});
