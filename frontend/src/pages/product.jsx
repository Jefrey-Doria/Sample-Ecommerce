import React, { useContext, useEffect } from "react";
import "./css/product.css";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import { ShopContext } from "../context/ShopContext";
import ProductDisplay from "../components/productdisplay/productdisplay";
import Descriptionbox from "../components/descriptionbox/descriptionbox";
import Relatedproducts from "../components/relatedproducts/relatedproducts";

const Product = () => {
  const { all_products } = useContext(ShopContext);
  const { productId } = useParams();
  const product =
    all_products && all_products.find((e) => e.id === Number(productId));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Breadcrumb product={product} />
      <ProductDisplay product={product} />
      <Descriptionbox />
    </div>
  );
};

export default Product;
