// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhHbTksP6L2sw2qAk2ozLzi-utU47uh5A",
  authDomain: "agap-f4c32.firebaseapp.com",
  projectId: "agap-f4c32",
  storageBucket: "agap-f4c32.appspot.com",
  messagingSenderId: "1060919755818",
  appId: "1:1060919755818:web:236f2e1b76c386d7516f53",
  measurementId: "G-J7L99MFPGV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
