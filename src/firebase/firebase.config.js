// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOGbbeY46bFXcUBdnuhkrVTFNLVjGFBDU",
  authDomain: "ema-john-with-firebase-a-aa7f1.firebaseapp.com",
  projectId: "ema-john-with-firebase-a-aa7f1",
  storageBucket: "ema-john-with-firebase-a-aa7f1.appspot.com",
  messagingSenderId: "946630889576",
  appId: "1:946630889576:web:adeb4a29218909c35bebdd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;