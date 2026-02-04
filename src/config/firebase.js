// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "movie-booking-system-3f407.firebaseapp.com",
  projectId: "movie-booking-system-3f407",
  storageBucket: "movie-booking-system-3f407.firebasestorage.app",
  messagingSenderId: "62889299673",
  appId: "1:62889299673:web:c20225ab13f52ef127f8c8",
  measurementId: "G-WSMFZ6Z6RV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);