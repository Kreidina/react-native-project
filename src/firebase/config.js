import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
const API_KEY = "AIzaSyDiOUnkKXevLGzWTBemMWQCUSI8NaaVsLs";
const AUTH_DOMAIN = "react-native-project-7e7fa.firebaseapp.com";
const PROJECT_ID = "react-native-project-7e7fa";
const STORAGE_BUCKER = "react-native-project-7e7fa.appspot.com";
const MESSAGING_SENDER_ID = "893441243562";
const APP_ID = "1:893441243562:web:ce4b93c1538f6087cb13d3";
const MEASUREMENT_ID = "G-P0Z6T4H3EC";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKER,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
