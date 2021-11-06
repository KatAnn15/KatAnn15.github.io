import { store } from "@redux/GlobalReducer";
import { setMemberStatus, setUserValue } from "@redux/UserReducers";
import { getAuth, signOut } from "firebase/auth";

export const memberMiddleware = (storeApi) => (next) => (action) => {
  const { getState, dispatch } = storeApi;
  const promise = new Promise((resolve) => {
    resolve(next(action));
  });
  return promise.then(() => {
    const state = store.getState();
    const auth = getAuth();
    if (state.membersStatus.value) {
      processUserLogin(state, dispatch, action);
    } else {
      processUserLogout(state, dispatch, auth);
    }
  });
};

function createUser(user: firebase.default.User) {
  console.log(user.uid);
  return {
    email: user.email,
    displayName: user.displayName
      ? user.displayName
      : user.email!.split("@")[0],
    uid: user.uid,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
  };
}

function processUserLogin(state, dispatch, action) {
  if (
    !state.user.value ||
    action.type === "profile/setMemberProfile/fulfilled"
  ) {
    const currentUser = getAuth().currentUser as firebase.default.User;
    dispatch(setMemberStatus(true));
    dispatch(setUserValue(createUser(currentUser)));
  }
}

function processUserLogout(state, dispatch, auth) {
  if (state.user.value) {
    signOut(auth);
    dispatch(setUserValue(null));
    dispatch(setMemberStatus(false));
  }
}
