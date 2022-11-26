
import PropTypes from 'prop-types';
import useTheme from '../../../hooks/useTheme';
import { useState } from 'react';
import styles from './styles/index.module.css';
import {FaChevronUp, FaChevronDown} from 'react-icons/fa'

const FaqBox = ({ question, details }) => {
  const context = useTheme();
  const [openAccordion, setOpenAccordion] = useState(false);

  const handleOpen = () => {
    setOpenAccordion(!openAccordion);
  }
  return (
    <div className={` flex flex-col justify-between border-2 mb-3 rounded-lg ${context.theme === 'dark' ? 'text-[#fff7f7] border-[#b6afb8]' :  'text-[#141414] border-[#bbb7b7]'}`}>
      <div
        onClick={handleOpen}
        className={`${styles.accordion__btn} flex border-[#bbb7b7] ${openAccordion ? 'border-b-2' : null} py-2 justify-between px-5 items-center cursor-pointer `}>
        <p>{question}</p>
        <button type='button' className={`text-lg font-light ${context.theme === 'dark' ? 'text-[#e2dada]' :  'text-[#8b8b8b]'}`}>
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