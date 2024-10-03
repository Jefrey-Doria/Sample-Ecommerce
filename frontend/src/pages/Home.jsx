import React from "react";
import Hero from "../components/Hero/Hero";
import Popular from "../components/popular/popular";
import Offers from "../components/offers/offers";
import NewCollections from "../components/NewCollections/newCollections";

const Home = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
    </div>
  );
};

export default Home;
