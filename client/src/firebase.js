// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-blog1-1e28e.firebaseapp.com",
  projectId: "mern-blog1-1e28e",
  storageBucket: "mern-blog1-1e28e.firebasestorage.app",
  messagingSenderId: "997327979038",
  appId: "1:997327979038:web:cb5974bbcd7b4aa5cee40f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
