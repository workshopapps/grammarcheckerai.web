import React from 'react';
import cultureList from '../../data/careers/culture.json';

const Culture = () => {
  return (
    <div className="px-20 py-12 max-[480px]:px-4 max-[480px]:py-7">
      <h3 className="font-bold text-xl text-center py-14 max-[480px]:text-2xl max-[480px]:py-8 font-Inter">Our Culture</h3>
      <div className="flex space-x-8 max-[480px]:flex-col max-[480px]:justify-center font-Inter  text-sm text-center max-[480px]:space-x-0 max-[480px]:space-y-8">
        {cultureList.map((item, idx) => (
          <div className='text-center align-center justify-center text-sm'>
            <div key={idx} className="space-y-2 max-[480px]:grid max-[480px]:justify-items-center  text-sm text-center font-Inter  max-[480px]:space-y-3">
              <div>
                <img className=' ml-44 mb-5' src={item.img} alt={item.heading} />
              </div>
          </div>
            <h4 className="text-2xl max-[480px]:text-xl align-center justify-center mb-5">{item.heading}</h4>
            <p className="text-sm -ml-5">{item.content}</p>
            {/* <ul>
              <li>{item.list}</li>
            </ul> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Culture;
