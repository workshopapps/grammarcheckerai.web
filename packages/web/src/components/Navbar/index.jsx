import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="flex justify-between py-4 sm:px-10 items-center z-10 fixed top-0 w-full bg-[#5D387F] text-white px-3">
      <div>
        <img src="images/grit.svg" alt="gritty" className="salu\" />
      </div>
      <div className="sm:flex space-x-12 hidden ">
        {[
          { title: 'Converse', to: '/' },
          { title: 'About', to: '/about' },
          { title: 'FAQ', to: '/faq' },
          { title: 'Blog', to: '/blog' },
          { title: 'Contact', to: '/contact' },
        ].map((item) => (
          <NavLink to={item.to} key={item.title}>
            {item.title}
          </NavLink>
        ))}
      </div>
      <button className="bg-purple-500 py-3 px-5 rounded-lg text-white ">Get started</button>
    </header>
  );
};

export default Navbar;
