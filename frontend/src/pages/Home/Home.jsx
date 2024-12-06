import React from "react";
import HeroContainer from "./Hero/HeroContainer";
import Gallary from "./Gallery/Gallary";
import PopularClasses from "./PopularClasses/PopularClasses";
import PopularTeacher from "./PopularTeacher/PopularTeacher";
import useAuth from "../../hook/useAuth";

const Home = () => {
  const { user } = useAuth();
  return (
    <section>
      <HeroContainer />
      <div className="max-w-screen-xl mx-auto">
        <Gallary />
        <PopularClasses />
        <PopularTeacher />
      </div>
    </section>
  );
};

export default Home;
