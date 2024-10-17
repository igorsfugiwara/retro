// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Importa o Firestore

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

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Configura o Firestore
const db = getFirestore(app);

// Exporta o Firestore para uso em outros arquivos
export { db };
