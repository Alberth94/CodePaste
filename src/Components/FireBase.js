import { initializeApp } from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBZlTzmG4LF86q8pWnh67npCSSo74FgUlM",
  authDomain: "pastebin-clone-c7e9b.firebaseapp.com",
  projectId: "pastebin-clone-c7e9b",
  storageBucket: "pastebin-clone-c7e9b.appspot.com",
  messagingSenderId: "831041845408",
  appId: "1:831041845408:web:3b6ecc77347901c955b1c5",
  measurementId: "G-3R32R6JFDM"
};

export const app = initializeApp(firebaseConfig);
