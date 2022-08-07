import { useState, useEffect } from "react";

// import products from "../assets/fake-data/products";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";

import "../styles/product-details.css";

import ProductCard from "../components/UI/product-card/ProductCard";
import axios from "axios";
import { selectCurUser } from "../store/auth.slice";

const FoodDetails = () => {
  const user = useSelector((state) => { return selectCurUser(state) });
  const [tab, setTab] = useState("desc");
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [done, setDone] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const getProduct = async () => {
    const res = await axios.get(`https://backend-8am.herokuapp.com/api/items/${id}`)
    console.log("pr", res)
    setProduct(res.data)
  };

  const fetchProducts = async () => {
    const res = await axios.get("https://backend-8am.herokuapp.com/api/items");
    if (res.error) {
      console.log(res.error);
      return;
    }
    console.log(res.data);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
    getProduct();
  }, [id, done]);

  // const product = products.find((product) => product.id === id);
  const [previewImg, setPreviewImg] = useState(product.image01);
  const { title, price, category, desc, image01, review } = product;

  const relatedProduct = products.filter((item) => category === item.category);

  const addItem = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        price,
        image01,
      })
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await axios.patch(`https://backend-8am.herokuapp.com/api/review/${id}`, { enteredName, enteredEmail, reviewMsg });
    setDone(true);
    setEnteredName("");
    setEnteredEmail("");
    setReviewMsg("");
    console.log(enteredName, enteredEmail, reviewMsg);
  };

  useEffect(() => {
    setPreviewImg(product.image01);
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title="Product-details">
      <CommonSection title={title} />

      <section>
        <Container>
          <Row>
            <Col lg="2" md="2">
              <div className="product-images ">
                <div
                  className="img-item mb-3"
                  onClick={() => setPreviewImg(product.image01)}
                >
                  <img src={product.image01} alt="" className="w-50" />
                </div>
                <div
                  className="img-item mb-3"
                  onClick={() => setPreviewImg(product.image02)}
                >
                  <img src={product.image02} alt="" className="w-50" />
                </div>

                <div
                  className="img-item"
                  onClick={() => setPreviewImg(product.image03)}
                >
                  <img src={product.image03} alt="" className="w-50" />
                </div>
              </div>
            </Col>

            <Col lg="4" md="4">
              <div className="product-main-img">
                <img src={previewImg} alt="" className="w-100" />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single-product-content">
                <h2 className="product-title mb-3">{title}</h2>
                <p className="product-price">
                  {" "}
                  Price: <span>&#8377;{price}</span>
                </p>
                <p className="category mb-5">
                  Category: <span>{category}</span>
                </p>

                <button onClick={addItem} className="addToCart-btn">
                  Add to Cart
                </button>
              </div>
            </Col>

            <Col lg="12">
              <div className="tabs d-flex align-items-center gap-5 py-3">
                <h6
                  className={` ${tab === "desc" ? "tab-active" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                {
                  (Object.keys(user).length > 0) && (
                    <h6
                      className={` ${tab === "rev" ? "tab-active" : ""}`}
                      onClick={() => setTab("rev")}
                    >
                      Review
                    </h6>
                  )
                }
              </div>

              {tab === "desc" ? (
                <div className="tab-content">
                  <p>{desc}</p>
                </div>
              ) : (
                <div className="tab-form mb-3">
                  <div className="review pt-5">
                    <p className="user-name mb-0">Sarah Rai</p>
                    <p className="user-email">sarah@gmail.com</p>
                    <p className="feedback-text">Tastes Amazing!</p>
                  </div>

                  <div className="review">
                    <p className="user-name mb-0">Rohit Bakshi</p>
                    <p className="user-email">rohit@gmail.com</p>
                    <p className="feedback-text">Loved it!</p>
                  </div>

                  <div className="review">
                    <p className="user-name mb-0">Prachi Kharbanda</p>
                    <p className="user-email">prachi@gmail.com</p>
                    <p className="feedback-text">Super Delicious</p>
                  </div>

                  {
                    review && review.map((reviewData) => (
                      <div className="review">
                        <p className="user-name mb-0">{reviewData.enteredName}</p>
                        <p className="user-email">{reviewData.enteredEmail}</p>
                        <p className="feedback-text">{reviewData.reviewMsg}</p>
                      </div>
                    ))
                  }

                  <form className="form" onSubmit={submitHandler}>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={enteredName}
                        onChange={
                          (e) => {
                            setDone(false);
                            setEnteredName(e.target.value)
                          }
                        }
                        required
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Enter your email"
                        value={enteredEmail}
                        onChange={(e) => setEnteredEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <textarea
                        rows={5}
                        type="text"
                        placeholder="Write your review"
                        value={reviewMsg}
                        onChange={(e) => setReviewMsg(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="addToCart-btn">
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </Col>

            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related-Product-title">You might also like</h2>
            </Col>

            {relatedProduct.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;
