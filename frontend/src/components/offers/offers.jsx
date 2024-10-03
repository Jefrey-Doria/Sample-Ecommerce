import React from "react";
import "./offers.css";
import exclusiveImage from "../assets/exclusive_image.png";

const offers = () => {
  return (
    <div className="offers">
      <div className="offersLeft">
        <h1>Exclusive</h1>
        <h1>Coffee For You</h1>
        <p>Get the best coffee just for you</p>
        <button>Shop Now</button>
      </div>
      <div className="offersRight"></div>
    </div>
  );
};

export default offers;
