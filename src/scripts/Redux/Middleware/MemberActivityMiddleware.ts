import { getFirestoreDataMatch } from "@firebaseMy/firebase_actions";
import { store } from "@redux/GlobalReducer";
import { setActivities } from "@redux/StateReducers";
import firebase from "@firebaseMy/firebase_setup";

export const memeberActivityMiddleware = (storeApi) => (next) => (action) => {
  const { dispatch } = storeApi;
  const promise = new Promise((resolve) => {
    resolve(next(action));
  });
  promise.then(async () => {
    const state = store.getState();
    const profileCategory = state.profileCategory.value;
    const activities = state.profileActivities.value;
    if (profileCategory && action.type === "profileCategory/setProfileCat") {
      const info = await getFirestoreDataMatch(
        profileCategory,
        firebase.firestore.FieldPath.documentId(),
        state.user.value?.uid
      );
      const newActivities =
        activities.hasOwnProperty(profileCategory) || !activities
          ? activities
          : { ...activities, [profileCategory]: info };
      dispatch(setActivities(newActivities));
    }
  });
};
