import React from "react";
import HeroContainer from "./Hero/HeroContainer";
import Gallary from "./Gallery/Gallary";
import PopularClasses from "./PopularClasses/PopularClasses";

const Home = () => {
  return (
    <secion>
      <HeroContainer />
      <div className="max-w-screen-xl mx-auto">
        <Gallary />
        <PopularClasses />
      </div>
    </secion>
  );
};

export default Home;
