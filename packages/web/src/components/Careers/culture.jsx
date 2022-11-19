import React from 'react';
import cultureList from '../../data/careers/culture.json';

const Culture = () => {
  return (
    <div className="px-20 py-12 sm:px-4 sm:py-7">
      <h3 className="font-bold text-3xl text-center py-14 sm:text-2xl sm:py-8">Our Culture</h3>
      <div className="flex space-x-8 sm:flex-col sm:justify-center sm:space-x-0 sm:space-y-8">
        {cultureList.map((item, idx) => (
          <div key={idx} className="space-y-2 sm:grid sm:justify-items-center sm:space-y-3">
            <div>
              <img src={item.img} alt={item.heading} />
            </div>
            <h4 className="text-2xl sm:text-xl">{item.heading}</h4>
            <p >{item.content}</p>
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
