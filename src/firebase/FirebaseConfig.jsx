// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeVqpJuMrKsP3oaIvxUGigPdwtVdkcpsA",
  authDomain: "myfirstapp-e83c4.firebaseapp.com",
  projectId: "myfirstapp-e83c4",
  storageBucket: "myfirstapp-e83c4.firebasestorage.app",
  messagingSenderId: "721589314544",
  appId: "1:721589314544:web:e57b85101064464659b335"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;