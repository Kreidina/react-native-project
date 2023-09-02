import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
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
// export const analytics = getAnalytics(app);
