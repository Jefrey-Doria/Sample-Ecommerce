import { React, useContext } from "react";
import "./productdisplay.css";
import starIcon from "../assets/star_icon.png";
import starDullIcon from "../assets/star_dull_icon.png";
import { ShopContext } from "../../context/ShopContext";

const Productdisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="productDisplay">
      <div className="productDisplay_image">
        {/* <div className="productImage">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div> */}
        <div className="displayImage">
          <img className="mainImage" src={product.image} alt="" />
        </div>
      </div>
      <div className="productDisplay_info">
        <h1>{product.name}</h1>
        <div className="productRightStar">
          <img src={starIcon} alt="" />
          <img src={starIcon} alt="" />
          <img src={starIcon} alt="" />
          <img src={starIcon} alt="" />
          <img src={starDullIcon} alt="" />
          <p>(69)</p>
        </div>
        <div className="productPrice">
          <div className="productOldPrice">
            <p>Php {product.old_price}</p>
          </div>
          <div className="productNewPrice">
            <p>Php {product.new_price}</p>
          </div>
        </div>
        <div className="productDescription">
          <p>
            {product.description}Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum
          </p>
        </div>
        <button
          onClick={() => {
            addToCart(product.id);
          }}
          className="productButton">
          ADD TO CART
        </button>
        <div className="productCategory">
          <p>
            <span>Category:</span> {product.category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Productdisplay;
