import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useProfileController as useBusinessController } from '../controllers/ProfileBusinessController';

function Adopt() {
  const { userData: business } = useBusinessController();
  const [adoptions, setAdoptions] = useState([]);
  const [selectedAdoption, setSelectedAdoption] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [searchCPF, setSearchCPF] = useState('');
  const [userData, setUserData] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [pets, setPets] = useState([]);
  const [updatedAdoption, setUpdatedAdoption] = useState(null);

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const firestore = getFirestore();
        const adoptsRef = collection(firestore, 'adopts');
        const q = query(adoptsRef, where('pet.userId', '==', business?.uid));
        const querySnapshot = await getDocs(q);
        const adoptionList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const datetime = data.datetime.toDate(); // Converter para objeto Date
          return {
            id: doc.id,
            ...data,
            datetime: datetime.toString(), // Converter para string legível
          };
        });
        setAdoptions(adoptionList);
      } catch (error) {
        console.error('Erro ao buscar adoções:', error);
      }
    };

    if (business) {
      fetchAdoptions();
    }
  }, [business]);

  const handleEditAdoption = (adoption) => {
    setEditModalOpen(true);
    setSearchCPF(''); // Limpar o campo de busca por CPF
    setUserData(null); // Limpar os dados do usuário ao abrir a janela de edição
    setSelectedPet(null); // Limpar o pet selecionado ao abrir a janela de edição
    setSelectedAdoption(adoption);
  };

  const handleSearchUser = async () => {
    try {
      const firestore = getFirestore();
      const usersRef = collection(firestore, 'users');
      const q = query(usersRef, where('cpf', '==', searchCPF));
      const querySnapshot = await getDocs(q);
      const user = querySnapshot.docs[0]?.data();
      setUserData(user); // Corrigir o nome do estado para setUserData(user)
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  };

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

  useEffect(() => {
    if (business && Object.keys(business).length > 0) {
      fetchPets();
    }
  }, [business]);

  const handleUpdateAdoption = () => {
    if (userData && selectedPet) {
      const updatedData = {
        ...selectedAdoption, // Mantém os dados existentes da adoção
        user: userData, // Atualiza os dados do usuário
        pet: selectedPet, // Atualiza os dados do pet
        datetime: new Date(), // Atualiza a data/hora para o momento atual
      };
      updateAdoptionToFirestore(updatedData);
    }
  };

  const updateAdoptionToFirestore = async (updatedAdoption) => {
    try {
      const firestore = getFirestore();
      const adoptionRef = doc(firestore, 'adopts', updatedAdoption.id);
      await updateDoc(adoptionRef, updatedAdoption);
      setUpdatedAdoption(updatedAdoption);
    } catch (error) {
      console.error('Erro ao atualizar adoção:', error);
    }
  };

  const updateAdoptionsList = () => {
    if (updatedAdoption) {
      setEditModalOpen(false); // Fecha a janela de edição
      setAdoptions((prevAdoptions) =>
        prevAdoptions.map((adoption) => (adoption.id === updatedAdoption.id ? updatedAdoption : adoption))
      ); // Atualiza a lista de adoções refletindo as mudanças
    }
  };

  useEffect(() => {
    updateAdoptionsList();
  }, [updatedAdoption]);

  const formatDate = (date) => {
    return date.toLocaleString();
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">Adoções Registradas</h1>
      {adoptions.length > 0 ? (
        <div className="row mt-5">
          {adoptions.map((adoption) => (
            <div className="col-sm-6 mb-4" key={adoption.id}>
              <div className="card border-dark h-100">
                <div className="card-body">
                  <h5 className="card-title">Usuário: {adoption.user.nome}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Data e Hora: {formatDate(adoption.datetime)}</h6>
                  <p className="card-text">Pet Adotado: {adoption.pet.nomePet}</p>
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => handleEditAdoption(adoption)}
                  >
                    Editar dados da adoção
                  </button>
                </div>
              </div>
            </div>
          ))}
          <a href="/SignUpAdopt" className="align-items-center justify-content-center">
            <button type="button" className="btn btn-outline-dark btn btn-success">
              Registrar nova adoção
              <span>
                +
              </span>
            </button>
          </a>
        </div>
      ) : (
        <>
          <a href="/SignUpAdopt" className="align-items-center justify-content-center">
            <button type="button" className="btn btn-outline-dark btn btn-success">
              Registrar nova adoção
              <span>
                +
              </span>
            </button>
          </a>
          <p className="text-center mt-5">Nenhuma adoção registrada</p>
        </>
      )}

      {/* Aba de edição */}
      {isEditModalOpen && selectedAdoption && (
        <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabIndex={-1} role="dialog" id="modalSignin">
          <div className="modal-dialog" role="document">
            <div className="modal-content rounded-4 shadow">
              <div className="modal-header p-5 pb-4 border-bottom-0">
                <h1 className="fw-bold mb-0 fs-2">Editar Adoção</h1>
              </div>
              <div className="modal-body">
                {/* Campo de busca por CPF */}
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Digite o CPF do usuário"
                    value={searchCPF}
                    onChange={(e) => setSearchCPF(e.target.value)}
                  />
                  <button className="btn btn-outline-secondary" type="button" onClick={handleSearchUser}>
                    Buscar Usuário
                  </button>
                </div>

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
                <button className="btn btn-primary" onClick={handleUpdateAdoption}>
                  Atualizar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Adopt;