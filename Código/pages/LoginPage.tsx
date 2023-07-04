// views/LoginPage.tsx
import { useEffect } from 'react';
import { useLoginController } from '../controllers/LoginController';

function LoginPage() {
  const {
    email,
    password,
    showConfirmationModal,
    setShowConfirmationModal,
    setEmail,
    setPassword,
    handleLogin
  } = useLoginController();

  return (
    <>
      <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabIndex={-1} role="dialog" id="modalLogin">
        <div className="modal-dialog" role="document">
          <div className="modal-content rounded-4 shadow">

            <div className="modal-header p-5 pb-4 border-bottom-0">
              <h1 className="fw-bold mb-0 fs-2">Faça seu login</h1>
            </div>

            <div className="modal-body p-5 pt-0">
              <form onSubmit={handleLogin}>

                <div className="form-floating mb-3">
                  <input type="email" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <label htmlFor="floatingInput">Email</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="password" className="form-control rounded-3" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <label htmlFor="floatingPassword">Senha</label>
                </div>

                <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Login</button>

                <hr className="my-2" />
                <small className="text-body-secondary">Não tem uma conta? <a href="/sign-up">Registrar agora</a></small>
                <br />
                <small className="text-body-secondary"><a href="#">Esqueci minha senha</a></small>
                <hr className="my-4" />
                <h2 className="fs-5 fw-bold mb-3">Conecte com uma conta de terceiros</h2>

                <button className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3" type="submit">
                  <svg className="bi me-1" width="16" height="16"><use xlinkHref="#google"></use></svg>
                  Login com Google
                </button>

                <button className="w-100 py-2 mb-2 btn btn-outline-primary rounded-3" type="submit">
                  <svg className="bi me-1" width="16" height="16"><use xlinkHref="#facebook"></use></svg>
                  Login com Facebook
                </button>

                <button className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3" type="submit">
                  <svg className="bi me-1" width="16" height="16"><use xlinkHref="#github"></use></svg>
                  Login com GitHub
                </button>

              </form>
            </div>
          </div>
        </div>

        {showConfirmationModal && (
          <div className="modal modal-sheet position-fixed d-block bg-body-secondary p-4">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content rounded-3 shadow">
                <div className="modal-body p-4 text-center">
                  <h5 className="mb-2">Erro de login.</h5>
                  <p className="mb-0">Verifique se o email e a senha estão corretos.</p>
                </div>
                <div className="modal-footer flex-nowrap p-0 justify-content-center">
                  <button type="button" className="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end" onClick={() => setShowConfirmationModal(false)}>Ok</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default LoginPage;