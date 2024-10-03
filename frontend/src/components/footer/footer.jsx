import React from "react";
import "./footer.css";
import footerLogo from "../assets/logos/logo.png";
import instagram from "../assets/instagram_icon.png";
import pinterest from "../assets/pinterest_icon.png";
import whatsapp from "../assets/whatsapp_icon.png";

const footer = () => {
  return (
    <div className="footer">
      <div className="footerLogo">
        <img src={footerLogo} alt="" />
      </div>
      <ul className="footerLinks">
        <li>PRODUCTS</li>
        <li>CUSTOMER SERVICE</li>
        <li>TERMS AND CONDITIONS</li>
        <li>PRIVACY POLICY</li>
        <li>CONTACT US</li>
      </ul>
      {/* <div className="footerSocials">
        <div className="footerSocialIcons">
          <img src={instagram} alt="" />
        </div>
        <div className="footerSocialIcons">
          <img src={pinterest} alt="" />
        </div>
        <div className="footerSocialIcons">
          <img src={whatsapp} alt="" />
        </div>
      </div> */}
      <div className="footerCopyright">
        <hr />
        <p>All Rights Reserved to CoffeeLoft</p>
      </div>
    </div>
  );
};

export default footer;
