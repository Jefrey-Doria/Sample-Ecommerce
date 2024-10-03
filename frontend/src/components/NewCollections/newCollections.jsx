import React, { useState, useEffect } from "react";
import "./newCollections.css";
//import newCollection from "../assets/new_collections";
import Item from "../item/item";

const NewCollections = () => {
  const [newcollection, setNewCollection] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/newcollections").then((response) => {
      response.json().then((data) => {
        setNewCollection(data);
      });
    });
  }, []);
  return (
    <div className="newCollections">
      <h1>RECOMMENDED FOR YOU</h1>
      <div className="collections">
        {newcollection.map((item, i) => {
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

export default NewCollections;
