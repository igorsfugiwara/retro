import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// Sua configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBe4QY6fXl_K52niYnLkqPe44iuZgNLdc0",
    authDomain: "retro-comunista.firebaseapp.com",
    projectId: "retro-comunista",
    storageBucket: "retro-comunista.appspot.com",
    messagingSenderId: "851843394865",
    appId: "1:851843394865:web:b09c39eb82429750f29410",
    measurementId: "G-3KVDGHGXHY", // Essa linha é opcional
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };