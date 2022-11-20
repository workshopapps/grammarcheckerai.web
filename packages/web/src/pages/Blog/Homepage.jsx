import React from "react"
import Header from "../../components/Blog/Header"
import Hero from "../../components/Blog/Hero"
import Cards from "../../components/Blog/Cards"
import Cta from "../../components/Blog/Cta"


const Homepage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Cards />
      <Cta />
    </div>
  );
};

export default Homepage;
