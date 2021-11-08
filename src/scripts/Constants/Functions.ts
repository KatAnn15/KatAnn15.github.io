import { store } from "@redux/GlobalReducer";
import { getAuth } from "firebase/auth";
import { setMemberStatus } from "@redux/UserReducers";
import { setProfileCat } from "@redux/StateReducers";

export const initUser = () => {
  const user = store.getState().user.value;
  const dispatch = store.dispatch;
  if (!user) {
    const auth = getAuth();
    auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        dispatch(setMemberStatus(true));
        dispatch(setProfileCat("Plans"));
      }
    });
  }
};
