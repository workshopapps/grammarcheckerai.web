import React from 'react';
import cultureList from '../../data/careers/culture.json';
import useTheme from '../../hooks/useTheme';

const Culture = () => {
  const context = useTheme();
  return (
    <div className= {`${context.theme === 'dark' ? 'bg-[#0F0E0E]' : 'bg-[#ffff]'} px-4 py-7`}>
      <h3 className={`${context.theme === 'dark' ? 'text-[#fff]' : 'text-header'} font-bold  text-center  text-2xl py-8 font-Inter`}>Our Culture</h3>
      <div className= {`${context.theme === 'dark' ? 'bg-[#0F0E0E]' : ''} flex gap-10 justify-center items-center font-Inter w-[100%] m-auto  text-sm text-center `}>
        {cultureList.map((item, idx) => (
           <div key={idx} className=" flex w-[100%] h-[300px] bg-white shadow-sm rounded-sm flex-col justify-center items-center px-4 py-8 text-sm text-center font-Inter  ">
           <img className="w-[50px] mb-5" src={item.img} alt={item.heading} />
           <h4 className="text-2xl  align-center justify-center mb-5">{item.heading}</h4>
           <p className="text-sm w-[350px] text-left ">{item.content}</p>
           <ul>
              <li className={`${context.theme === 'dark' ? '' : 'text-header'}`}>{item.list}</li>
           </ul>
         </div>
        ))}
      </div>
    </div>
  );
};

export default Culture;
