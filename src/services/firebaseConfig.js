import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyn4ZJ64s-u6ctxpBmyQWO-Did8hZY-pE",
  authDomain: "showscope-3812.firebaseapp.com",
  projectId: "showscope-3812",
  storageBucket: "showscope-3812.firebasestorage.app",
  messagingSenderId: "725559956197",
  appId: "1:725559956197:web:e72eb1246380b33d957a0c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
