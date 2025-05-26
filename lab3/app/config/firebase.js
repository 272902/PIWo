// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0JEZGvoYNud-rW6_U87q25SWMWWtfxD0",
  authDomain: "piwo-lab4-e89a2.firebaseapp.com",
  projectId: "piwo-lab4-e89a2",
  storageBucket: "piwo-lab4-e89a2.firebasestorage.app",
  messagingSenderId: "689110596725",
  appId: "1:689110596725:web:621dddf5c106a221510c3c",
  measurementId: "G-513H6T66DY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);