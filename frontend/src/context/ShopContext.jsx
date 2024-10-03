import React, { createContext, useState, useEffect } from "react";
//import item from "../components/item/item";

export const ShopContext = createContext(null);
const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 3000 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};
const ShopContextProvider = (props) => {
  const [all_products, setAllProducts] = useState([]);
  const [cart, setCart] = useState(getDefaultCart());

  useEffect(() => {
    fetch("http://localhost:5000/allproducts").then((response) => {
      response.json().then((data) => {
        setAllProducts(data);
      });
    });
    if (localStorage.getItem("auth-token") !== null) {
      fetch("http://localhost:5000/getcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: "",
      }).then((response) => {
        response.json().then((data) => {
          setCart(data);
        });
      });
    }
  }, []);

  const addToCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    console.log(cart);
    if (localStorage.getItem("auth-token") !== null) {
      fetch("http://localhost:5000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ itemId: id }),
      }).then((response) => {
        response.json().then((data) => {
          console.log(data);
        });
      });
    }
  };
  const removeFromCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: prev[id] - 1 }));

    if (localStorage.getItem("auth-token") !== null) {
      fetch("http://localhost:5000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ itemId: id }),
      }).then((response) => {
        response.json().then((data) => {
          console.log(data);
        });
      });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cart) {
      if (cart[item] > 0) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cart[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cart) {
      if (cart[item] > 0) totalItems += cart[item];
    }
    return totalItems;
  };

  const contextValue = {
    all_products,
    cart,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  const [totalItems, setTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    let items = 0;
    let amount = 0;
    for (let i = 0; i < all_products.length; i++) {
      items += cart[i];
      amount += cart[i] * all_products[i].new_price;
    }
    setTotalItems(items);
    setTotalAmount(amount);
  }, [cart]);
  contextValue.cart = cart;
  contextValue.setCart = setCart;
  contextValue.totalItems = totalItems;
  contextValue.totalAmount = totalAmount;

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
