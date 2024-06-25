import { getStorage } from 'firebase/storage';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export {storage};