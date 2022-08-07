import { useRef, useEffect } from "react";
import { Container } from "reactstrap";
import logo from "../../assets/images/logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";

import "../../styles/header.css";
import { selectCurUser, setUserActions } from "../../store/auth.slice";
import axios from "axios";

const nav__links = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Food",
    path: "/foods",
  },
  {
    display: "Cart",
    path: "/cart",
  },
  {
    display: "Contact",
    path: "/contact",
  },
];

const Header = () => {
  const user = useSelector((state) => selectCurUser(state));
  console.log("user", user);
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => menuRef.current.classList.toggle("show-menu");

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header-shrink");
      } else {
        headerRef.current.classList.remove("header-shrink");
      }
    });

    return () => window.removeEventListener("scroll");
  }, []);

  const handleLogout = async () => {
    dispatch(setUserActions.setAuthState({}))
    await axios.get('https://backend-8am.herokuapp.com/api/logout', { withCredentials: true });
    navigate('/login', { replace: true });
  }

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav-wrapper d-flex align-items-center justify-content-between">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>

          {/* ======= menu ======= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active-menu" : ""
                  }
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ======== nav right icons ========= */}
          <div className="nav-right d-flex align-items-center gap-4">
            <span className="cart-icon" onClick={toggleCart}>
              <i class="ri-shopping-basket-line"></i>
              <span className="cart-badge">{totalQuantity}</span>
            </span>

            <span className="user">
              {
                Object.keys(user).length > 0 ? (
                  <span className="user-span">{user.name + `(${user.role})`}</span>
                ) : (
                  <Link to="/login">
                    <span>Login/Register</span>
                  </Link>
                )
              }
            </span>
            {
              Object.keys(user).length > 0 && (
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              )
            }

            <span className="mobile-menu" onClick={toggleMenu}>
              <i class="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
