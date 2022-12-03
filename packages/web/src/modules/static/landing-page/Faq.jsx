import useTheme from '../../../hooks/useTheme';
import FaqBox from './FaqBox';
import { Link } from 'react-router-dom';
import styles from './styles/index.module.css';

const Faq = () => {
    const context = useTheme();
    return (
      <div className={` ${context.theme === 'dark' ? 'bg-[#000]' : 'bg-[#ffff]'} py-8`}>
        <div className="w-[90%] max-w-2xl mx-auto my-7 flex flex-col md:ml-[10em]">
          <div className={`${context.theme === 'dark' ? 'text-[#ffffff]' : null} text-center md:text-left`}>
            <h4 className="text-center md:text-left text-3xl font-black">Frequently Asked Questions</h4>
            <p className="mb-7 mt-3">If you have further questions, please contact us</p>
          </div>

          <div className="mb-9">
            <FaqBox
              question="How does Speakbetter work?"
              details="Download the app, Sign up and get started! 
                You answer these questions We transcribe to text using 
                whisper Identify grammatical errors It tells you how 
                best to construct the sentence"
            />
            <FaqBox
              question="Can Speak Better translate in all languages? "
              details="Yes, Speak Better is avaliable to translate into all languages."
            />
            <FaqBox
              question="How does Speak Better correct grammatical errors quickly? "
              details="Speak Better has efficient algorithms designed to identify 
                mistakes and correct them appriopriately."
            />
          </div>
          
        </div>
      </div>
    
  );
};

export default Faq;
