import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPw8j1HNlwl60IxudFK8_y7N7RJyBQV4U",
  authDomain: "webertech1-bingwa.firebaseapp.com",
  projectId: "webertech1-bingwa",
  storageBucket: "webertech1-bingwa.firebasestorage.app",
  messagingSenderId: "1039584358434",
  appId: "1:1039584358434:web:11fc7b712419080b875a7b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);