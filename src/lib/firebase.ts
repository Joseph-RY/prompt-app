import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALg4vLExr0M3m8eZtozlWQejYsbZAqv-U",
  authDomain: "prompt-app-22d1f.firebaseapp.com",
  projectId: "prompt-app-22d1f",
  storageBucket: "prompt-app-22d1f.appspot.com",
  messagingSenderId: "262886673743",
  appId: "1:262886673743:web:77375dcb7f05b9f6aa093a",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
