import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { memberProfileSlice } from "./AsyncSlices/AsyncSliceMembers/SetMemberProfileSlice";
import { moviesFilterSlice } from "./AsyncSlices/ExpandFilterSlice";
import { allPlansSlice } from "./AsyncSlices/GetAllPlans";
import { countriesSlice } from "./AsyncSlices/GetCountriesSlice";
import { genresSlice } from "./AsyncSlices/GetGenresSlice";
import moviesSlice from "./AsyncSlices/GetMoviesSlice";
import { movieVideosSlice } from "./AsyncSlices/GetMovieVideos";
import { oneMovieSlice } from "./AsyncSlices/GetOneMovieSlice";
import { searchSlice } from "./AsyncSlices/GetSearchMovies";
import { similarSlice } from "./AsyncSlices/GetSimilarSlice";
import { checkoutSlice } from "./AsyncSlices/PostCheckoutSlice";
import { memberMiddleware } from "./Middleware/MemberMiddleware";
import { planMiddleware } from "./Middleware/PlanMiddleware";
import { SubscribedStatus, MemberStatus, User } from "./UserReducers";
import {
  pageSlice,
  planSlice,
  profileCategorySlice,
  profilleActivitiesSlice,
} from "./StateReducers";
import { memeberActivityMiddleware } from "./Middleware/MemberActivityMiddleware";

const RootReducer = combineReducers({
  user: User.reducer,
  subscribedStatus: SubscribedStatus.reducer,
  membersStatus: MemberStatus.reducer,
  updateProfile: memberProfileSlice.reducer,
  movies: moviesSlice.reducer,
  page: pageSlice.reducer,
  fiterToggle: moviesFilterSlice.reducer,
  movie: oneMovieSlice.reducer,
  videos: movieVideosSlice.reducer,
  similar: similarSlice.reducer,
  search: searchSlice.reducer,
  plan: planSlice.reducer,
  countries: countriesSlice.reducer,
  checkout: checkoutSlice.reducer,
  genres: genresSlice.reducer,
  allPlans: allPlansSlice.reducer,
  profileCategory: profileCategorySlice.reducer,
  profileActivities: profilleActivitiesSlice.reducer,
});
export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    planMiddleware,
    memberMiddleware,
    memeberActivityMiddleware,
  ],
});

export type RootState = ReturnType<typeof RootReducer>;
