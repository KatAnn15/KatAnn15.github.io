import { getVideos } from "@redux/AsyncThunks/AsyncThunks";
import { createSlice } from "@reduxjs/toolkit";

export interface VideosTypes {
  status: null | "success" | "pending" | "failed";
  value: any[];
}
const initVideos: VideosTypes = {
  status: null,
  value: [],
};
export const movieVideosSlice = createSlice({
  name: "videos",
  initialState: initVideos,
  reducers: {},
  extraReducers: (buidler) => {
    buidler.addCase(getVideos.fulfilled, (state, action) => {
      state.status = "success";
      state.value = action.payload;
    });
    buidler.addCase(getVideos.pending, (state) => {
      state.status = "pending";
      state.value = [];
    });
    buidler.addCase(getVideos.rejected, (state) => {
      state.status = "failed";
      state.value = [];
    });
  },
});
