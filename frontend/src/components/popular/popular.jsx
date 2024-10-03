import React, { useState, useEffect } from "react";
import "./popular.css";
//import data_products from "../assets/data";
import Item from "../item/item";

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/popular").then((response) => {
      response.json().then((data) => {
        setPopularProducts(data);
      });
    });
  }, []);
  return (
    <div className="popular">
      <h1>FEATURED</h1>
      <div className="popularItems">
        {popularProducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
