import { getSearchMovies } from "@redux/AsyncThunks/AsyncThunks";
import { createSlice } from "@reduxjs/toolkit";

export interface SearchTypes {
  status: null | "success" | "pending" | "failed";
  value: any[];
}
const searchInit: SearchTypes = {
  status: null,
  value: [],
};
export const searchSlice = createSlice({
  name: "search",
  initialState: searchInit,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSearchMovies.fulfilled, (state, action) => {
      state.status = "success";
      state.value = action.payload;
    });
    builder.addCase(getSearchMovies.pending, (state) => {
      state.status = "pending";
      state.value = [];
    });
    builder.addCase(getSearchMovies.rejected, (state) => {
      state.status = "failed";
      state.value = [];
    });
  },
});
