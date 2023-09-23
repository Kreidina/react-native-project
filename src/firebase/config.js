import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDiOUnkKXevLGzWTBemMWQCUSI8NaaVsLs",
  authDomain: "react-native-project-7e7fa.firebaseapp.com",
  projectId: "react-native-project-7e7fa",
  storageBucket: "react-native-project-7e7fa.appspot.com",
  messagingSenderId: "893441243562",
  appId: "1:893441243562:web:ce4b93c1538f6087cb13d3",
  measurementId: "G-P0Z6T4H3EC",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
