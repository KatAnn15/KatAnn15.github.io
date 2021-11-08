import { getFirestoreDataMatch } from "@firebaseMy/firebase_actions";
import firebase from "@firebaseMy/firebase_setup";
import { store } from "@redux/GlobalReducer";
import { setFirestoreData } from "@redux/AsyncThunks/AsyncThunks";
import { setProfileCat } from "@redux/StateReducers";

export const checkIfPresent = async (
  collection: string,
  id: number,
  uid: string
) => {
  const data = await getFirestoreDataMatch(
    collection,
    firebase.firestore.FieldPath.documentId(),
    uid
  );
  if (data.length > 0)
    if (data[0].movies.find((item) => item.id === id)) return true;
  return false;
};

export const setActivity = async (
  collection: string,
  uid: string,
  id: number,
  poster: string
) => {
  const dispatch = store.dispatch;
  const alreadyWatchedData = await getFirestoreDataMatch(
    collection,
    firebase.firestore.FieldPath.documentId(),
    uid
  );

  let watchedMovies: any[] = [];
  if (alreadyWatchedData[0]) {
    watchedMovies = [...alreadyWatchedData[0].movies];
  }
  const watchedUpdated = watchedMovies.concat([
    { id: id, poster: poster, _createdDate: new Date().toUTCString() },
  ]);
  dispatch(
    setFirestoreData({
      uid: uid,
      collection: collection,
      files: { movies: watchedUpdated },
    })
  ).then(() => dispatch(setProfileCat(collection)));
};
