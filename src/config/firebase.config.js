import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  addDoc,
  collection,
  updateDoc,
  serverTimestamp,
  getDoc,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

console.log(process.env.apiKey);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function createWaitlist(data) {
  try {
    const docRef = await addDoc(collection(db, "waitlists"), {
      creater_name: "abhishek",
      creater_uid: "1234",
      waitlist_name: data,
      created_on: serverTimestamp(),
    });
    console.log(docRef.id);
    const waitlistRef = doc(db, "waitlists", docRef.id);
    await updateDoc(waitlistRef, {
      waitlist_id: docRef.id,
      updated_on: serverTimestamp(),
    });
    return docRef.id;
  } catch (e) {
    console.log(e);
  }
}

export async function getAllWaitlist() {
  try {
    const snap = await getDocs(collection(db, "waitlists"));
    const data = snap.docs.map((doc) => {
      return doc.data();
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getSignups(id) {
  try {
    const snap = await getDocs(collection(db, `waitlists/${id}/waiters`));
    const data = snap.docs.map((doc) => {
      return doc.data();
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}
