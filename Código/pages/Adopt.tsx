import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useProfileController as useBusinessController } from '../controllers/ProfileBusinessController';

function Adopt() {
  const { userData: business } = useBusinessController();
  const [adoptions, setAdoptions] = useState([]);

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const firestore = getFirestore();
        const adoptsRef = collection(firestore, 'adopts');
        const q = query(adoptsRef, where(`pet.userId`, '==', business?.uid));
        const querySnapshot = await getDocs(q);
        const adoptionList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const datetime = data.datetime.toDate(); // Converter para objeto Date
          return {
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
                  <h6 className="card-subtitle mb-2 text-muted">Data e Hora: {adoption.datetime}</h6>
                  <p className="card-text">Pet Adotado: {adoption.pet.nomePet}</p>
                  {/* Outras informações sobre a adoção */}
                </div>
              </div>
            </div>
          ))}
          <div className="align-items-center">
            <a href="/SignUpAdopt" className="align-items-center justify-content-center">
              <button type="button" className="btn btn-outline-dark btn btn-success">
                Registrar nova adoção
                <span>
                  +
                </span>
              </button>
            </a>
          </div>
        </div>
      ) : (
        <p className="text-center mt-5">Nenhuma adoção registrada</p>
      )}
    </div>
  );
}

export default Adopt;