import { Carousel } from 'react-bootstrap';

function CarouselComponent() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="banner01.jpg"
          alt="banner01"
        />
        <Carousel.Caption>
          <p><a className="btn btn-lg btn-danger" href="#">Seja premium!</a></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="banner00.jpg"
          alt="banner00"
        />
        <Carousel.Caption>
          <p><a className="btn btn-lg btn-primary" href="#">Saiba mais</a></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="banner02.jpg"
          alt="banner02"
        />
        <Carousel.Caption>
          <p><a href="/donate" className="btn btn-lg btn-warning">Ajude agora!</a></p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
