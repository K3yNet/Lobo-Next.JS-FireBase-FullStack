import React, { useContext } from 'react';
import { AuthContext } from '../services/AuthContext';
import { auth } from '../services/firebaseConfig';

function Navbar() {
	const currentUser = useContext(AuthContext);

	const handleSignOut = async () => {
		try {
			await auth.signOut();
		} catch (error) {
			console.log('Erro ao deslogar:', error);
		}
	};

	const renderAuthButtons = () => {
		if (currentUser) {
			// Usuário logado
			return (
				<div className="text-end">
					<a href="/ProfilePage">
						<button type="button" className="btn btn-outline-dark me-2">
							Ver Perfil
						</button>
					</a>
					<button type="button" className="btn btn-outline-dark me-2" onClick={handleSignOut}>
						Sair
					</button>
					<a href="#">
						<button type="button" className="btn btn-outline-dark ms-2">
							Donate
						</button>
					</a>
				</div>
			);
		} else {
			// Usuário não logado
			return (
				<div className="text-end">
					<a href="/LoginPage">
						<button type="button" className="btn btn-outline-dark me-2">
							Login
						</button>
					</a>
					<a href="/SignUpPage">
						<button type="button" className="btn btn-warning border-dark">
							Sign-up
						</button>
					</a>
					<a href="#">
						<button type="button" className="btn btn-outline-dark ms-2">
							Donate
						</button>
					</a>
				</div>
			);
		}
	};

	return (
		<header className="p-3 bg-light border-bottom">
			<div className="container">
				<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
					<a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-black text-decoration-none">
						<img src="logoClean.png" alt="logoClean" className="bi me-2" width="80" height="80" role="img" />
					</a>

					<ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
						<li>
							<a href="/" className="nav-link px-2 text-secondary">
								Home
							</a>
						</li>
						<li>
							<a href="/PetList" className="nav-link px-2 text-dark">
								Ver pets
							</a>
						</li>
						<li>
							<a href="/BusinessList" className="nav-link px-2 text-dark">
								Ver Instituições
							</a>
						</li>
						<li>
							<a href="/SignUpEnterprisePage" className="nav-link px-2 text-dark">
								Junte-se à nós
							</a>
						</li>
						<li>
							<a href="#" className="nav-link px-2 text-dark">
								About
							</a>
						</li>
					</ul>

					{renderAuthButtons()}

				</div>
			</div>
		</header>
	);
}

export default Navbar;