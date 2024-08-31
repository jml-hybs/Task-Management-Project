// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: 'AIzaSyDgHBgqhL7JK9tDTxBHPepIDwBzA5NL7xM',
    authDomain: 'climbsph.firebaseapp.com',
    projectId: 'climbsph',
    storageBucket: 'climbsph.appspot.com',
    messagingSenderId: '826841253047',
    appId: '1:826841253047:web:135fe1051c91d7655df932',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
export const auth = getAuth(app); 