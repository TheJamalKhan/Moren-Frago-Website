import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
  authDomain: "loginmoren-eb9ee.firebaseapp.com",
  projectId: "loginmoren-eb9ee",
  storageBucket: "loginmoren-eb9ee.firebasestorage.app",
  messagingSenderId: "386090647623",
  appId: "1:386090647623:web:aa888f1c47245bef92f162"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider};