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
import axios from 'axios';

const LandingPage = () => {
  const context = useTheme();
  const [showQuiz, setShowQuiz] = useState(true);

  // useEffect(() => {

  //   setInterval(() => {
  //     setShowQuiz(true);
  //   }, 4000)
  // }, [setShowQuiz]);

  /* 
      The code below checks for a parameter on a successful payment subscription.
      If successful, redirects the user to this Homepage and calls the parameter to validate payment.
      This then ceates a new redirection based on the feedback gotten from the backend endpoint
  */

  // const useFetch = (url) => {
  //   var requestOptions = {
  //     method: 'GET',
  //     data: JSON.stringify({
  //       email: 'sdssd@dffdf.sss',
  //     }),
  //   };

  //   fetch(url, requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => {
  //       const oBJ = JSON.parse(result);
  //       console.log(oBJ.data);
  //     })
  //     .catch((error) => console.log('error', error));
  // };

  // useEffect(() => {
  //   // useFetch('https://api.speakbetter.hng.tech/v1/subscribe');
  //   axios.get('https://api.speakbetter.hng.tech/v1/subscribe', {
  //     params: {
  //       email: 'sdssd@dffdf.sss',
  //     },
  //   });
  // }, []);

  return (
    <div data-theme={context.theme} className={` bg-[#bbb8b81a] `}>
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
