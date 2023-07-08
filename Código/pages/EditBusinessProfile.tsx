import { useEffect, useState } from 'react';
import { getFirestore, collection, doc, updateDoc, where, DocumentSnapshot, getDocs, query, DocumentReference, FirestoreDataConverter } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, updateEmail } from 'firebase/auth';
import { useRouter } from 'next/router';

interface UserData {
  addrs: string;
  cnpj: string;
  email: string;
  nomeAdm: string;
  nomeInst: string;
  phone: string;
  newEmail?: string;
}

function EditProfile() {
  const [userData, setUserData] = useState<UserData>({
    addrs: '',
    cnpj: '',
    email: '',
    nomeAdm: '',
    nomeInst: '',
    phone: '',
    newEmail: ''
  });

  const [documentName, setDocumentName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const firestore = getFirestore();
    const usersRef = collection(firestore, 'business');

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
      const userDocRef: DocumentReference<UserData> = doc(firestore, 'business', documentName).withConverter(converter);

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
                  <label htmlFor="nome">Nome da instituição:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nomeInst"
                    name="nomeInst"
                    value={userData.nomeInst}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cidade">Nome do responsável:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nomeAdm"
                    name="nomeAdm"
                    value={userData.nomeAdm}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">CNPJ:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cnpj"
                    name="cnpj"
                    value={userData.cnpj}
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
                  <label htmlFor="birth">Endereço:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="addrs"
                    name="addrs"
                    value={userData.addrs}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;