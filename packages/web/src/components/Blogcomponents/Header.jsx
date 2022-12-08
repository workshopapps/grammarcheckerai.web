import React from 'react';
import Headerimg from '../../assets/blogimg/blogimg.webp';
// import styles from './index.module.css';

const Header = () => {
  return (
    <header>
      <div className="mb-3  relative h-64 md:p-0 xl:mb-8">
        <img src={Headerimg} alt="" className="w-full h-64 object-cover" />

        <p
          className={`text-white absolute mx-auto px-6 text-3xl md:text-4xl text-center inset-0 md:px-24 md:w-3/4 font-normal pb-3 pt-8 leading-10 my-5 xl:text-4xl xl:w-4/5 xl:px-72 xl:my-8`}
        >
          The World&apos;s Most <span className="text-span font-bold">Dangerous Technology</span> Ever Made.
        </p>
      </div>
    </header>
  );
};

export default Header;
