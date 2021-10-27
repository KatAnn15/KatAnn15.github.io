import { getOneMovie } from "@redux/AsyncThunks/AsyncThunks";
import { createSlice } from "@reduxjs/toolkit";
import { MovieItemDetailsProps } from "../../Main/MoviePageIndividual/MovieDetails/MovieIndDetailsTypes";

const oneMovieInit:
  | MovieItemDetailsProps["movieData"]
  | { status: null | "success" | "pending" | "failed"; value: {} } = {
  status: null,
  value: {},
};

export const oneMovieSlice = createSlice({
  name: "movie",
  initialState: oneMovieInit,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOneMovie.fulfilled, (state, action) => {
      state.status = "success";
      state.value = action.payload;
    });
    builder.addCase(getOneMovie.pending, (state) => {
      state.status = "pending";
      state.value = {};
    });
    builder.addCase(getOneMovie.rejected, (state) => {
      state.status = "failed";
      state.value = {};
    });
  },
});
