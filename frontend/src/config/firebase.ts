// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8XV-zjLAFa91fR29vSHcA5vpMEWCBp_k",
  authDomain: "capstone-9ffce.firebaseapp.com",
  projectId: "capstone-9ffce",
  storageBucket: "capstone-9ffce.firebasestorage.app",
  messagingSenderId: "814228452307",
  appId: "1:814228452307:web:251ee2ae50fd6e404f7526"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth()