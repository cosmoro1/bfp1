// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHXjEmLrjKeXJOf2qdn-_yqqXGMj-0VgA",
  authDomain: "bfp-project-6727f.firebaseapp.com",
  databaseURL: "https://bfp-project-6727f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bfp-project-6727f",
  storageBucket: "bfp-project-6727f.firebasestorage.app",
  messagingSenderId: "675371440922",
  appId: "1:675371440922:web:6e3d6690f827b69dd4eaa3",
  measurementId: "G-L90W11F8Y3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);