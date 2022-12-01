import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between py-4 max-[480px]:px-3 items-center z-10 fixed top-0 w-full bg-white px-10 shadow-sm">
      <div>
        <img src="images/grit.svg" alt="gritty" />
      </div>
      <div className="flex space-x-12 max-[480px]:hidden ">
        {[
          { title: 'Home', to: '/' },
          { title: 'About', to: '/about' },
          { title: 'FAQ', to: '/faq' },
          { title: 'Blog', to: '/blog' },
          { title: 'Contact', to: '/contact' },
        ].map((item) => (
          <NavLink className="text-slate-600 z-30" to={item.to} key={item.title}>
            {item.title}
          </NavLink>
        ))}
      </div>
      <button className="bg-[#5D387F] hover:bg-[#392150] py-3 px-5 rounded-lg text-white ">Get started</button>
    </header>
  );
};

export default Header;
