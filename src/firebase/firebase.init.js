// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC61a2xdzMBpwAO2A9zElfDicj4fywJH6Y",
    authDomain: "my-hotel-8c748.firebaseapp.com",
    projectId: "my-hotel-8c748",
    storageBucket: "my-hotel-8c748.firebasestorage.app",
    messagingSenderId: "524644603699",
    appId: "1:524644603699:web:3d5e1fa2fecc8321bdd046"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
