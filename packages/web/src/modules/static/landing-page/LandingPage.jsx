import useTheme from '../../../hooks/useTheme';
import { useEffect, useState } from 'react';
import Charcters from './Charcters';
import Cta from './Cta';
import Faq from './Faq';
import Footer from './Footer';
import Hero from './Hero';
import HowToUse from './HowToUse';
import NewsLetter from './NewsLetter';
import Testimonials from './Testimonials';
import Utilise from './Utilise';
import QuizPopUp from '../../modal/quizpopup/QuizPopUp';


const LandingPage = () => {
  const context = useTheme();
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setShowQuiz(true);
    }, 4000)
  }, [setShowQuiz]);

  return (
    <div
    data-theme={context.theme}
      className={` bg-[#bbb8b81a] `}>
      <Hero />
      <HowToUse />
      <Charcters />
      <Testimonials />
      <Faq />
      <Cta />
      <Utilise />
      <NewsLetter />
      <Footer />
      <QuizPopUp showQuiz={showQuiz} setShowQuiz={setShowQuiz} />
    </div>
  );
};

export default LandingPage;
