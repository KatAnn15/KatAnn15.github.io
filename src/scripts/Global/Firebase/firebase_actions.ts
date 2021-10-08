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
