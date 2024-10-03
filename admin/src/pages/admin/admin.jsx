import React from "react";
import "./admin.css";
import Sidebar from "../../components/sidebar/sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../components/addproduct/AddProduct";
import ListProduct from "../../components/listproduct/listproduct";

const admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addproducts" element={<AddProduct />} />
        <Route path="/listproducts" element={<ListProduct />} />
      </Routes>
    </div>
  );
};

export default admin;
