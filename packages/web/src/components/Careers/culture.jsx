import React from 'react';
import cultureList from '../../data/careers/culture.json';
import useTheme from '../../hooks/useTheme';

const Culture = () => {
  const context = useTheme();
  return (
    <div className={`${context.theme === 'dark' ? 'bg-[#0F0E0E]' : 'bg-[#ffff]'} px-4 py-7`}>
      <h3
        className={`${
          context.theme === 'dark' ? 'text-[#fff]' : 'text-header'
        } font-bold  text-center  text-2xl py-8 font-Inter`}
      >
        Our Culture
      </h3>
      <div
        className={`${
          context.theme === 'dark' ? 'bg-[#0F0E0E]' : ''
        } grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-center font-Inter w-[98%] m-auto text-sm text-center flex-auto`}
      >
        {cultureList.map((item, idx) => (
          <div
            key={idx}
            className="flex w-full h-[300px] bg-white shadow-md rounded-sm flex-col justify-center items-center px-4 py-8 text-sm text-center font-Inter"
          >
            <img className="w-[50px] mb-5" src={item.img} alt={item.heading} />
            <h4 className="text-2xl align-center justify-center mb-5">{item.heading}</h4>
            <p className="text-sm sm:text-left">
              {item.content} {item.list}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Culture;
