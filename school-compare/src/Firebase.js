// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnpkoXtoilGMF7PDmWH_zS-wDdB_nsKz0",
  authDomain: "school-compare-cffbf.firebaseapp.com",
  projectId: "school-compare-cffbf",
  storageBucket: "school-compare-cffbf.appspot.com",
  messagingSenderId: "788961608159",
  appId: "1:788961608159:web:d63d54c0a1486aadb6446a",
  measurementId: "G-MX9P8H41WD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
export default app;