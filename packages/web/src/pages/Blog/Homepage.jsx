import useTheme from '../../hooks/useTheme';
import React from 'react';
import Header from '../../components/Blogcomponents/Header';
import Hero from '../../components/Blogcomponents/Hero';
import Cards from '../../components/Blogcomponents/Cards';
import Cta from '../../components/Blogcomponents/Cta';
import Footer from '../../modules/static/landing-page/Footer';

const Homepage = () => {
  const context = useTheme();
  return (
    <div className={`${context.theme === 'dark' ? 'bg-black text-white' : null}`}>
      <Header />
      <Hero />
      <Cards />
      <Cta />
      <Footer />
    </div>
  );
};

export default Homepage;
