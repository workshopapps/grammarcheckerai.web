import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ThemeContext } from '../../../lib/context/DarkThemeContext';
import styles from './Testimonial.module.css';

import stars from '../../../assets/raters/star.png';
import testimonial1 from '../../../assets/raters/testimonials/testimonial1.png';
import testimonial2 from '../../../assets/raters/testimonials/testimonial2.png';
import testimonial3 from '../../../assets/raters/testimonials/testimonial3.png';
import testimonial4 from '../../../assets/raters/testimonials/testimonial4.png';
import testimonial5 from '../../../assets/raters/testimonials/testimonial5.png';
import ornament2 from '../../../assets/raters/testimonials/ornament2.png';
import Footer from '../landing-page/Footer';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

export default function Testimonial() {
  const testimonials = [
    {
      id: 1,
      date: 'May 8, 2022',
      name: 'Amaka Disappoint',
      heading: 'No more disgraceful errors',
      testimony: `“I am a big fan of Speak Better because it takes the fear out of grammar. I've always been scared
                of making grammatical errors, but with this app, I don't have to worry about them anymore.” — Amaka
                Disappoint`,
      image: testimonial1,
    },
    {
      id: 2,
      date: 'Jan 16, 2022',
      name: 'Magareth Tobi',
      heading: 'Perfect for learners across all levels',
      testimony: `“This app is perfect for kids who don't want to spend hours studying grammar or parents who need a
                simple way to teach their kids the basics. It's fun, interactive, and keeps you engaged.” —
                Margareth Tobi`,
      image: testimonial2,
    },
    {
      id: 3,
      date: 'May 8, 2022',
      name: 'Adebayo Rejoice',
      heading: 'Lovely',
      testimony: `“I love this app! It helps me with my homework, and I feel so much more confident about my English. I
                definitely recommend it to everyone who needs help with grammar.” — Adebayo Rejoice`,
      image: testimonial3,
    },
    {
      id: 4,
      date: 'May 8, 2022',
      name: 'Paul',
      heading: 'I like how fast it corrects my mistakes',
      testimony: `“I've never been a huge fan of grammar, but this app makes it fun to learn. I'm definitely
                going to continue using it in the future. My friends keep telling me how much they like my new grammar
                skills!” — Paul`,
      image: testimonial4,
    },
    {
      id: 5,
      date: 'May 8, 2022',
      name: 'Edward Rose',
      heading: 'Good app for students',
      testimony: `“I am a teacher, and Speak Better is the perfect app for students to use in class. It's
                interactive and fun so that they don&apos;t even realize they are learning!” — Edward Rose`,
      image: testimonial5,
    },
  ];

  const context = useContext(ThemeContext);
  let navigate = useNavigate();
  const rateUs = () => {
    localStorage.setItem('review', false);
    navigate('/ratings');
  };

  return (
    <div>
      <div>
        <div
          className={`${styles._header} md:bg-[#5D387F] md:text-white flex flex-col justify-center items-center md:py-32`}
          nav-theme={context.theme}
        >
          <h1 className="text-center font-bold text-xl my-4 sm:text-2xl sm:mt-16 sm:p-2 lg:mt-4 lg:text-5xl">
            Users Love What We Do
          </h1>
          <p className="text-center font-[500] text-sm p-4 lg:p-0 lg:text-lg md:w-1/2">
            Read the stories of our users who have relied on our product to improve their grammer. Join Speak Better
            today and be a part of the team.
          </p>
        </div>
        <div
          className="text-center bg-[#5D387F] text-white w-48 flex justify-center py-2 rounded-xl my-6 mx-auto"
          onClick={() => rateUs()}
        >
          Rate SpeakBetter
        </div>
        <main className="lg:grid space-y-16 md:space-y-12 lg:space-y-0 grid-cols-3 gap-8 lg:mt-32 my-14 mx-8 lg:mx-32 ">
          {testimonials.map((testimony) => {
            return (
              <section
                key={testimony.id}
                className={`lg:flex px-4 py-6 lg:p-0 shadow-md rounded-xl col-span-2 lg:h-56 bg-white ${
                  testimony.id % 2 === 0 ? 'col-start-2' : ''
                }`}
              >
                <div className="flex items-center lg:w-52 lg:relative">
                  <img
                    src={ornament2}
                    alt=""
                    className={`hidden lg:block float-left lg:absolute z-10  ${
                      testimony.id % 2 === 0 ? 'hidden' : 'bottom-32 left-0'
                    }`}
                  />
                  <img
                    src={testimony.image}
                    alt=""
                    className="h-20 w-20 rounded-full lg:relative lg:h-full lg:w-full lg:rounded-none z-30"
                  />
                  <div className={`lg:hidden ml-6 ${styles._header}`}>
                    <p className="font-bold mb-2">{testimony.name}</p>
                    <span className="flex mb-2 lg:float-right lg:ml-4">
                      {[...Array(5)].map((it, index) => {
                        return <img src={stars} key={index} alt="" />;
                      })}
                    </span>
                    <span className="text-xs">May 8, 2022</span>
                  </div>
                </div>
                <div className="lg:w-2/3 space-y-4 lg:relative ">
                  <div className="space-y-4 p-4 lg:relative z-40 lg:h-full bg-white">
                    <div className=" hidden lg:block">
                      <span className="flex lg:float-right">
                        {[...Array(5)].map((it, index) => {
                          return <img src={stars} key={index} alt="" />;
                        })}
                      </span>
                      <span className="text-xs">May 8, 2022</span>
                    </div>
                    <div>
                      <h3 className="mb-4 lg:text-left font-bold">{testimony.heading}</h3>
                      <p className="text-xs">{testimony.testimony}</p>
                    </div>
                  </div>
                  <img
                    src={ornament2}
                    alt=""
                    className={`hidden lg:absolute z-10 ${
                      testimony.id % 2 === 0 ? 'lg:block top-28 right-0 rotate-180 ' : 'hidden'
                    }`}
                  />
                </div>
              </section>
            );
          })}
        </main>
      </div>
      <Footer />
    </div>
  );
}
