import type { NextPage } from 'next'
import CarouselComponent from '../components/Carousel'

const Home: NextPage = () => {
	return (
		<>

			<CarouselComponent />

			<div className="container marketing my-5">
				<div className="row justify-content-center text-center">
					
					<div className="col-lg-4">
						<img src="dog-icon.jpg" alt="dog-icon" className="bd-placeholder-img rounded-circle" width="140" height="140" />
						<h2 className="fw-normal">Cachorros</h2>
						<p>Dizem que o cachorro é o melhor amigo do homem... Acreditamos ser verdade, então venha adotar um!</p>
						<p><a className="btn btn-secondary" href="#">Ver mais »</a></p>
					</div>

					<div className="col-lg-4">
						<img src="cat-icon.jpg" alt="cat-icon" className="bd-placeholder-img rounded-circle" width="140" height="140" />
						<h2 className="fw-normal">Gatos</h2>
						<p>Um gato que você procura? Aqui você pode achar seu peludinho favorito!</p>
						<p><a className="btn btn-secondary" href="#">Ver mais »</a></p>
					</div>

					<div className="col-lg-4">
						<img src="others-icon.jpg" alt="others-icon" className="bd-placeholder-img rounded-circle" width="140" height="140" />
						<h2 className="fw-normal">Outros</h2>
						<p>Então você quer cuidar de animais mais exóticos... Sem problema, temos vários para você aqui!</p>
						<p><a className="btn btn-secondary" href="#">Ver mais »</a></p>
					</div>
					
				</div>
			</div>
		</>
	)
}

export default Home