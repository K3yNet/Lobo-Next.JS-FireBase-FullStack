import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { auth } from './firebaseConfig';

interface User {
	uid: any;
  // Defina os campos da interface User conforme necessário
  // Exemplo: uid, displayName, email, photoURL, etc.
}

const AuthContext = createContext<User | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Limpeza do efeito quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
