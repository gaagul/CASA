import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiXmp3wi-OwIPsCdiPhUNjdlk9cuJlkhs",
  authDomain: "casa-244b6.firebaseapp.com",
  projectId: "casa-244b6",
  storageBucket: "casa-244b6.appspot.com",
  messagingSenderId: "627186574550",
  appId: "1:627186574550:web:2f417cfb5a31e23c5d5577",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
