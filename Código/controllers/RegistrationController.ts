import { useState } from 'react';
import router from 'next/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../services/firebaseConfig';
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { User, validationSchema } from '../models/UserModel';

export function useUserController() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showConfirmationModal_CPF, setShowConfirmationModal_CPF] = useState(false);

  const handleSubmit = async (values: User) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
    } catch (errors) {
      console.log(errors);
      return;
    }

    const auth = getAuth(app);
    const db = getFirestore(app);
    const userRef = collection(db, 'users');

    const cpfQuery = query(userRef, where('cpf', '==', values.cpf));
    const cpfQuerySnapshot = await getDocs(cpfQuery);
    if (!cpfQuerySnapshot.empty) {
      setShowConfirmationModal_CPF(true);
      return;
    }

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        const newUser = {
          nome: values.nome,
          email: values.email,
          cpf: values.cpf,
          phone: values.phone,
          birth: values.birth,
          cidade: values.cidade,
          uid: user.uid,
        };

        await addDoc(userRef, newUser);

        router.push('/'); // Redirecionar para a página de dashboard, por exemplo
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setShowConfirmationModal(true);
      });
  };

  return {
    handleSubmit,
    showConfirmationModal,
    setShowConfirmationModal,
    showConfirmationModal_CPF,
    setShowConfirmationModal_CPF,
  };
}