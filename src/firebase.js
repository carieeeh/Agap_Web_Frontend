import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyBgXlnez0RJ1GffBAeWjPDKNqI2Ad1DXAA",
  authDomain: "agap-f4c32.firebaseapp.com",
  databaseURL: "https://agap-f4c32-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "agap-f4c32",
  storageBucket: "agap-f4c32.appspot.com",
  messagingSenderId: "1060919755818",
  appId: "1:1060919755818:web:236f2e1b76c386d7516f53",
  measurementId: "G-J7L99MFPGV"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const useFireStoreDb = db;