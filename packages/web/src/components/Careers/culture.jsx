import React from 'react';
import cultureList from '../../data/careers/culture.json';

const Culture = () => {
  return (
    <div className=" px-4 py-7">
      <h3 className="font-bold  text-center  text-2xl py-8 font-Inter">Our Culture</h3>
      <div className="flex gap-10 justify-center items-center font-Inter w-[100%] m-auto  text-sm text-center ">
        {cultureList.map((item, idx) => (
          <div key={idx} className=" flex w-[100%] h-[300px] bg-white shadow-sm rounded-sm flex-col justify-center items-center px-4 py-8 text-sm text-center font-Inter  ">
            <img className="w-[50px] mb-5" src={item.img} alt={item.heading} />

            <h4 className="text-2xl  align-center justify-center mb-5">{item.heading}</h4>
            <p className="text-sm w-[350px] text-left ">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Culture;
