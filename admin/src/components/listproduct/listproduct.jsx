import React, { useEffect, useState } from "react";
import "./listproduct.css";
import RemoveIcon from "../../assets/cross_icon.png";

const listproduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:5000/allproducts")
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch(`http://localhost:5000/removeproduct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  return (
    <div className="listproduct">
      <h1>All Products</h1>
      <div className="organizer">
        <p>Product</p>
        <p>Name</p>
        <p>Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="allproducts">
        <hr />
        {allproducts.map((product, index) => (
          <>
            <div key={index} className="organizer productFormat">
              <img src={product.image} alt="" className="productIcon" />
              <p>{product.name}</p>
              <p>₱ {product.new_price}</p>
              <p>{product.category}</p>
              <img
                onClick={() => {
                  removeProduct(product.id);
                }}
                src={RemoveIcon}
                className="removeIcon"
                alt=""
              />
            </div>
            <hr />
          </>
        ))}
      </div>
    </div>
  );
};
export default listproduct;
