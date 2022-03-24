
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyBqOgizUSx7Sx4RudGJH841N0ODjepjMl4",
  authDomain: "siosapp-335118.firebaseapp.com",
  databaseURL: "https://siosapp-335118-default-rtdb.firebaseio.com",
  projectId: "siosapp-335118",
  storageBucket: "siosapp-335118.appspot.com",
  messagingSenderId: "519653301005",
  appId: "1:519653301005:web:0022c8a20cf01feab7ae44",
  measurementId: "G-0FQ0WFXJGT"
};

initializeApp(config);

export const auth = getAuth();
connectAuthEmulator(auth, 'http://192.168.100.187:9099');

const db = getFirestore();
connectFirestoreEmulator(db, 'localhost', 8080);

const functions = getFunctions();
connectFunctionsEmulator(functions, 'localhost', 5001);



