import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="heroLeft"></div>
      <div className="heroRight">
        <div className="herobox">
          <h2 className="heroText">START YOUR DAY WITH THE BEST COFFEE</h2>
          <div className="heroSubText">
            <p>
              Moderate coffee consumption enhances alertness, physical
              performance, and provides antioxidants, potentially reducing the
              risk of certain diseases and improving overall mental well-being.
            </p>
          </div>
          <div className="heroButton">
            <div className="hero-latest-button">
              <p>TRY NOW</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
