import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  Email,
  EmailStatus,
  Name,
  SubscribedStatus,
  MemberStatus,
} from "./Reducers";

const RootReducer = combineReducers({
  name: Name.reducer,
  email: Email.reducer,
  emailStatus: EmailStatus.reducer,
  subscribedStatus: SubscribedStatus.reducer,
  membersStatus: MemberStatus.reducer,
});
export const store = configureStore({
  reducer: RootReducer,
});

export type RootState = ReturnType<typeof RootReducer>;
