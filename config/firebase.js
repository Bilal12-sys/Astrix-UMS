import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  collection, 
  getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6yAkRpm087Xb98oO8PRq4uYOTzLRkIqY",
  authDomain: "astrix-ums.firebaseapp.com",
  projectId: "astrix-ums",
  storageBucket: "astrix-ums.firebasestorage.app",
  messagingSenderId: "360578668583",
  appId: "1:360578668583:web:ba5f5fdceb8006e7129602",
  measurementId: "G-WL7NV85JLD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { 
  auth, 
  db, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  doc,
  setDoc,
  collection, 
  getDocs
};