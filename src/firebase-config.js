// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUBVr-k7l1EriCn4Lnugq-3XZffeM2D00",
  authDomain: "chatapp-ac2ec.firebaseapp.com",
  projectId: "chatapp-ac2ec",
  storageBucket: "chatapp-ac2ec.appspot.com",
  messagingSenderId: "380372145964",
  appId: "1:380372145964:web:4f80021229294d6c603e89",
  measurementId: "G-SSQDV93HED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider()
const auth = getAuth();
const db = getFirestore(app)

export { provider, auth, db }