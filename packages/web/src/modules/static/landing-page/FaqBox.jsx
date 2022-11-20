import plusIcon from './assets/plus.png';
import PropTypes from 'prop-types';

const FaqBox = ({question}) => {
  return (
    <div className='flex justify-between border-2 mb-7 py-3 px-4 rounded-lg text-[#141414] border-[#bbb7b7] shadow-sm'>
      <p>{question}</p>
      <button type='button'>
        <img src={plusIcon} alt='more' className='w-5 h-5' />
      </button>
    </div>
  );
}
FaqBox.propTypes = {
  question: PropTypes.string,
};

export default FaqBox;