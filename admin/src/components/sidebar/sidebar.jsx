import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import addProductIcon from "../../assets/Product_Cart.svg";
import listProductIcon from "../../assets/Product_list_icon.svg";

const sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addproducts"} style={{ textDecoration: "none" }}>
        <div className="sidebarItem">
          <img src={addProductIcon} alt="" />
          <p>Add Products</p>
        </div>
      </Link>
      <Link to={"/listproducts"} style={{ textDecoration: "none" }}>
        <div className="sidebarItem">
          <img src={listProductIcon} alt="" />
          <p>List Products</p>
        </div>
      </Link>
    </div>
  );
};

export default sidebar;
