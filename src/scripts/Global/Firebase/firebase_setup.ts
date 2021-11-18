import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDh02xdVEfBeqmH33tJb400jZILLmmHL0g",
  authDomain: "prototype-ae9eb.firebaseapp.com",
  databaseURL:
    "https://prototype-ae9eb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "prototype-ae9eb",
  storageBucket: "prototype-ae9eb.appspot.com",
  messagingSenderId: "122319683458",
  appId: "1:122319683458:web:0364b2f50fde6ac375d99b",
  measurementId: "G-RE1ETFTFQE",
};

firebase.initializeApp(firebaseConfig);
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const storage = firebase.storage();
export const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;
