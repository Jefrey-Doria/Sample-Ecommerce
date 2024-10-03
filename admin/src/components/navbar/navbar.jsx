import React from "react";
import "./navbar.css";
import navLogo from "../../assets/logos/logo.png";
import navProfile from "../../assets/nav-profile.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navLogo} alt="" className="navLogo" />
      {/* <img src={navProfile} alt="" className="navProfile" /> */}
    </div>
  );
};

export default Navbar;
