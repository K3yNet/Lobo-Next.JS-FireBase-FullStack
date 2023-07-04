import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useUserController } from '../controllers/RegistrationController';
import { User, validationSchema } from '../models/UserModel';

function RegistrationForm() {
  const {
    handleSubmit,
    showConfirmationModal,
    setShowConfirmationModal,
    showConfirmationModal_CPF,
    setShowConfirmationModal_CPF,
  } = useUserController();

  return (
    <>
      <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabIndex={-1} role="dialog" id="modalSignin">
        <div className="modal-dialog" role="document">
          <div className="modal-content rounded-4 shadow">

            <div className="modal-header p-5 pb-4 border-bottom-0">
              <h1 className="fw-bold mb-0 fs-2">Registre-se Agora!</h1>
            </div>

            <div className="modal-body p-5 pt-0">
              <Formik
                initialValues={{
                  nome: '',
                  email: '',
                  cpf: '',
                  phone: '',
                  birth: '',
                  cidade: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="form-floating mb-3">
                    <Field type="text" className="form-control rounded-3" id="nome" name="nome" placeholder="Seu nome" />
                    <label htmlFor="nome">Nome</label>
                    <ErrorMessage name="nome" component="div" className="error" />
                  </div>

                  <div className="form-floating mb-3">
                    <Field type="email" className="form-control rounded-3" id="email" name="email" placeholder="Seu email" />
                    <label htmlFor="nome">Email</label>
                    <ErrorMessage name="email" component="div" className="error" />
                  </div>

                  <div className="form-floating mb-3">
                    <Field type="text" className="form-control rounded-3" id="cpf" name="cpf" placeholder="Seu CPF" />
                    <label htmlFor="cpf">CPF</label>
                    <ErrorMessage name="cpf" component="div" className="error" />
                  </div>

                  <div className="form-floating mb-3">
                    <Field type="text" className="form-control rounded-3" id="phone" name="phone" placeholder="Seu telefone para contato" />
                    <label htmlFor="phone">Numero de Telefone</label>
                    <ErrorMessage name="phone" component="div" className="error" />
                  </div>

                  <div className="form-floating mb-3">
                    <Field type="date" className="form-control rounded-3" id="birth" name="birth" placeholder="Sua data de nascimento" />
                    <label htmlFor="birth">Data de nascimento</label>
                    <ErrorMessage name="birth" component="div" className="error" />
                  </div>

                  <div className="form-floating mb-3">
                    <Field type="text" className="form-control rounded-3" id="cidade" name="cidade" placeholder="Sua cidade" />
                    <label htmlFor="cidade">Cidade</label>
                    <ErrorMessage name="cidade" component="div" className="error" />
                  </div>

                  <div className="form-floating mb-3">
                    <Field type="password" className="form-control rounded-3" id="password" name="password" placeholder="Senha" />
                    <label htmlFor="password">Senha</label>
                    <ErrorMessage name="password" component="div" className="error" />
                  </div>

                  <div className="form-floating mb-3">
                    <Field type="password" className="form-control rounded-3" id="confirmPassword" name="confirmPassword" placeholder="Confirme sua senha" />
                    <label htmlFor="confirmPassword">Confirme sua senha</label>
                    <ErrorMessage name="confirmPassword" component="div" className="error" />
                  </div>

                  <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Registrar</button>

                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>

      {showConfirmationModal && (
        <div className="modal modal-sheet position-fixed d-block bg-body-secondary p-4">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content rounded-3 shadow">
              <div className="modal-body p-4 text-center">
                <h5 className="mb-2">Erro de registro.</h5>
                <p className="mb-0">Este email já está registrado.</p>
                <small className="text-body-secondary"><a href="#">Esqueci minha senha</a></small>
              </div>
              <div className="modal-footer flex-nowrap p-0 justify-content-center">
                <button type="button" className="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end" onClick={() => setShowConfirmationModal(false)}>Ok</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showConfirmationModal_CPF && (
        <div className="modal modal-sheet position-fixed d-block bg-body-secondary p-4">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content rounded-3 shadow">
              <div className="modal-body p-4 text-center">
                <h5 className="mb-2">Erro de registro.</h5>
                <p className="mb-0">Este CPF já está registrado.</p>
                <small className="text-body-secondary"><a href="#">Esqueci minha senha</a></small>
              </div>
              <div className="modal-footer flex-nowrap p-0 justify-content-center">
                <button type="button" className="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end" onClick={() => setShowConfirmationModal_CPF(false)}>Ok</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RegistrationForm;