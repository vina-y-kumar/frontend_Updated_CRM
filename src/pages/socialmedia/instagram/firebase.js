import { getStorage } from 'firebase/storage';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBPsLD_NgSwchMrpG2U81UsH_USQGSiNZU",
  authDomain: "nurenai.firebaseapp.com",
  projectId: "nurenai",
  storageBucket: "nurenai.appspot.com",
  messagingSenderId: "667498046930",
  appId: "1:667498046930:web:cb281b053ddc016e18940b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export {storage};