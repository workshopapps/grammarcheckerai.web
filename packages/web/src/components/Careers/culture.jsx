import React from 'react';
import cultureList from '../../data/careers/culture.json';
import useTheme from '../../hooks/useTheme';

const Culture = () => {
  const context = useTheme();
  return (
    <div className= {`${context.theme === 'dark' ? 'bg-[#0F0E0E]' : 'bg-[#ffff]'} px-20 py-12 max-[480px]:px-4 max-[480px]:py-7`}>
      <h3 className={`${context.theme === 'dark' ? 'text-[#211f21]' : 'text-[#ffff]'} lg:h-[430px] h-[296px] font-bold text-3xl text-center py-14 max-[480px]:text-2xl max-[480px]:py-8`}>Our Culture</h3>
      <div className="flex space-x-8 max-[480px]:flex-col max-[480px]:justify-center max-[480px]:space-x-0 max-[480px]:space-y-8">
        {cultureList.map((item, idx) => (
          <div key={idx} className="space-y-2 max-[480px]:grid max-[480px]:justify-items-center max-[480px]:space-y-3">
            <div>
              <img src={item.img} alt={item.heading} />
            </div>
            <h4 className={`${context.theme === 'dark' ? 'text-[#fff]' : 'text-header'} text-2xl max-[480px]:text-xl `}>{item.heading}</h4>
            <p>{item.content}</p>
            <ul>
              <li>{item.list}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Culture;
