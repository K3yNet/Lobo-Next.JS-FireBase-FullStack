import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function List() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const firestore = getFirestore();
        const businessesRef = collection(firestore, 'business');
        const querySnapshot = await getDocs(businessesRef);
        const businessList = querySnapshot.docs.map((doc) => doc.data());
        setBusinesses(businessList);
      } catch (error) {
        console.error('Erro ao buscar as instituições:', error);
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">Instituições Registradas</h2>
      <div className="row">
        {businesses.map((business) => (
          <div className="col-sm-6 mb-4" key={business.uid}>
            <div className="card border-dark h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <img src="abrigo.jpg" className="card-img img-radius w-25 me-3" alt="institutionIcon" />
                  <div>
                    <h5 className="card-title">{business.nomeInst}</h5>
                    <p className="card-text">Endereço: {business.addrs}</p>
                    <p className="card-text">Email: {business.email}</p>
                    <p className="card-text">Telefone: {business.phone}</p>
                    <p className="card-text">Responsável: {business.nomeAdm}</p>
                  </div>
                </div>
                {/* Renderizar outros dados da instituição aqui */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;