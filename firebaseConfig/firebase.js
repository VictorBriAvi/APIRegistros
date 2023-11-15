import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA-5aPZVgu7zlAM8-ueoIt-LJoFnymMTyM",
  authDomain: "pruebapeluqueria-50774.firebaseapp.com",
  projectId: "pruebapeluqueria-50774",
  storageBucket: "pruebapeluqueria-50774.appspot.com",
  messagingSenderId: "681147642361",
  appId: "1:681147642361:web:760d41a218e139ae6e0d28",
  measurementId: "G-0DLL3SZVMQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
