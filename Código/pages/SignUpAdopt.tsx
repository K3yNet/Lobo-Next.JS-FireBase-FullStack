import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { useProfileController as useBusinessController } from '../controllers/ProfileBusinessController';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import router from 'next/router';

const SignUpAdopt = () => {
  const [userData, setUserData] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [pets, setPets] = useState([]);
  const { userData: business } = useBusinessController();

  const validationSchema = Yup.object({
    cpf: Yup.string().required('O CPF é obrigatório'),
  });

  const formik = useFormik({
    initialValues: {
      cpf: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const firestore = getFirestore();
        const usersRef = collection(firestore, 'users');
        const q = query(usersRef, where('cpf', '==', values.cpf));
        const querySnapshot = await getDocs(q);
        const user = querySnapshot.docs[0]?.data();
        setUserData(user);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    },
  });

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
  };

  const fetchPets = async () => {
    try {
      const firestore = getFirestore();
      const petsRef = collection(firestore, 'pets');
      const q = query(petsRef, where('userId', '==', business?.uid));
      const querySnapshot = await getDocs(q);
      const petList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPets(petList);
      setSelectedPet(null);
    } catch (error) {
      console.error('Erro ao buscar pets:', error);
    }
  };

  const registerAdoption = async () => {
    try {
      const firestore = getFirestore();
      const adoptsRef = collection(firestore, 'adopts');
      const adoptionData = {
        user: userData,
        pet: selectedPet,
        datetime: serverTimestamp(),
      };
      await addDoc(adoptsRef, adoptionData);
      console.log('Adoção registrada com sucesso!');

      // Excluir o pet do banco de dados
      const petDocRef = doc(firestore, 'pets', selectedPet.id);
      await deleteDoc(petDocRef);
      console.log('Pet excluído com sucesso!');

      // Limpar os dados do usuário e pet selecionado após o registro da adoção
      setUserData(null);
      setSelectedPet(null);
      router.push('/ProfilePage');
    } catch (error) {
      console.error('Erro ao registrar adoção:', error);
    }
  };

  useEffect(() => {
    if (business && Object.keys(business).length > 0) {
      fetchPets();
    }
  }, [business]);

  return (
    <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabIndex={-1} role="dialog" id="modalSignin">
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-4 shadow">

          <div className="modal-header p-5 pb-4 border-bottom-0">
            <h1 className="fw-bold mb-0 fs-2">Registre sua adoção!</h1>
          </div>

          <div className="modal-body p-5 pt-0">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="cpf"
                  name="cpf"
                  placeholder="CPF do usuário"
                  {...formik.getFieldProps('cpf')}
                />
                <label htmlFor="cpf">CPF do usuário</label>
                {formik.touched.cpf && formik.errors.cpf ? (
                  <div className="error">{formik.errors.cpf}</div>
                ) : null}
              </div>

              <button type="submit" className="btn btn-primary">Buscar Usuário</button>
            </form>

            {/* Exibir os dados do usuário encontrado */}
            {userData && (
              <div>
                <h3 className="mt-4">Dados do Usuário</h3>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="nome"
                    name="nome"
                    placeholder="Nome"
                    value={userData.nome}
                    readOnly
                  />
                  <label htmlFor="nome">Nome</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={userData.email}
                    readOnly
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="phone"
                    name="phone"
                    placeholder="Número de telefone"
                    value={userData.phone}
                    readOnly
                  />
                  <label htmlFor="phone">Número de telefone</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="cidade"
                    name="cidade"
                    placeholder="Cidade"
                    value={userData.cidade}
                    readOnly
                  />
                  <label htmlFor="cidade">Cidade</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="birth"
                    name="birth"
                    placeholder="Data de nascimento"
                    value={userData.birth}
                    readOnly
                  />
                  <label htmlFor="birth">Data de nascimento</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="cpf"
                    name="cpf"
                    placeholder="CPF"
                    value={userData.cpf}
                    readOnly
                  />
                  <label htmlFor="cpf">CPF</label>
                </div>
                {/* Outros campos do usuário */}
              </div>
            )}

            {/* Exibir os pets cadastrados */}
            {pets.length > 0 && (
              <div>
                <h3 className="mt-4">Pets Cadastrados</h3>
                <div className="row">
                  {pets.map((pet) => (
                    <div className="col-sm-6 mb-4" key={pet.id}>
                      <div className="card border-dark h-100">
                        <div className="row no-gutters">
                          <div className="card-body d-flex flex-column">
                            <h5 className="card-title mb-2">{pet.nomePet}</h5>
                            <p className="card-text mb-2"><strong>Espécie:</strong> {pet.especiePet}</p>
                            <button className="btn btn-outline-dark mt-auto" onClick={() => handleSelectPet(pet)}>
                              Selecionar Pet <i className="material-icons-outlined"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exibir informações do pet selecionado */}
            {selectedPet && (
              <div>
                <h3 className="mt-4">Informações do Pet</h3>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="nomePet"
                    name="nomePet"
                    placeholder="Nome do Pet"
                    value={selectedPet.nomePet}
                    readOnly
                  />
                  <label htmlFor="nomePet">Nome do Pet</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="especiePet"
                    name="especiePet"
                    placeholder="Espécie do Pet"
                    value={selectedPet.especiePet}
                    readOnly
                  />
                  <label htmlFor="especiePet">Espécie do pet</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="racePet"
                    name="racePet"
                    placeholder="Raça do pet"
                    value={selectedPet.racePet}
                    readOnly
                  />
                  <label htmlFor="racePet">Raça do pet</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="idadePet"
                    name="idadePet"
                    placeholder="Idade do pet"
                    value={selectedPet.idadePet}
                    readOnly
                  />
                  <label htmlFor="racePet">Idade do pet</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="pesoPet"
                    name="pesoPet"
                    placeholder="Peso do pet"
                    value={selectedPet.pesoPet}
                    readOnly
                  />
                  <label htmlFor="racePet">Peso do pet</label>
                </div>
                {/* Outros campos do pet */}
              </div>
            )}

            {/* Botão de registro de adoção */}
            {userData && selectedPet && (
              <div className="text-center mt-4">
                <button type="button" className="btn btn-primary" onClick={registerAdoption}>
                  Registrar Adoção
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpAdopt;