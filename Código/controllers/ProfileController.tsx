// controllers/ProfileController.ts
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../services/firebaseConfig';
import { UserData } from '../models/UserProfile';

export function useProfileController() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUid, setUserUid] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const userRef = collection(db, 'users');

    const fetchUserData = async (uid: string) => {
      const uidQuery = query(userRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(uidQuery);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        setUserData(userDoc.data() as UserData);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      if (user) {
        setUserUid(user.uid);
        fetchUserData(user.uid);
      } else {
        setUserData(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { isLoggedIn, userData };
}