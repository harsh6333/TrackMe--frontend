import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import laptopnotes from "../../public/images/laptop-notes.png";
import laptoptodo from "../../public/images/laptop-todo.png";
import laptoptodo1 from "../../public/images/laptop-todo1.png";
import laptoptodo2 from "../../public/images/laptop-todo2.png";
import laptopweather from "../../public/images/laptop-weather.png";
import mobilenotes from "../../public/images/mobile-notes.png";
import mobiletodo from "../../public/images/mobile-todo.png";
import tabmob from "../../public/images/tab-mob-tasks-1.png";
import "../css/home.css";
function HomeSlider() {
  return (
    <Carousel fade className="carousel carusel">
      <Carousel.Item interval={1000}>
        <img src={laptoptodo} alt="" />
      </Carousel.Item>
      <Carousel.Item interval={1000} className="carousel-item">
        <img src={laptoptodo2} alt="" />
      </Carousel.Item>
      <Carousel.Item interval={1000} className="carousel-item">
        <img src={laptoptodo1} alt="" />
      </Carousel.Item>
      <Carousel.Item interval={1000} className="carousel-item">
        <img src={laptopnotes} alt="" />
      </Carousel.Item>
      <Carousel.Item interval={1000} className="carousel-item">
        <img src={laptopweather} alt="" />
      </Carousel.Item>
      <Carousel.Item interval={1000} className="carousel-item">
        <img src={tabmob} alt="" />
      </Carousel.Item>
      <Carousel.Item interval={1000} className="carousel-item">
        <img src={mobilenotes} alt="" />
      </Carousel.Item>
      <Carousel.Item interval={1000} className="carousel-item">
        <img src={mobiletodo} alt="" />
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeSlider