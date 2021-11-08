import { getFirestoreDataMatch } from "@firebaseMy/firebase_actions";
import { store } from "@redux/GlobalReducer";
import { setActivities } from "@redux/StateReducers";
import firebase from "@firebaseMy/firebase_setup";
import { setSubscribedStatus } from "@redux/UserReducers";

export const memeberActivityMiddleware = (storeApi) => (next) => (action) => {
  const { dispatch } = storeApi;
  const promise = new Promise((resolve) => {
    resolve(next(action));
  });
  promise.then(async () => {
    const state = store.getState();
    const profileCategory = state.profileCategory.value;
    const activities = state.profileActivities.value;
    if (profileCategory) {
      if (action.type === "profileCategory/setProfileCat") {
        const info = await getFirestoreDataMatch(
          profileCategory,
          firebase.firestore.FieldPath.documentId(),
          state.user.value?.uid
        );
        const newActivities = { ...activities, [profileCategory]: info };
        dispatch(setActivities(newActivities));
        if (newActivities["Plans"])
          if (newActivities["Plans"].length > 0)
            if (newActivities["Plans"][0].plans.length > 0)
              dispatch(setSubscribedStatus(true));
      }
    }
  });
};
