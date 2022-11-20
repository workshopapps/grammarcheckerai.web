import React from 'react';

const Header = () => {
  return (
    <header className='flex justify-between py-4 px-20 items-center fixed top-0 w-full bg-white z-50 sm:px-3'>
      <div>
        <img src="images/grit.svg" alt="gritty" />
      </div>
      <div className='flex space-x-12 sm:hidden'>
        {['Home', 'About', 'FAQ', 'Blog', 'Contact'].map((item, idx) => (
          <a href="/" key={idx}>
            {item}
          </a>
        ))}
      </div>
      <button className="bg-purple-500 py-3 px-5 rounded-lg text-white ">Get started</button>
    </header>
  );
};

export default Header;
