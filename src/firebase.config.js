// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'

import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5WErL8beR89P5TUr2AgM5OQh4syMq4a4",
  authDomain: "chatapp-68a54.firebaseapp.com",
  projectId: "chatapp-68a54",
  storageBucket: "chatapp-68a54.appspot.com",
  messagingSenderId: "524701289244",
  appId: "1:524701289244:web:c8e855db76876c3c5088d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider = new GoogleAuthProvider();
export const db =getFirestore(app);