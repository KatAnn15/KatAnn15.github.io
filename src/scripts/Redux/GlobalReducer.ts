import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import { planMiddleware } from "./Middleware/PlanMiddleware";
import {
  Email,
  EmailStatus,
  Name,
  SubscribedStatus,
  MemberStatus,
} from "./Reducers";
import { pageSlice, planSlice } from "./StateReducers";

const RootReducer = combineReducers({
  name: Name.reducer,
  email: Email.reducer,
  emailStatus: EmailStatus.reducer,
  subscribedStatus: SubscribedStatus.reducer,
  membersStatus: MemberStatus.reducer,
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
});
export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    planMiddleware,
  ],
});

export type RootState = ReturnType<typeof RootReducer>;
