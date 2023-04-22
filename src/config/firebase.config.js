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
  query,
  where,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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
const auth = getAuth();

const uid = localStorage.getItem("uid");

export async function createWaitlist(data) {
  try {
    const docRef = await addDoc(collection(db, "waitlists"), {
      creater_name: "",
      creater_uid: uid,
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
    const queryString = query(
      collection(db, "waitlists"),
      where("creater_uid", "==", uid)
    );
    const snap = await getDocs(queryString);
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

//auth functions
//this function used for sign in with email and password
export const signInWithEmailAndPassword1 = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      localStorage.setItem("uid", userCredential.user.uid);
      localStorage.setItem(
        "user",
        JSON.stringify(userCredential._tokenResponse)
      );
      //const authToken = userToken
      return "success";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
      return errorMessage;
    });
  return res;
};

//this function used for sign up with email and password
export const signUpWithEmailAndPassword1 = async (password, email) => {
  let result;
  const auth = getAuth();
  const res = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      localStorage.setItem("uid", userCredential.user.uid);
      localStorage.setItem(
        "user",
        JSON.stringify(userCredential._tokenResponse)
      );
      const user = userCredential.user;
      const docRef = addDoc(collection(db, "users"), {
        email: user.email,
        uid: user.uid,
        created_on: serverTimestamp(),
        updated_on: serverTimestamp(),
      });
      return "success";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return error.message;
    });
  return res;
};

//this function used for forgot password
export const forgotPassword = async (email) => {
  let result = "success";
  try {
    let result = await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((user) => {});
    result = "success";
  } catch (error) {
    console.log(error.message);
    result = error.message;
  }
  return result;
};

//this function used for Reset password
export const ChangePassword = async (values) => {
  const { password, newPassword } = values;
  let email = localStorage.getItem("useremail");
  let result = "Your Password is Updated";
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (user) {
        firebase
          .auth()
          .currentUser.updatePassword(newPassword)
          .then(async function () {
            result = "Your Password is Updated";
          })
          .catch(function (err) {
            result = err;
          });
      })
      .catch(function (err) {
        console.log(err.message);
        result = "Please Enter the Correct Old Password";
      });
    //result = 'success'
  } catch (error) {
    console.log(error.message);
    result = error.message;
  }
  return result;
};

//this function used for signout the profile
export const SignOut = async (email) => {
  let result = "success";
  try {
    let result = await firebase;
    signOut(auth).then((user) => {
      localStorage.clear();
    });
    result = "success";
  } catch (error) {
    console.log(error.message);
    result = error.message;
  }
  return result;
};
