// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSv7hdCe6GT2W_c-82DAEagmM6yKb57mA",
  authDomain: "sd-tracker-449515.firebaseapp.com",
  projectId: "sd-tracker-449515",
  storageBucket: "sd-tracker-449515.firebasestorage.app",
  messagingSenderId: "691053305129",
  appId: "1:691053305129:web:e67b924f4d8933a009ab38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log(app);