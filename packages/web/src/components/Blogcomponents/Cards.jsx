import React from 'react';
import Image1 from '../../assets/blogimg/image2.svg';
import Image2 from '../../assets/blogimg/image 2 (1).svg';
import Image3 from '../../assets/blogimg/image 2 (2).svg';
import Icon from '../../assets/blogimg/arrow-down-circle-fill 1.png';
import { Link } from 'react-router-dom';

const Cards = () => {
  return (
    <section>
      <div className="p-4 grid grid-cols-2 gap-12 gap-y-8 mb-10 md:max-w-3xl mx-auto xl:grid-cols-3 xl:max-w-6xl">
        <div className="border-solid border border-card_border w-full rounded-tl-3xl rounded-br-3xl bg-[#E8DDF2] p-4 md:max-w-sm md:p-4 xl:">
          <div className="mb-3">
            <img src={Image1} alt="" className="w-full object-cover rounded-md" />
          </div>

          <h1 className="text-header text-sm font-bold mb-3 xl:text-xl">
            7 Amazing Jobs That Will Pay You to Speak English
          </h1>

          <p className="text-cards font-normal text-sm mb-3 xl:text-base">
            Do you want to make money speaking English? if so, you&apos;re in luck!
          </p>

          <Link to="/jobs" className="text-header text-sm font-bold mb-3 text-left hover:text-[#5d387f]">
            Read more
          </Link>
        </div>

        <div className="border-solid border border-card_border w-full rounded-tl-3xl rounded-br-3xl bg-[#E8DDF2] p-4 md:max-w-sm md:p-4">
          <div className="mb-3">
            <img src={Image2} alt="" className="w-full object-cover rounded-md" />
          </div>

          <h1 className="text-header text-sm  font-bold mb-3 xl:text-xl">
            10 Grammar Mistakes You&apos;re Probably Making (And How to Fix Them)
          </h1>

          <p className="text-cards font-normal text-sm mb-3 xl:text-base">
            Do you make these common grammar mistakes? Many people do...
          </p>

          <Link to="/grammar" className="text-header text-sm font-bold mb-3 text-left hover:text-[#5d387f]">
            Read more
          </Link>
        </div>

        <div className="border-solid border border-card_border w-full rounded-tl-3xl rounded-br-3xl bg-[#E8DDF2] p-4 md:max-w-sm md:p-4">
          <div className="mb-3">
            <img src={Image3} alt="" className="w-full object-cover rounded-md" />
          </div>

          <h1 className="text-header text-sm  font-bold mb-3 xl:text-xl">
            10 Tips to Help You Speak English Like a Native
          </h1>

          <p className="text-cards font-normal text-sm mb-3 xl:text-base">
            We will discuss 10 tips that will help you improve your speaking skills in a short amount of time....
          </p>

          <Link to="/tips" className="text-header text-sm font-bold mb-3 text-left hover:text-[#5d387f]">
            Read more
          </Link>
        </div>

        <div className="flex justify-center items-center xl:hidden">
          <button className="bg-btn relative text-white px-3 py-2 pl-4 flex justify-center items-center cursor-pointer rounded-lg hover:bg-[#3d1762]">
            See more
            <img src={Icon} alt="" className="ml-2" />
          </button>
        </div>
      </div>

      <div className="xl:flex justify-center items-center xl:mx-auto hidden">
        <button className="bg-btn relative text-white px-3 py-2 flex justify-center items-center cursor-pointer rounded-lg hover:bg-[#3d1762]">
          See more
          <img src={Icon} alt="" className="ml-2" />
        </button>
      </div>
    </section>
  );
};

export default Cards;
