/* eslint-disable react/prop-types */
import React from 'react';

const TeamFeedback = ({ img, feedback, name, role }) => {
  return (
    <div className="flex w-11/12 items-center mx-auto gap-x-8 max-[480px]:flex-col max-[480px]:w-full max-[480px]:space-y-3">
      <div className="w-72 max-[480px]:w-32">
        <img src={img} alt={name} className=" cover rounded-full max-[480px]:w-40" />
      </div>
      <div className="w-full max-[480px]:text-center">
        <h4 className="max-[480px]:py-2">&quot;{feedback}&quot;</h4>
        <p className="text-xs font-light italic">{name}</p>
        <p className="text-xs font-light italic">{role}</p>
      </div>
    </div>
  );
};

export default TeamFeedback;
