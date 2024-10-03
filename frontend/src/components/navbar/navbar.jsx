import React from "react";
import { useContext } from "react";
import "./navbar.css";
import logo from "../assets/logos/logo.png";
import cartIcon from "../assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);

  const handlerFuntion = () => {
    window.location.replace("/search");
  };

  return (
    <div className="navbar">
      <div className="navbar_logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <ul className="navbar_menu">
        {/* <li>
          <Link to="/search">
            Search
            <hr />
          </Link>
        </li> */}
        <div class="container">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") handlerFuntion();
            }}
            type="text"
            placeholder="Search..."
          />
          <div class="search"></div>
        </div>
      </ul>
      <div className="navbar_login">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}

        <Link to="/cart">
          <img className="cartLogo" src={cartIcon} alt="cart" />
        </Link>
        <div className="navbar_cart_count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
