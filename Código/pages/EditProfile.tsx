import { useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  where,
  DocumentSnapshot,
  getDocs,
  query,
  DocumentReference,
  FirestoreDataConverter,
  deleteDoc
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged, updateEmail, deleteUser, User } from 'firebase/auth';
import { useRouter } from 'next/router';

interface UserData {
  nome: string;
  email: string;
  birth: string;
  cidade: string;
  phone: string;
  newEmail?: string;
}

function EditProfile() {
  const [userData, setUserData] = useState<UserData>({
    nome: '',
    email: '',
    birth: '',
    cidade: '',
    phone: '',
    newEmail: ''
  });

  const [documentName, setDocumentName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const firestore = getFirestore();
    const usersRef = collection(firestore, 'users');

    // Verifique o estado de autenticação do usuário
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Usuário logado
        await fetchUserData(user.uid);
      } else {
        // Usuário não está logado
        router.push('/LoginPage'); // Redirecionar para a página de login, por exemplo
      }
    });

    const fetchUserData = async (uid: string) => {
      const q = query(usersRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0] as DocumentSnapshot<UserData>;
        setDocumentName(docSnapshot.id);
        setUserData(docSnapshot.data() as UserData);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDeleteProfile = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (user) {
      const confirmDelete = window.confirm('Tem certeza de que deseja excluir o perfil? Esta ação é irreversível.');
  
      if (confirmDelete) {
        try {
          // Excluir perfil no Firebase Authentication
          await deleteUser(user);
  
          // Excluir perfil no Firestore
          const firestore = getFirestore();
          const userDocRef: DocumentReference<UserData> | null = documentName
            ? doc(firestore, 'users', documentName) as DocumentReference<UserData>
            : null;
  
          if (userDocRef) {
            await deleteDoc(userDocRef);
          }
  
          router.push('/'); // Redirecionar para a página inicial ou para onde preferir
  
        } catch (error) {
          console.log('Erro ao excluir o perfil:', error);
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();
    const firestore = getFirestore();
    const user = auth.currentUser;
    if (user && documentName) {
      const userUID = user.uid;
      const converter: FirestoreDataConverter<UserData> = {
        toFirestore: (data) => data,
        fromFirestore: (snapshot) => snapshot.data() as UserData,
      };
      const userDocRef: DocumentReference<UserData> = doc(firestore, 'users', documentName).withConverter(converter);

      // Atualize o email no objeto userData, se fornecido
      const updatedUserData = { ...userData };
      if (updatedUserData.newEmail) {
        // Atualize o email de login no Firebase Authentication
        await updateEmail(user, updatedUserData.newEmail);

        // Atualize o email no Firestore
        updatedUserData.email = updatedUserData.newEmail;
        delete updatedUserData.newEmail;

        await updateDoc(userDocRef, updatedUserData);
        router.push('/ProfilePage'); // Redirecionar para a página de perfil após salvar
      } else {
        await updateDoc(userDocRef, updatedUserData);
        router.push('/ProfilePage'); // Redirecionar para a página de perfil após salvar
      }
    }
  };

  return (
    <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabIndex={-1} role="dialog" id="modalSignin">
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-4 shadow">

          <div className="modal-header p-5 pb-4 border-bottom-0">
            <h1 className="fw-bold mb-0 fs-2">Editar Perfil!</h1>
          </div>

          <div className="modal-body p-5 pt-0">
            <div className="box mx-auto" style={{ maxWidth: '400px' }}>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nome">Nome:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    name="nome"
                    value={userData.nome}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Novo Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="newEmail"
                    name="newEmail"
                    value={userData.newEmail}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="birth">Data de aniversário:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="birth"
                    name="birth"
                    value={userData.birth}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cidade">Cidade:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cidade"
                    name="cidade"
                    value={userData.cidade}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Telefone:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Salvar</button>
              </form>

              <div className="mt-4 text-center">
                <button className="btn btn-danger" onClick={handleDeleteProfile}>
                  Excluir Perfil
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

function reauthenticate(user: User) {
  throw new Error('Function not implemented.');
}
