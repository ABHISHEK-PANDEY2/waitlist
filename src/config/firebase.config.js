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
  apiKey: "AIzaSyBfeubHUJrNzGlBOTnQcOmn9PP0nCBggZY",
  authDomain: "developerpass-co.firebaseapp.com",
  projectId: "developerpass-co",
  storageBucket: "developerpass-co.appspot.com",
  messagingSenderId: "582660964991",
  appId: "1:582660964991:web:4b8d7c577b1727f940b54a",
  measurementId: "G-YQ5MGHHDX7",
};

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
