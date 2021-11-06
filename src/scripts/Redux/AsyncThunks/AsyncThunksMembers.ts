import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFirestoreData, getStorageItem } from "@firebaseMy/firebase_actions";
import { auth, storage } from "@firebaseMy/firebase_setup";
import { uploadBytes } from "@firebase/storage";
import { getAuth } from "@firebase/auth";

export const getMembersData = createAsyncThunk(
  "members/getMemebrsData",
  async () => {
    return getFirestoreData("Users");
  }
);

export const setMemberProfile = createAsyncThunk(
  "profile/setMemberProfile",
  (newProfile: {
    displayName?: string | null | undefined;
    photoFiles?: any;
    uid: string;
  }) => {
    const profile = {
      displayName: newProfile.displayName,
      photoURL: "",
    };
    const itemPath =
      `Members/Media/${newProfile.uid}/` + newProfile.photoFiles[0].name;
    const ref = storage.ref(itemPath);
    return uploadBytes(ref, newProfile.photoFiles[0])
      .then(async (snapshot) => {
        try {
          const imageUrl = await getStorageItem(itemPath);
          profile.photoURL = imageUrl;
          return auth.currentUser?.updateProfile(profile).then(() => {
            const newAuth = getAuth().currentUser;
            return {
              displayName: newAuth!.displayName,
              photoURL: newAuth!.photoURL,
              uid: newAuth!.uid,
            };
          });
        } catch (err) {
          return {
            displayName: auth.currentUser!.displayName,
            photoURL: auth.currentUser!.photoURL,
            uid: auth.currentUser!.uid,
          };
        }
      })
      .catch((err) => console.log(err));
  }
);
