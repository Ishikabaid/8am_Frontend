import Slider from "react-slick";
import ava01 from "../../../assets/images/ava-1.jpg";
import ava02 from "../../../assets/images/ava-2.jpg";
import ava03 from "../../../assets/images/ava-3.jpg";
import "../../../styles/slider.css";

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <p className="review-text">
          "Tried the ready to eat taco on a whim today. 
           First bite in I knew I had to order a few more for the weekend. Outstanding!!!"
        </p>
        <div className=" slider-content d-flex align-items-center gap-3 ">
          <img src={ava03} alt="avatar" className=" rounded" />
          <h6>Sarah Rai</h6>
        </div>
      </div>
      <div>
        <p className="review-text">
          "Just fell in love with the cupcakes! Can't wait to try more flavours!! Thank you!!!"
        </p>
        <div className="slider-content d-flex align-items-center gap-3 ">
          <img src={ava01} alt="avatar" className=" rounded" />
          <h6>Rohit Bakshi</h6>
        </div>
      </div>
      <div>
        <p className="review-text">
          "Thank you for your food. It's so fresh and delicious and it takes the work and guess-work out of my busy life when it comes to eating. 
          8AM is AWESOME! You have a customer for life!"
        </p>
        <div className="slider-content d-flex align-items-center gap-3 ">
          <img src={ava02} alt="avatar" className=" rounded" />
          <h6>Prachi Kharbanda</h6>
        </div>
      </div>
    </Slider>
  );
};

export default TestimonialSlider;
