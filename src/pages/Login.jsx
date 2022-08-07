import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setUserActions } from "../store/auth.slice";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post('https://backend-8am.herokuapp.com/api/login', { email, password });
    if (res.error) {
      console.log(res.error);
      return
    }
    const { id, name, role } = res.data.user;
    dispatch(setUserActions.setAuthState({ id, name, role } ));
    navigate('/');
    console.log(res.data);
  };

  const inputEmail = (e) => {
    setEmail(e.target.value);
  };

  const inputPassword = (e) => {
    setPassword(e.target.value);
  }

  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    onChange={inputEmail}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={inputPassword}
                  />
                </div>
                <button type="submit" className="addToCart-btn">
                  Login
                </button>
              </form>
              <Link to="/register">
                Don't have an account? Create an account
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
