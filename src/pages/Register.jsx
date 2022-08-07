import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setUserActions } from "../store/auth.slice";

const Register = () => {
  const [nameInput, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userMode, setUserMode] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if(nameInput && email && password && userMode) {
      const response = await axios.post('https://backend-8am.herokuapp.com/api/signup', { name: nameInput, email, password, role: userMode});
      if(response.error){
        console.log(response.error);
        return 
      }
      const res = await axios.post('https://backend-8am.herokuapp.com/api/login', {email, password});
      if(res.error){
        console.log(res.error);
        return 
      }
      const { id, name, role } = res.data.user;
      dispatch(setUserActions.setAuthState({ id, name, role }));

      navigate('/')
      console.log(res.data);
    }
  };

  const inputName = (e) => {
    setName(e.target.value);
  };

  const inputEmail = (e) => {
    setEmail(e.target.value);
  };

  const inputPassword = (e) => {
    setPassword(e.target.value);
  }

  return (
    <Helmet title="Signup">
      <CommonSection title="Signup" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Full name"
                    required
                    onChange={inputName}
                  />
                </div>
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
                <div className="form-group">
                  <select name="mode" id="mode" onChange={(e) => setUserMode(e.target.value)} defaultValue="0">
                    <option value="0" disabled>Choose a User Mode</option>
                    <option value="Admin">Admin</option>
                    <option value="Guest">Guest</option>
                  </select>
                </div>
                <button type="submit" className="addToCart-btn">
                  Sign Up
                </button>
              </form>
              <Link to="/login">Already have an account? Login</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
