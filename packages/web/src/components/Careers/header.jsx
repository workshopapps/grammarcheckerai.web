import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="flex justify-between py-4 px-20 items-center fixed top-0 w-full bg-white z-50">
      <div>
        <img src="images/grit.svg" alt="gritty" />
      </div>
      <div className="flex space-x-12 sm:hidden">
        {[
          { title: 'Home', to: '/' },
          { title: 'About', to: '/about' },
          { title: 'FAQ', to: '/faq' },
          { title: 'Blog', to: '/blog' },
          { title: 'Contact', to: '/contact' },
        ].map((item) => (
          <Link to={item.to} key={item.title}>
            {item.title}
          </Link>
        ))}
      </div>
      <button className="bg-purple-500 py-3 px-5 rounded-lg text-white ">Get started</button>
    </div>
  );
};

export default Header;
