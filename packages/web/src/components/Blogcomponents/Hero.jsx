import React from 'react';
import useTheme from '../../hooks/useTheme';
import Heroimg from '../../assets/blogimg/aiblog.jpg';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const Hero = () => {
  const context = useTheme();
  return (
    <section className="">
      <div className="md:flex px-4 justify-between items-center md:max-w-4xl md:px-4 flex-row-reverse mt-8 md:mx-auto xl:max-w-6xl xl:p-0">
        <div className={`mb-4 h-48 md:w-96 md:mb-0 md:p-0 xl:w-1/2 ${styles._img_height}`}>
          <img src={Heroimg} alt="Heroimg" className={`md:w-full h-full object-cover rounded-md`} />
        </div>

        <div className="md:p-2 md:pr-6 md:w-1/2 xl:pr-8 xl:px-0">
          <h1
            className={`text-header ${
              context.theme === 'dark' ? 'text-white' : null
            } text-xl font-bold mb-3 text-left xl:text-3xl transition-all`}
          >
            The Time Is Now for Conversational AI
          </h1>
          <p className="">
            What is the upcoming field that will advance human-computer interactions? conversant AI.
            <br />
            You may believe that voice interfaces are nothing new because talkative smartphone assistants have been
            available for more than a decade. But you&apos;ve probably noticed that those assistants have improved in
            terms of listening skills, conversational skills, and overall usefulness........
            <Link
              to="/ai"
              className={`${
                context.theme === 'dark' ? 'text-[#ffff] ' : 'text-header'
              } text-header text-sm font-bold mb-3 text-left hover:text-[#5d387f]`}
            >
              Read more
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
