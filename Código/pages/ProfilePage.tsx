import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useProfileController as useUserController } from '../controllers/ProfileController';
import { useProfileController as useBusinessController } from '../controllers/ProfileBusinessController';

function ProfilePage() {
  const { isLoggedIn, userData: user } = useUserController();
  const { userData: business } = useBusinessController();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      const firestore = getFirestore();
      const petsRef = collection(firestore, 'pets');
      const q = query(petsRef, where('userId', '==', business?.uid));
      const querySnapshot = await getDocs(q);
      const petList = querySnapshot.docs.map((doc) => doc.data());
      setPets(petList);
    };

    if (business) {
      fetchPets();
    }
  }, [business]);

  if (!isLoggedIn) {
    return <h1 className="text-center">Você não está logado</h1>;
  }

  if (user) {
    return (
      <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <div className="container">
          <div className="row">
            {user ? (
              <>
                <div className="col-sm-4 bg-c-lite-green user-profile">
                  <div className="card-block text-center">
                    <div className="m-b-25">
                      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" className="img-radius" alt="User-Profile-Image" />
                    </div>
                    <h4 className="card-title">{user.nome}</h4>
                    <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="card-block">
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Contato</h6>
                    <div className="row mb-5">
                      <div className="col-sm-6">
                        <p className="f-w-600">Email para contato / Login</p>
                        <p className="card-text text-muted f-w-400">{user.email}</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Telefone para contato</p>
                        <p className="card-text text-muted f-w-400">{user.phone}</p>
                      </div>
                    </div>
                    <h6 className="p-b-5 b-b-default f-w-600">Informações</h6>
                    <div className="row">
                      <div className="col-sm-6 mb-5">
                        <p className="m-b-10 f-w-600">Cidade</p>
                        <p className="card-text text-muted f-w-400">{user.cidade}</p>
                      </div>
                      <div className="col-sm-6 mb-5">
                        <p className="m-b-10 f-w-600">Data de nascimento</p>
                        <p className="card-text text-muted f-w-400">{user.birth}</p>
                      </div>
                      <div className="col-sm-6 mb-5">
                        <p className="m-b-10 f-w-600">CPF</p>
                        <p className="card-text text-muted f-w-400">{user.cpf}</p>
                      </div>
                    </div>
                    <div className='m-4'>
                      <div className="d-flex justify-content-center align-items-center">
                        <a href="/EditProfile" className="align-items-center justify-content-center">
                          <button type="button" className="btn btn-outline-dark">
                            Editar Perfil
                            <span className="material-symbols-outlined">
                              edit
                            </span>
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p>Carregando dados do usuário...</p>
            )}
          </div>
        </div>
      </>
    );
  }

  if (business) {
    return (
      <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <div className="container">
          <div className="row">
            {business ? (
              <>
                <div className="col-sm-4 bg-c-lite-green user-profile">
                  <div className="card-block text-center">
                    <div className="m-b-25">
                      <img src="abrigo.jpg" className="img-radius w-100" alt="User-Profile-Image" />
                    </div>
                    <h4 className="card-title">{business.nomeInst}</h4>
                    <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="card-block">
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Informações</h6>
                    <div className="row mb-5">
                      <div className="col-sm-6">
                        <p className="f-w-600">Nome do responsável</p>
                        <p className="card-text text-muted f-w-400">{business.nomeAdm}</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Telefone para contato</p>
                        <p className="card-text text-muted f-w-400">{business.phone}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 mb-5">
                        <p className="m-b-10 f-w-600">Endereço</p>
                        <p className="card-text text-muted f-w-400">{business.addrs}</p>
                      </div>
                      <div className="col-sm-6 mb-5">
                        <p className="m-b-10 f-w-600">Email para contato</p>
                        <p className="card-text text-muted f-w-400">{business.email}</p>
                      </div>
                      {pets.length > 0 && (
                        <div className="col-sm-12 mt-5">
                          <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Pets Registrados</h6>
                          <div className="row">
                            {pets.map((pet) => (
                              <div className="col-sm-6 mb-4" key={pet.id}>
                                <div className="card border-dark h-100">
                                  <div className="row no-gutters">
                                    <div className="col-md-4">
                                      <img src="petIconSmall.png" className="card-img" alt="petIcon" />
                                    </div>
                                    <div className="col-md-8">
                                      <div className="card-body">
                                        <h5 className="card-title mb-2">{pet.nomePet}</h5>
                                        <p className="card-text mb-2"><strong>Espécie:</strong> {pet.especiePet}</p>
                                        <p className="card-text mb-2"><strong>Idade:</strong> {pet.idadePet} Anos</p>
                                        <p className="card-text mb-2"><strong>Peso:</strong> {pet.pesoPet} Kg</p>
                                        <p className="card-text mb-2"><strong>Raça:</strong> {pet.racePet}</p>
                                        <a href="#" className="btn btn-outline-dark">
                                          Editar Informações do Pet <i className="material-icons-outlined"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className='m-5'>
                      <div className="d-flex justify-content-center align-items-center gap-5">
                        <a href="/EditBusinessProfile" className="align-items-center justify-content-center">
                          <button type="button" className="btn btn-outline-dark">
                            Editar Perfil
                            <span className="material-symbols-outlined">
                              edit
                            </span>
                          </button>
                        </a>
                        <a href="/SignUpPet" className="align-items-center justify-content-center">
                          <button type="button" className="btn btn-outline-dark btn btn-success">
                            Cadastrar Pet
                            <span>
                              +
                            </span>
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p>Carregando dados do usuário...</p>
            )}
          </div>
        </div>
      </>
    );
  }

  return null;
}

export default ProfilePage;
