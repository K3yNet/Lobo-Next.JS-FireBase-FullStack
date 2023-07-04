import { useState } from 'react';
import router from 'next/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../services/firebaseConfig';
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { User, validationSchema } from '../models/EnterpriseModel';

export function useUserController() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showConfirmationModal_cnpj, setShowConfirmationModal_cnpj] = useState(false);

  const handleSubmit = async (values: User) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
    } catch (errors) {
      console.log(errors);
      return;
    }

    const auth = getAuth(app);
    const db = getFirestore(app);
    const userRef = collection(db, 'business');

    const cnpjQuery = query(userRef, where('cnpj', '==', values.cnpj));
    const cnpjQuerySnapshot = await getDocs(cnpjQuery);
    if (!cnpjQuerySnapshot.empty) {
      setShowConfirmationModal_cnpj(true);
      return;
    }

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        const newUser = {
          nomeInst: values.nomeInst,
          nomeAdm: values.nomeAdm,
          email: values.email,
          cnpj: values.cnpj,
          phone: values.phone,
          addrs: values.addrs,
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
    showConfirmationModal_cnpj,
    setShowConfirmationModal_cnpj,
  };
}