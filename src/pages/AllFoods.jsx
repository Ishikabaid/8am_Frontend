import { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";

import { Container, Row, Col } from "reactstrap";

// import products from "../assets/fake-data/products";
import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";

import "../styles/all-foods.css";
import "../styles/pagination.css";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurUser } from "../store/auth.slice";

const AllFoods = () => {
  const user = useSelector((state) => { return selectCurUser(state) });
  console.log("all foods", user);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const navigate = useNavigate();

  const addData = async () => {
    const result = await Promise.all(products.map(async (pr) => {
      delete pr["image02"]
      delete pr["image03"]
      const res = await axios.post("https://backend-8am.herokuapp.com/api/items", { ...pr });
      console.log(res);
      return res;
    }))

    console.log(result);
  }

  const fetchProducts = async () => {
    const res = await axios.get("https://backend-8am.herokuapp.com/api/items");
    if (res.error) {
      console.log(res.error);
      return;
    }
    console.log(res.data);
    setProducts(res.data);
  }
  useEffect(() => {
    fetchProducts();
    // addData()
  }, [])

  const searchedProduct = products.filter((item) => {
    if (searchTerm.value === "") {
      return item;
    }
    if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else {
      return console.log("not found");
    }
  });

  const productPerPage = 12;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProduct.slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(searchedProduct.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const addProduct = () => {
    navigate('/add', { replace: true });
  }

  return (
    <Helmet title="All-Foods">
      <CommonSection title="All Foods" />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6" xs="12">
              <div className="search-widget d-flex align-items-center justify-content-between ">
                <input
                  type="text"
                  placeholder="I'm looking for...."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6" xs="12" className="mb-5">

              {
                (user && user.role === "Admin") && (
                  <div className="add-item text-end">
                    <button onClick={addProduct}>Add new food item</button>
                  </div>
                )
              }
            </Col>


            {displayPage.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                <ProductCard item={item} />
              </Col>
            ))}

            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Prev"}
                nextLabel={"Next"}
                containerClassName=" paginationBttns "
              />
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AllFoods;
