import { createSlice } from "@reduxjs/toolkit";
import { getMovies } from "../AsyncThunks/AsyncThunks";
import { MovieItemDetailsProps } from "../../Main/MoviePageIndividual/MovieDetails/MovieIndDetailsTypes";

export interface MoviesDataType {
  status: null | "success" | "pending" | "failed";
  data:
    | {
        category: string;
        items: MovieItemDetailsProps["movieData"][];
      }[]
    | any[];
}

const initMovies: MoviesDataType = {
  status: null,
  data: [],
};
const moviesSlice = createSlice({
  name: "movies",
  initialState: initMovies,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.status = "success";
      state.data.push(action.payload);
    });
    builder.addCase(getMovies.pending, (state) => {
      state.status = "pending";
      state.data = [];
    });
    builder.addCase(getMovies.rejected, (state) => {
      state.status = "failed";
      state.data = [];
    });
  },
});

export default moviesSlice;
