// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "yoga-23040.firebaseapp.com",
  projectId: "yoga-23040",
  storageBucket: "yoga-23040.firebasestorage.app",
  messagingSenderId: "872651642256",
  appId: "1:872651642256:web:32e5f6cf6fefd93caa4f15",
  measurementId: "G-81TRT36RNW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
