import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import logo from "../../assets/images/logo.png";
import "../../styles/footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" md="4" sm="6">
            <div className=" footer-logo text-start">
              <img src={logo} alt="logo" />
              <p>Restaurant that serves <br/>
              <span id="footer-desc">food for every mood</span></p>
              </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <h5 className="footer-title">Delivery Time</h5>
            <ListGroup className="deliver-time-list">
              <ListGroupItem className=" delivery-time-item border-0 ps-0">
                <span>Monday - Thursday</span>
                <p>10:00am - 10:00pm</p>
              </ListGroupItem>

              <ListGroupItem className=" delivery-time-item border-0 ps-0">
                <span>Friday - Sunday</span>
                <p>9:00am - 12:00pm</p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="3" md="4" sm="6">
            <h5 className="footer-title">Contact</h5>
            <ListGroup className="deliver-time-list">
              <ListGroupItem className=" delivery-time-item border-0 ps-0">
                <p>Location: B-17, Rajouri Garden, Delhi</p>
              </ListGroupItem>
              <ListGroupItem className=" delivery-time-item border-0 ps-0">
                <span>Phone: 0123456789</span>
              </ListGroupItem>

              <ListGroupItem className=" delivery-time-item border-0 ps-0">
                <span>Email: 8amrestaurant@gmail.com</span>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="3" md="4" sm="6">
            <h5 className="footer-title">Newsletter</h5>
            <p>Subscribe our newsletter</p>
            <div className="newsletter">
              <input type="email" placeholder="Enter your email" />
              <span>
                <i class="ri-send-plane-line"></i>
              </span>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg="6" md="6">
            <p className="copyright-text">
              Copyright - 2022, All Rights Reserved.<br />
              Made by Ishika Baid. 
            </p>
          </Col>
          <Col lg="6" md="6">
            <div className="social-links d-flex align-items-center gap-4 justify-content-end">
              <p className="m-0">Follow: </p>
              <span>
                {" "}
                <Link to="https://www.facebook.com">
                  <i class="ri-facebook-line"></i>
                </Link>{" "}
              </span>

              <span>
                {" "}
                <Link to="https://www.instagram.com">
                  <i class="ri-instagram-line"></i>
                </Link>{" "}
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
