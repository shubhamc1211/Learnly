// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlffjQCcM4NlOwpLZwJVojhI7GQuizgY4",
  authDomain: "learnly-5df33.firebaseapp.com",
  projectId: "learnly-5df33",
  storageBucket: "learnly-5df33.appspot.com",
  messagingSenderId: "192163261505",
  appId: "1:192163261505:web:4514bfa6b1b9c66e15eac0",
  measurementId: "G-6Q1Z9M2YJK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
