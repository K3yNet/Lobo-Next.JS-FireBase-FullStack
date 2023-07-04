// views/ProfilePage.tsx
import { useEffect } from 'react';
import { UserData } from '../models/UserProfile';
import { useProfileController } from '../controllers/ProfileController';

function ProfilePage() {
  const { isLoggedIn, userData } = useProfileController();

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <div className="container">
        {isLoggedIn ? (
          <div className="row">
            {userData ? (
              <>
                <div className="col-sm-4 bg-c-lite-green user-profile">
                  <div className="card-block text-center">
                    <div className="m-b-25">
                      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" className="img-radius" alt="User-Profile-Image" />
                    </div>
                    <h4 className="card-title">{userData.nome}</h4>
                    <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="card-block">
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Contato</h6>
                    <div className="row mb-5">
                      <div className="col-sm-6">
                        <p className="f-w-600">Email para contato</p>
                        <p className="card-text text-muted f-w-400">{userData.email}</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Telefone para contato</p>
                        <p className="card-text text-muted f-w-400">{userData.phone}</p>
                      </div>
                    </div>
                    <h6 className="p-b-5 b-b-default f-w-600">Informações</h6>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Cidade</p>
                        <p className="card-text text-muted f-w-400">{userData.cidade}</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Avaliações</p>
                        <p className="card-text text-muted f-w-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dicta veniam animi facere ipsum! Sed, totam? Nostrum nulla error alias itaque aliquid suscipit, magnam culpa quisquam officia est corrupti et.</p>
                      </div>
                      {/* Adicione outras informações do perfil aqui */}
                    </div>
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Redes Sociais</h6>
                    <div className="row mb-5">
                      <div className="col-sm-6">
                        <a href="#" className="m-b-10 f-w-600 ">Instagram</a>
                      </div>
                      <div className="col-sm-6">
                        <a href="#" className="m-b-10 f-w-600">Facebook</a>
                      </div>
                    </div>
                    <a href="/EditProfile" className='align-items-center justify-content-center'>
                      <button type="button" className="btn btn-outline-dark ms-2">
                        Editar Perfil
                        <span className="material-symbols-outlined">
                          edit
                        </span>
                      </button>
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <p>Carregando dados do usuário...</p>
            )}
          </div>
        ) : (
          <h1 className="text-center">Você não está logado</h1>
        )}
      </div>
    </>
  );
}

export default ProfilePage;