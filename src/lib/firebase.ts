// Import the functions you need from the SDKs you need
import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import 'firebase/auth'
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSgTMHwapVkPxrSwmtdYQF78YG7LQmY0E",
  authDomain: "charity-app-f2505.firebaseapp.com",
  projectId: "charity-app-f2505",
  storageBucket: "charity-app-f2505.appspot.com",
  messagingSenderId: "1018795224109",
  appId: "1:1018795224109:web:5e964cc7b7d2f146eb1ca4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const database = getDatabase(app)
