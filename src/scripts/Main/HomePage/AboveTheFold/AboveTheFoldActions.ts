import { getFirestoreData } from "../../../Global/Firebase/firebase_actions";
import firebase from "../../../Global/Firebase/firebase_setup";
const ref = firebase.firestore();

export const fetchCollectionData = async (setATFData) => {
  const data = await getFirestoreData("ATF");
  setATFData({
    title: data[0].title,
    subtitle: data[0].subtitle,
    imageURL: data[0].imageURL,
    actionNote: data[0].actionNote,
  });
};
