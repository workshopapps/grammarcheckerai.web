
import React from 'react';
import Header from '../../components/Blogcomponents/Header';
import Hero from '../../components/Blogcomponents/Hero';
import Cards from '../../components/Blogcomponents/Cards';
import Cta from '../../components/Blogcomponents/Cta';

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
