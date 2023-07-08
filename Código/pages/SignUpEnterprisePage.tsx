import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useUserController } from '../controllers/RegistrationEnterpriseController';
import { User, validationSchema } from '../models/BusinessModel';

function RegistrationForm() {
  const {
    handleSubmit,
    showConfirmationModal,
    setShowConfirmationModal,
    showConfirmationModal_cnpj,
    setShowConfirmationModal_cnpj,
  } = useUserController();

  return (
    <>
      <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabIndex={-1} role="dialog" id="modalSignin">
        <div className="modal-dialog" role="document">
          <div className="modal-content rounded-4 shadow">

            <div className="modal-header p-5 pb-4 border-bottom-0">
              <h1 className="fw-bold mb-0 fs-2">Registre sua instituição!</h1>
            </div>

            <div className="modal-body p-5 pt-0">
              <Formik
                initialValues={{
                  nomeInst: '',
                  nomeAdm: '',
                  email: '',
                  cnpj: '',
                  phone: '',
                  addrs: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="form-floating mb-3">
                    <Field type="text" className="form-control rounded-3" id="nomeInst" name="nomeInst" placeholder="O nome da instituição" />
                    <label htmlFor="nome">Nome da instituição</label>
                    <ErrorMessage name="nomeInst" component="div" className="error" />
                  </div>

                  <div className="form-floating mb-3">
                    <Field type="text" className="form-control rounded-3" id="nomeAdm" name="nomeAdm" placeholder="O nome do administrador" />
                    <label htmlFor="nome">Nome do responsável</label>
                    <ErrorMessage name="nomeAdm" component="div" className="error" />
                  </div>

                  <div className="form-floating mb-3">
                    <Field type="email" className="form-control rounded-3" id="email" name="email" placeholder="Seu email" />
                    <label htmlFor="nome">Email</label>
                    <ErrorMessage name="email" component="div" className="error" />
                  </div>

                  <div className="form-floating mb-3">
                    <Field type="text" className="form-control rounded-3" id="cnpj" name="cnpj" placeholder="CNPJ da instituição" />
                    <label htmlFor="cnpj">CNPJ</label>
                    <ErrorMessage name="cnpj" component="div" className="error" />
                  </div>

                  <div className="form-floating mb-3">
                    <Field type="text" className="form-control rounded-3" id="phone" name="phone" placeholder="Seu telefone para contato" />
                    <label htmlFor="phone">Numero de Telefone</label>
                    <ErrorMessage name="phone" component="div" className="error" />
                  </div>

                  <div className="form-floating mb-3">
                    <Field type="text" className="form-control rounded-3" id="addrs" name="addrs" placeholder="O endereço da instituição" />
                    <label htmlFor="addrs">Endereço</label>
                    <ErrorMessage name="addrs" component="div" className="error" />
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
      {showConfirmationModal_cnpj && (
        <div className="modal modal-sheet position-fixed d-block bg-body-secondary p-4">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content rounded-3 shadow">
              <div className="modal-body p-4 text-center">
                <h5 className="mb-2">Erro de registro.</h5>
                <p className="mb-0">Este CNPJ já está registrado.</p>
                <small className="text-body-secondary"><a href="#">Esqueci minha senha</a></small>
              </div>
              <div className="modal-footer flex-nowrap p-0 justify-content-center">
                <button type="button" className="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end" onClick={() => setShowConfirmationModal_cnpj(false)}>Ok</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RegistrationForm;