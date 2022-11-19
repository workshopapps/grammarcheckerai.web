/* eslint-disable react/prop-types */
import React from 'react';

const TeamFeedback = ({ img, feedback, name, role }) => {
  return (
    <div className="flex w-11/12 items-center mx-auto gap-x-8">
      <div className="w-72">
        <img src={img} alt={name} className=" cover rounded-full" />
      </div>
      <div className="w-full">
        <h4>&quot;{feedback}&quot;</h4>
        <p className="text-xs font-light italic">{name}</p>
        <p className="text-xs font-light italic">{role}</p>
      </div>
    </div>
  );
};

export default TeamFeedback;
