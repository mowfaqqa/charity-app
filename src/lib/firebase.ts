// Import the functions you need from the SDKs you need
import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import 'firebase/auth'
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6P2deuCne8u_Q-Hlk6J98qFoI8rYSf1c",
  authDomain: "charity-app-dcf71.firebaseapp.com",
  projectId: "charity-app-dcf71",
  storageBucket: "charity-app-dcf71.appspot.com",
  messagingSenderId: "939419285494",
  appId: "1:939419285494:web:8059836fe594b000e039d7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const database = getDatabase(app)
