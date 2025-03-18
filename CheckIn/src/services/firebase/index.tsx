import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgL8PJUKNJjcDza2UNy7wJHLYHXTAYSG8",
  authDomain: "checkin-2b318.firebaseapp.com",
  projectId: "checkin-2b318",
  storageBucket: "checkin-2b318.firebasestorage.app",
  messagingSenderId: "798546300033",
  appId: "1:798546300033:web:615585a9a8edd5ea815180",
  measurementId: "G-9RE1B21K4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)