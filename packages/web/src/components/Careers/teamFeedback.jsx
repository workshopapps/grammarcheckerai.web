/* eslint-disable react/prop-types */
import React from 'react';

const TeamFeedback = ({ img, feedback, name, role }) => {
  return (
    <div className="flex w-11/12 items-center mx-auto gap-x-8 max-[480px]:flex-col max-[480px]:w-full max-[480px]:space-y-3">
      <div className="max-[480px]:w-32 max-[480px]:h-32 w-48 rounded-full overflow-hidden">
        <img src={img} alt={name} className="object-cover w-full h-full" />
      </div>
      <div className="max-[480px]:text-center w-2/3 space-y-2">
        <h4 className="max-[480px]:py-2 break-after-auto">&quot;{feedback}&quot;</h4>
        <div>
          <p className="text-xs font-light italic">{name}</p>
          <p className="text-xs font-light italic">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamFeedback;
