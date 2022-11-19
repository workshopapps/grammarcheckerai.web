import React from 'react';
import cultureList from '../../data/careers/culture.json';

const Culture = () => {
  return (
    <div className='px-20 py-12'>
      <h3 className='font-bold text-3xl text-center py-14'>Our Culture</h3>
      <div className="flex  space-x-8">
        {cultureList.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <img src={item.img} alt={item.heading} />
            <h4 className='text-2xl'>{item.heading}</h4>
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
