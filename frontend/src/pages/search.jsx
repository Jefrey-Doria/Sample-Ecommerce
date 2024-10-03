import React, { useContext } from "react";
import "./css/search.css";
import { ShopContext } from "../context/ShopContext";
import dropdownIcon from "../components/assets/dropdown_icon.png";
import Item from "../components/item/item";

const Search = (props) => {
  const { all_products } = useContext(ShopContext);
  return (
    <div className="search">
      <div className="searchResults">
        <div className="searchSort">
          <p>
            <span>Search Results</span> for "{props.search}"
          </p>
          <div className="searchSortIcon">
            Sort by <img src={dropdownIcon} alt="" />
          </div>
        </div>
        <div className="searchProducts">
          {all_products.map((item, i) => {
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
            /*
            if (props.category === item.category) {
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
            } else {
              return null;
            }*/
          })}
        </div>
      </div>
      <div className="loadmore">
        <button>Load More</button>
      </div>
    </div>
  );
};

export default Search;
