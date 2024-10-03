import React, { useContext } from "react";
import "./cartitems.css";
import { ShopContext } from "../../context/ShopContext";
import removeIcon from "../assets/cart_cross_icon.png";

const Cartitems = () => {
  const { all_products, cart, removeFromCart, getTotalCartAmount } =
    useContext(ShopContext);

  return (
    <div className="cartItems">
      <div className="cartItemsMain">
        <p>Products</p>
        <p>Name</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_products.map((item) => {
        if (cart[item.id] > 0) {
          return (
            <div>
              <div className="cartItemsFormat cartItemsMain">
                <img src={item.image} alt="" className="productIcon" />
                <p>{item.name}</p>
                <p>₱{item.new_price}</p>
                <button className="quantity">{cart[item.id]}</button>
                <p>₱{item.new_price * cart[item.id]}</p>
                <img
                  src={removeIcon}
                  alt=""
                  className="removeIcon"
                  onClick={() => removeFromCart(item.id)}
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartItemsDown">
        <div className="totalItems">
          <h1>Cart Total</h1>
          <div>
            <div className="cartTotal">
              <p>Subtotal</p>
              <p>₱{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartTotal">
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartTotal">
              <p>Total</p>
              <p>₱{getTotalCartAmount()}</p>
            </div>
          </div>
          <button>CHECKOUT</button>
        </div>
        <div className="promo">
          <h1>Have a promo code?</h1>
          <div className="promoBox">
            <input type="text" placeholder="Enter your code here" />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartitems;
