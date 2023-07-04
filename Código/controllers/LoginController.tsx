// controllers/LoginController.tsx
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { app } from '../services/firebaseConfig';

export function useLoginController() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.push('/'); // Redirecionar para a página de dashboard, por exemplo
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setShowConfirmationModal(true); // Exibir a mensagem de erro
      });
  };

  return {
    email,
    password, 
    showConfirmationModal, 
    setShowConfirmationModal, 
    setEmail, 
    setPassword, 
    handleLogin
  };
}