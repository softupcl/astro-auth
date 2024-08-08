// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8Gw0QZofVyabLFxKBsRDE5eyMdYIV3pE",
  authDomain: "auth-astro-e19f5.firebaseapp.com",
  projectId: "auth-astro-e19f5",
  storageBucket: "auth-astro-e19f5.appspot.com",
  messagingSenderId: "508589392520",
  appId: "1:508589392520:web:ea716f2de0215054bf153d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = 'es';

export const firebase = {
  app,
  auth
}