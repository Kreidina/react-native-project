import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2BZbRp7D52bdSFYNWGsKh_p4dErPDrOE",
  authDomain: "rn-app-b3567.firebaseapp.com",
  projectId: "rn-app-b3567",
  storageBucket: "rn-app-b3567.appspot.com",
  messagingSenderId: "905368542230",
  appId: "1:905368542230:web:ba5f210f498e870bf72937",
  measurementId: "G-H40FBVT5BD",
  // apiKey: process.env.EXPO_PUBLIC_API_KEY,
  // authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  // projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  // storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  // messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  // appId: process.env.EXPO_PUBLIC_APP_ID,
  // measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
