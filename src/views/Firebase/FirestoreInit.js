import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// ... other firebase imports

const firebaseConfig = {
  apiKey: "AIzaSyBgXlnez0RJ1GffBAeWjPDKNqI2Ad1DXAA",
  authDomain: "agap-f4c32.firebaseapp.com",
  projectId: "agap-f4c32",
  storageBucket: "agap-f4c32.appspot.com",
  messagingSenderId: "1060919755818",
  appId: "1:1060919755818:web:236f2e1b76c386d7516f53",
  measurementId: "G-J7L99MFPGV",
};

export const firebaseApp = initializeApp({ firebaseConfig });

// used for the firestore refs
const db = getFirestore(firebaseApp);

// here we can export reusable database references
export const todosRef = collection(db, "todos");
