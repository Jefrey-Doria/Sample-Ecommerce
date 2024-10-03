import React from "react";
import "./addproduct.css";
import upload from "../../assets/upload_area.svg";
import { useState } from "react";

const Addproduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    old_price: "",
    new_price: "",
    description: "",
    category: "",
    tags: "",
  });
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:5000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success === 1) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch("http://localhost:5000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((response) => response.json())
        .then((data) => {
          data.success
            ? alert("Product Added Successfully")
            : alert("Failed to add product");
        });
    }
  };

  return (
    <div className="addproduct">
      <div className="addProductItemField">
        <p>Product Name</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Product Name"
        />
      </div>
      <div className="productPrice">
        <div className="addProductItemField">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Product Price"
          />
        </div>
        <div className="addProductItemField">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Product Price"
          />
        </div>
      </div>
      <div className="addProductItemField">
        <p>Description</p>
        <textarea
          value={productDetails.description}
          onChange={changeHandler}
          type="text"
          name="description"
          placeholder="Product Description"
        />
      </div>
      <div className="addProductItemField">
        <p>Category</p>
        <input
          value={productDetails.category}
          onChange={changeHandler}
          type="text"
          name="category"
          placeholder="Product Category"
        />
      </div>
      <div className="addProductItemField">
        <p>Tags</p>
        <input
          value={productDetails.tags}
          onChange={changeHandler}
          type="text"
          name="tags"
          placeholder="Product Tags"
        />
      </div>
      <div className="addProductItemField">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload}
            alt=""
            className="productThumbnail"
          />
        </label>
        <input
          type="file"
          name="image"
          id="file-input"
          hidden
          onChange={imageHandler}
        />
      </div>
      <button
        onClick={() => {
          addProduct();
        }}
        className="addProductButton">
        Add Product
      </button>
    </div>
  );
};

export default Addproduct;
