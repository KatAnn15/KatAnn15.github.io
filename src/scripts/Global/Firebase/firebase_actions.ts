import { ref, getDownloadURL } from "firebase/storage";
import { storage, db } from "./firebase_setup";
//--------------RETRIEVING_DATA-------------//

export function getStorageItem(itemPath: string) {
  const reference = ref(storage, itemPath);
  return getDownloadURL(reference);
}
export function getFirestoreData(collection: string): Promise<any[]> {
  const ref = db.collection(collection);
  return new Promise((resolve) => {
    ref.onSnapshot((data) => {
      const parent: any[] = [];
      data.forEach((item) => {
        const itemdata = item.data();
        parent.push(itemdata);
      });
      resolve(parent);
    });
  });
}

export async function getFirestoreDataMatch(
  collection: string,
  toMatch: string | firebase.default.firestore.FieldPath,
  value: string
): Promise<any[]> {
  const ref = db.collection(collection);
  const data = await ref.where(toMatch, "==", value).get();
  const itemData: any[] = [];
  data.forEach((item) => {
    const itemdata = item.data();
    itemData.push(itemdata);
  });
  return itemData;
}
