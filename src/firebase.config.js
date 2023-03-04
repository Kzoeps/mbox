// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAltxqxM1kXAkqWlnuRFKvtczopKf4u8Fs",
  authDomain: "hacket-mbox.firebaseapp.com",
  projectId: "hacket-mbox",
  storageBucket: "hacket-mbox.appspot.com",
  messagingSenderId: "292244782967",
  appId: "1:292244782967:web:d5988e3b06cc0145826b72",
  measurementId: "G-40RYETQKY1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
