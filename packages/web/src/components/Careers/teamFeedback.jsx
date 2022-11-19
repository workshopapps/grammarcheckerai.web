/* eslint-disable react/prop-types */
import React from 'react';

const TeamFeedback = ({ img, feedback, name, role }) => {
  return (
    <div className="flex w-11/12 items-center mx-auto gap-x-8 sm:flex-col sm:w-full sm:space-y-3">
      <div className="w-72 sm:w-32">
        <img src={img} alt={name} className=" cover rounded-full sm:w-40" />
      </div>
      <div className="w-full sm:text-center">
        <h4 className='sm:py-2'>&quot;{feedback}&quot;</h4>
        <p className="text-xs font-light italic">{name}</p>
        <p className="text-xs font-light italic">{role}</p>
      </div>
    </div>
  );
};

export default TeamFeedback;
