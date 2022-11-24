import React from 'react';
import Loader from '../../assets/loader-bot.svg';
const Fallback = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center justify-center">
        <img alt="loader" src={Loader} />
      </div>
    </div>
  );
};

export default Fallback;
