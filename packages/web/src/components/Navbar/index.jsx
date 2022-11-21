import React from 'react';
import { NavLink } from 'react-router-dom';
import logoImg from '../../assets/images/grit-white.svg';

const Navbar = () => {
  return (
    <header className="flex justify-between py-4 sm:px-10 items-center z-50 fixed top-0 w-full bg-[#5D387F] px-20">
      <div>
        <img src={logoImg} alt="gritty" className="salu\" />
      </div>
      <div className="sm:flex space-x-12 hidden ">
        {[
          { title: 'Converse', to: '/' },
          { title: 'About', to: '/about' },
          { title: 'FAQ', to: '/faq' },
          { title: 'Blog', to: '/blog' },
          { title: 'Contact', to: '/contact' },
        ].map((item) => (
          <NavLink to={item.to} key={item.title} className="text-white z-30">
            {item.title}
          </NavLink>
        ))}
      </div>
      <button className="bg-purple-500 py-3 px-5 rounded-lg text-white ">Get started</button>
    </header>
  );
};

export default Navbar;
