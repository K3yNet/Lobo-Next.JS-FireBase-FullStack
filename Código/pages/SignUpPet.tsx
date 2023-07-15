import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const RegisterPet = () => {
  const [user] = useAuthState(getAuth());
  const [successMessage, setSuccessMessage] = useState('');

  const validationSchema = Yup.object({
    nomePet: Yup.string().required('O nome do pet é obrigatório'),
    especiePet: Yup.string().required('A espécie do pet é obrigatória'),
    racePet: Yup.string().required('A raça do pet é obrigatória'),
    idadePet: Yup.number().required('Apenas numeros são permitidos'),
    pesoPet: Yup.number().required('Apenas numeros são permitidos'),
  });

  const formik = useFormik({
    initialValues: {
      nomePet: '',
      especiePet: '',
      racePet: '',
      idadePet: '',
      pesoPet: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const firestore = getFirestore();
        const petsRef = collection(firestore, 'pets');

        const petData = {
          ...values,
          userId: user.uid,
        };

        await addDoc(petsRef, petData);

        formik.resetForm();
        setSuccessMessage('Pet registrado com sucesso!');
      } catch (error) {
        console.error('Erro ao registrar o pet:', error);
      }
    },
  });

  return (
    <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabIndex={-1} role="dialog" id="modalSignin">
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-4 shadow">

          <div className="modal-header p-5 pb-4 border-bottom-0">
            <h1 className="fw-bold mb-0 fs-2">Registre seu pet!</h1>
          </div>

          <div className="modal-body p-5 pt-0">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="nomePet"
                  name="nomePet"
                  placeholder="Nome do pet"
                  {...formik.getFieldProps('nomePet')}
                />
                <label htmlFor="nomePet">Nome do pet</label>
                {formik.touched.nomePet && formik.errors.nomePet ? (
                  <div className="error">{formik.errors.nomePet}</div>
                ) : null}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="especiePet"
                  name="especiePet"
                  placeholder="Espécie do pet"
                  {...formik.getFieldProps('especiePet')}
                />
                <label htmlFor="especiePet">Espécie do pet</label>
                {formik.touched.especiePet && formik.errors.especiePet ? (
                  <div className="error">{formik.errors.especiePet}</div>
                ) : null}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="racePet"
                  name="racePet"
                  placeholder="Raça do pet"
                  {...formik.getFieldProps('racePet')}
                />
                <label htmlFor="racePet">Raça do pet</label>
                {formik.touched.racePet && formik.errors.racePet ? (
                  <div className="error">{formik.errors.racePet}</div>
                ) : null}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control rounded-3"
                  id="idadePet"
                  name="idadePet"
                  placeholder="Idade do pet"
                  {...formik.getFieldProps('idadePet')}
                />
                <label htmlFor="idadePet">Idade do pet</label>
                {formik.touched.idadePet && formik.errors.idadePet ? (
                  <div className="error">{formik.errors.idadePet}</div>
                ) : null}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control rounded-3"
                  id="pesoPet"
                  name="pesoPet"
                  placeholder="Peso do pet"
                  {...formik.getFieldProps('pesoPet')}
                />
                <label htmlFor="pesoPet">Peso do pet</label>
                {formik.touched.pesoPet && formik.errors.pesoPet ? (
                  <div className="error">{formik.errors.pesoPet}</div>
                ) : null}
              </div>

              <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Registrar</button>

              {successMessage && <div className="success">{successMessage}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPet;