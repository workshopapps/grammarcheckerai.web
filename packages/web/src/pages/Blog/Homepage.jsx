import useTheme from '../../hooks/useTheme';
import React from 'react';
import Header from '../../components/Blogcomponents/Header';
import Hero from '../../components/Blogcomponents/Hero';
import Cards from '../../components/Blogcomponents/Cards';
import Cta from '../../components/Blogcomponents/Cta';

const Homepage = () => {
  const context = useTheme();
  return (
    <div className={`${context.theme === 'dark' ? 'bg-black text-white' : null} transition-all`}>
      <Header />
      <Hero />
      <Cards />
      <Cta />
    </div>
  );
};

export default Homepage;
