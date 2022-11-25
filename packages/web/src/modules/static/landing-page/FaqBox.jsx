import arrowUp from './assets/arrow-up.png';
import arrowDown from './assets/arrow-down.png';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './styles/index.module.css';
import {FaChevronUp, FaChevronDown} from 'react-icons/fa'

const FaqBox = ({ question, details }) => {
  const [openAccordion, setOpenAccordion] = useState(false);

  const handleOpen = () => {
    setOpenAccordion(!openAccordion);
  }
  return (
    <div className={` flex flex-col justify-between border-2 mb-3 rounded-lg text-[#141414] border-[#bbb7b7]`}>
      <div
        onClick={handleOpen}
        className={`${styles.accordion__btn} flex border-[#bbb7b7] ${openAccordion ? 'border-b-2' : null} py-2 justify-between px-5 items-center cursor-pointer `}>
        <p>{question}</p>
        <button type='button' className='text-lg font-light text-[#8b8b8b]'>
          {openAccordion ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      <div className={`px-5 py-4 ${openAccordion ? 'block' : 'hidden'}`}>
        {details }
      </div>
    </div>
  );
}
FaqBox.propTypes = {
  question: PropTypes.string,
};

export default FaqBox;