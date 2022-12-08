import React from 'react';
import Image1 from '../../assets/blogimg/image2.svg';
import Image2 from '../../assets/blogimg/image 2 (1).svg';
import Image3 from '../../assets/blogimg/image 2 (2).svg';
import { Link } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import styles from './index.module.css';

const Cards = () => {
  const context = useTheme();
  return (
    <section className="mb-[20px] md:mb-0 mt-[60px]">
      <div className="px-8  p-2 max-w-sm py-2 grid grid-cols-1 gap-[60px] gap-y-2 md:gap-y-8 md:grid-cols-2 mb-4 md:max-w-3xl mx-auto xl:grid-cols-3 xl:max-w-6xl xl:p-0">
        <div
          className={`border-solid border border-card_border w-full p-2 mb-6 md:max-w-sm md:p-4 xl:max-w-lg rounded-lg ${styles._border_width}`}
        >
          <div className="mb-3">
            <img src={Image1} alt="" className="w-full h-32 object-cover rounded-lg" />
          </div>

          <h1
            className={` ${context.theme === 'dark' ? 'text-white' : 'text-header'}  text-sm font-bold mb-3 xl:text-xl`}
          >
            7 Amazing Jobs That Will Pay You to Speak English
          </h1>

          <p
            className={` ${
              context.theme === 'dark' ? 'text-gray-300' : 'text-cards'
            } text-justify font-normal text-sm mb-4 xl:text-base`}
          >
            Do you want to make money speaking English? If so, you&apos;re in luck! There are many amazing jobs out
            there that will pay you to use your fluency in the English language.....
          </p>

          <Link
            to="/jobs"
            className={`${
              context.theme === 'dark' ? 'text-[#ffff] ' : 'text-[#000]'
            } text-header text-sm font-bold mb-3 text-left hover:text-[#5d387f]`}
          >
            Read more
          </Link>
        </div>

        <div
          className={`border-solid border border-card_border  mb-6 w-full p-2 md:max-w-sm md:p-4 xl:max-w-lg rounded-lg ${styles._border_width}`}
        >
          <div className="mb-3">
            <img src={Image2} alt="" className="w-full h-32 object-cover rounded-lg" />
          </div>

          <h1
            className={` ${context.theme === 'dark' ? 'text-white' : 'text-header'}  text-sm font-bold mb-3 xl:text-xl`}
          >
            10 Grammar Mistakes You&apos;re Probably Making (And How to Fix Them)
          </h1>

          <p
            className={` ${
              context.theme === 'dark' ? 'text-white' : 'text-cards'
            }   text-justify font-normal text-sm mb-4 xl:text-base`}
          >
            Do you make these common grammar mistakes? Many people do, and it&apos;s easy to see why. English is a
            complex language to learn, and many rules....
          </p>

          <Link
            to="/grammar"
            className={`${
              context.theme === 'dark' ? 'text-[#ffff] ' : 'text-[#000]'
            } text-header text-sm font-bold mb-3 text-left hover:text-[#5d387f]`}
          >
            Read more
          </Link>
        </div>

        <div
          className={`border-solid border border-card_border  mb-6 w-full p-2 md:max-w-sm md:p-4 xl:max-w-lg rounded-lg ${styles._border_width}`}
        >
          <div className="mb-3">
            <img src={Image3} alt="" className="w-full h-32 object-cover rounded-lg" />
          </div>

          <h1
            className={` ${context.theme === 'dark' ? 'text-white' : 'text-header'}  text-sm font-bold mb-3 xl:text-xl`}
          >
            10 Tips to Help You Speak English Like a Native
          </h1>

          <p
            className={` ${
              context.theme === 'dark' ? 'text-gray-300' : 'text-cards'
            } text-justify font-normal text-sm mb-4 xl:text-base`}
          >
            We will discuss 10 tips that will help you improve your speaking skills in a short amount of time! These
            tips are based on years of experience teaching English as a second language.....
          </p>

          <Link
            to="/tips"
            className={`${
              context.theme === 'dark' ? 'text-[#ffff] ' : 'text-[#000]'
            }  text-sm font-bold mb-3 text-left hover:text-[#5d387f]`}
          >
            Read more
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cards;
