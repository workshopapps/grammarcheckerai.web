import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function Errors({ errors }) {
  const navigate = useNavigate();
  return (
    <div className="my-6">
      <div className="bg-[#F6F6F6] rounded-lg pt-4 pb-3 px-4 my-[18px]">
        <p className="text-[#393939] sm:font-base font-normal font-['Inter'] leading-5 text-sm">
          {errors.transcribedAudioText}
        </p>
        <button
          className=" mt-4 outline-none text-[#279371] font-normal sm:text-base text-sm font-['DM_Sans']"
          onClick={() => {
            navigate('correction');
          }}
        >
          Check
        </button>
      </div>
    </div>
  );
}
Errors.propTypes = {
  id: PropTypes.number,
};

export default Errors;
