import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB32WlPKuJg_D5xRTQ5BDDHymclWIE8Tss",
  authDomain: "nurenai-c9cb8.firebaseapp.com",
  projectId: "nurenai-c9cb8",
  storageBucket: "nurenai-c9cb8.appspot.com",
  messagingSenderId: "1092310999688",
  appId: "1:1092310999688:web:9f969bc630e75aad62b53d",
  measurementId: "G-EWMN18MQRK"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db,app };
