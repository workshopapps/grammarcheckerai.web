import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const grammerErrors = {
  1: [
    'The weather today am cold. I am freeze and I do not knowing how to make myself warmed. I plan on move to another continent that is not cold.',
    'I have a good news for you. I get a new job and it is a high pay job. I get to came in at any time and I even eating free food everyday.',
    'My teacher didn’t came to school today. Early in the day, he sent a word that he will come soon. Personally, I believe that we learn not at the school, but in life.',
    'To train a pet can be tired. You have to taught it to sit, ran, and also followed instructions. I easily get tired of a pet. ',
  ],
  2: [
    'To train a pet can be tired. You have to taught it to sit, ran, and also followed instructions. I easily get tired of a pet. ',
    'I have a good news for you. I get a new job and it is a high pay job. I get to came in at any time and I even eating free food everyday.',
  ],
  3: [
    'The weather today am cold. I am freeze and I do not knowing how to make myself warmed. I plan on move to another continent that is not cold.',
    'My teacher didn’t came to school today. Early in the day, he sent a word that he will come soon. Personally, I believe that we learn not at the school, but in life.',
  ],
  4: [
    'My teacher didn’t came to school today. Early in the day, he sent a word that he will come soon. Personally, I believe that we learn not at the school, but in life.',
    'I have a good news for you. I get a new job and it is a high pay job. I get to came in at any time and I even eating free food everyday.',
  ],
};

function Errors({ id }) {
  const navigate = useNavigate();
  return (
    <div className="my-6">
      {grammerErrors[id].map((err, idx) => (
        <div key={idx} className="bg-[#F6F6F6] rounded-lg pt-4 pb-3 px-4 my-[18px]">
          <p className="text-[#393939] sm:font-base font-normal font-['Inter'] leading-5 text-sm">{err}</p>
          <button
            className=" mt-4 outline-none text-[#279371] font-normal sm:text-base text-sm font-['DM_Sans']"
            onClick={() => {
              navigate('correction');
            }}
          >
            Check
          </button>
        </div>
      ))}
    </div>
  );
}
Errors.propTypes = {
  id: PropTypes.number,
};

export default Errors;
