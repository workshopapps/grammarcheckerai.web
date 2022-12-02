import useTheme from '../../../hooks/useTheme';
import FaqBox from './FaqBox';
import { Link } from 'react-router-dom';
import styles from './styles/index.module.css';

const Faq = () => {
  const context = useTheme();
  return (
    <div className={`${context.theme === 'dark' ? 'bg-[#000]' : 'bg-[#ffff]'} py-8`}>
      <div className="w-[90%] max-w-xl mx-auto my-7">
        <div className={`${context.theme === 'dark' ? 'text-[#ffffff]' : null} text-center`}>
          <h4 className="text-center text-3xl font-black">FAQ</h4>
          <p className="mb-7">If you have further questions, please contact us</p>
        </div>

        <div className="mb-9">
          <FaqBox
            question="How does Gritty Grammar work?"
            details="Download the app, Sign up and get started!
                You answer these questions We transcribe to text using
                whisper Identify grammatical errors It tells you how
                best to construct the sentence"
          />
          <FaqBox
            question="Can Gritty Grammar translate in all languages? "
            details="Yes, Gritty Grammar is avaliable to translate into all languages."
          />
          <FaqBox
            question="How does Gritty Grammar correct grammatical errors quickly? "
            details="Gritty Grammar has efficient algorithms designed to identify
                mistakes and correct them appriopriately."
          />
        </div>
        <div className="flex justify-center items-center">
          <Link
            to="/faq"
            className={`${styles._btn} text-center rounded-[12px] bg-[#5D387F] text-[#f1eef3] hover:bg-[#392150] hover:text-white transition-colors`}
          >
            See more...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Faq;
