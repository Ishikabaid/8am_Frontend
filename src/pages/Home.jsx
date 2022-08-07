import { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import heroImg from "../assets/images/hero.png";
import "../styles/hero-section.css";
import { Link } from "react-router-dom";
import Category from "../components/UI/category/Category.jsx";
import "../styles/home.css";

import featureImg01 from "../assets/images/service-01.png";
import featureImg02 from "../assets/images/service-02.png";
import featureImg03 from "../assets/images/service-03.png";

// import products from "../assets/fake-data/products.js";

import foodCategoryImg01 from "../assets/images/hamburger.png";
import foodCategoryImg02 from "../assets/images/pizza.png";
import foodCategoryImg03 from "../assets/images/bread.png";

import ProductCard from "../components/UI/product-card/ProductCard.jsx";

import whyImg from "../assets/images/location.png";

import networkImg from "../assets/images/network.png";

import TestimonialSlider from "../components/UI/slider/TestimonialSlider.jsx";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurUser } from "../store/auth.slice.js";

const featureData = [
  {
    title: "Quick Delivery",
    imgUrl: featureImg01,
    desc: "Super fast and contactless delivery at your doorstep",
  },

  {
    title: "Super Dine In",
    imgUrl: featureImg02,
    desc: "Enjoy with your friends and family with the perfect ambience and top quality food",
  },
  {
    title: "Easy Pick Up",
    imgUrl: featureImg03,
    desc: "Quickly grab your food while on your way to office",
  },
];

const Home = () => {
  const [category, setCategory] = useState("ALL");
  const [allProducts, setAllProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const user = useSelector((state) => selectCurUser(state));

  useEffect(() => {
    if (allProducts.length === 0) fetchProducts()
    if (allProducts) {
      if (category === "ALL") {
        setProduct(allProducts);
      }

      if (category === "BURGER") {
        const filteredProducts = allProducts.filter(
          (item) => item.category === "Burger"
        );

        setProduct(filteredProducts);
      }

      if (category === "PIZZA") {
        const filteredProducts = allProducts.filter(
          (item) => item.category === "Pizza"
        );

        setProduct(filteredProducts);
      }

      if (category === "BREAD") {
        const filteredProducts = allProducts.filter(
          (item) => item.category === "Bread"
        );

        setProduct(filteredProducts);
      }
    }
  }, [category, allProducts]);

  const fetchProducts = async () => {
    const res = await axios.get("/api/items");
    if (res.error) {
      console.log(res.error);
      return;
    }
    console.log(res.data);
    setAllProducts(res.data)
  };

  return (
    <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero-content  ">
                <h1 className="mb-4 hero-title">
                  <span className="hero-title-1">HUNGRY?</span><br />
                  <span className="hero-title-2">Welcome to <span className="eam-name">8AM</span></span>
                </h1>

                <p>
                  Place an order or come over to enjoy the best food in the town
                </p>

                <div className="hero-btns d-flex align-items-center gap-5 mt-4">
                  <a href="/foods" className="order-btn d-flex align-items-center justify-content-between">
                    Order Now
                  </a>
                </div>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero-img">
                <img src={heroImg} alt="hero-img" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Category />
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="feature-title">What we <span>Offer?</span></h2>
              <p className="mb-1 mt-4 feature-text">
                We serve and deliver fresh, delicious food prepared with the finest local ingredients.<br />
                Relax, indulge and enjoy our mouth-watering dishes within beautiful yet comfortable surroundings or order them at your home.
              </p>
            </Col>

            {featureData.map((item, index) => (
              <Col lg="4" md="6" sm="6" key={index} className="mt-5">
                <div className="feature-item text-center px-5 py-3">
                  <img
                    src={item.imgUrl}
                    alt="feature-img"
                    className="w-25 mb-3"
                  />
                  <h5 className=" fw-bold mb-3">{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2>Popular Foods</h2>
            </Col>

            <Col lg="12">
              <div className="food-category d-flex align-items-center justify-content-center gap-4">
                <button
                  className={`all-btn  ${category === "ALL" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("ALL")}
                >
                  All
                </button>
                <button
                  className={`d-flex align-items-center gap-2 ${category === "BURGER" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("BURGER")}
                >
                  <img src={foodCategoryImg01} alt="" />
                  Burger
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${category === "PIZZA" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("PIZZA")}
                >
                  <img src={foodCategoryImg02} alt="" />
                  Pizza
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${category === "BREAD" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("BREAD")}
                >
                  <img src={foodCategoryImg03} alt="" />
                  Bread
                </button>
              </div>
            </Col>

            {product && product.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="why-choose-us">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <img src={whyImg} alt="why-us" className="why-img w-100" />
            </Col>

            <Col lg="6" md="6">
              <div className="why-eam">
                <h2 className="eam-title mb-4">
                  Why <span>8 AM?</span>
                </h2>
                <p className="eam-desc">
                  Whether you are planning a special night out for a group of friends or a morning meet-up with family,
                  a business breakfast, or a romantic dinner for two, we have something special for every occasion.
                </p>

                <ListGroup className="mt-4">
                  <ListGroupItem className="border-0 ps-0">
                    <p className=" choose-us-title d-flex align-items-center gap-2 ">
                      <i class="ri-checkbox-circle-line"></i> Fresh and tasty food
                    </p>
                    <p className="choose-us-desc">
                      Food for every mood<br />
                      Our flavours blends with your emotions perfectly.
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose-us-title d-flex align-items-center gap-2 ">
                      <i class="ri-checkbox-circle-line"></i> Quality support
                    </p>
                    <p className="choose-us-desc">
                      Friendly and polite staff making your life easy and top rated chefs.
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose-us-title d-flex align-items-center gap-2 ">
                      <i class="ri-checkbox-circle-line"></i>Order from any location
                    </p>
                    <p className="choose-us-desc">
                      We take orders across the town so nobody misses out our delicious food.
                    </p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="testimonial ">
                <h2 className="testimonial-title mb-4">
                  What our <span>customers</span> are saying
                </h2>
                <p className="testimonial-desc">
                  We truly believe in customer's satisfaction so feedbacks play a very important
                  role for us in maintaining and providing top quality services.
                </p>
                <TestimonialSlider />
              </div>
            </Col>

            <Col lg="6" md="6">
              <img src={networkImg} alt="testimonial-img" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
