// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJmufCFuIVvUicHvjcTwEEIsBA1z5yopA",
  authDomain: "group-study-6c989.firebaseapp.com",
  projectId: "group-study-6c989",
  storageBucket: "group-study-6c989.appspot.com",
  messagingSenderId: "788126137765",
  appId: "1:788126137765:web:562b74dca3541856d13c4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);