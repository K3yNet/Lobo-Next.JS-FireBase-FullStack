import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function List() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const firestore = getFirestore();
        const petsRef = collection(firestore, 'pets');
        const querySnapshot = await getDocs(petsRef);
        const petList = querySnapshot.docs.map((doc) => doc.data());
        setPets(petList);
      } catch (error) {
        console.error('Erro ao buscar os pets:', error);
      }
    };

    fetchPets();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">Pets Registrados</h2>
      <div className="row">
        {pets.map((pet) => (
          <div className="col-sm-6 mb-4" key={pet.id}>
            <div className="card border-dark h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <img src="petIconSmall.png" className="card-img img-radius w-25 me-3" alt="petIcon" />
                  <div>
                    <h5 className="card-title">{pet.nomePet}</h5>
                    <p className="card-text">Espécie: {pet.especiePet}</p>
                    <p className="card-text">Raça do pet: {pet.racePet}</p>
                    <p className="card-text">Instituição responsável: {pet.businessName}</p>
                  </div>
                </div>
                {/* Renderizar outros dados do pet aqui */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
