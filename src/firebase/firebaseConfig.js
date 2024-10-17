// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBe4QY6fXl_K52niYnLkqPe44iuZgNLdc0",
    authDomain: "retro-comunista.firebaseapp.com",
    projectId: "retro-comunista",
    storageBucket: "retro-comunista.appspot.com",
    messagingSenderId: "851843394865",
    appId: "1:851843394865:web:b09c39eb82429750f29410",
    measurementId: "G-3KVDGHGXHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);