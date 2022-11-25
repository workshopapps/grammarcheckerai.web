
import React from 'react';
import Header from '../../components/Blogcomponents/Header';
import Hero from '../../components/Blogcomponents/Hero';
import Cards from '../../components/Blogcomponents/Cards';
import Cta from '../../components/Blogcomponents/Cta';
import Footer from '../../modules/static/landing-page/Footer';

const Homepage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Cards />
      <Cta />
      <Footer />
    </div>
  );
};

export default Homepage;
