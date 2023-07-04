import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCmWLOZJXhlnk25FIjNBppwizLbSnDwwSk",
  authDomain: "lobo-next-998fe.firebaseapp.com",
  projectId: "lobo-next-998fe",
  storageBucket: "lobo-next-998fe.appspot.com",
  messagingSenderId: "630762658661",
  appId: "1:630762658661:web:e8209f30466ffc8feddf8c"
};

// Inicialize o app do Firebase
const app = initializeApp(firebaseConfig);

// Obtenha a instância de autenticação
const auth = getAuth();

export { app, auth };