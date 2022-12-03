import React, { useState } from 'react';
import Culture from '../../components/Careers/culture';
import Footer from '../../components/Careers/footer';

import Navbar from '../../components/Navbar';
import teamData from '../../data/careers/teamData.json';
import { FaChevronLeft, FaChevronRight  } from 'react-icons/fa';


const Careers = () => {
  const myData = teamData;
  const [activeSlide, setActiveSlide] = useState(1);

  const previous = () => {
    activeSlide === 1 ? setActiveSlide(activeSlide + 1) : setActiveSlide(activeSlide - 1);
  };

  const next = () => {
    activeSlide === 2 ? setActiveSlide(1) : setActiveSlide(activeSlide + 1);
  };

  return (
    <div>
      <Navbar />

      <section className= "bg-purple-500 py-20 text-center space-y-1 text-dark-200 ">
        <h4 className="text-white text-4xl py-[5]" >Careers and Culture</h4>
        <h1 className="text-sm py-[20] -mt-8  text-white  max-[480px]:max-[480px]:w-3/5 max-[480px]:mx-auto">
          A culture rooted in setting people up for success
        </h1>
        <div>
          
        </div>
      </section>
      <div className=" flex justify-center items-center flex-col px-30 py-14 space-y-14 bg-[#F6F6F6] ">
        <h4 className="text-center text-xl font-bold text-dark-primary">
          Hear from <span className="text-purple-500">the team</span>
        </h4>
        <div
          style={{
            transform: `translateX(-${activeSlide * 1}%)`,
            transition: 'all 1s',
          }}
          className=" flex w-full  flex-col m-auto justify-center transition-all items-center overflow-hidden "
        >
          {myData.map((item) => {
            const { id, img, name, feedback, role } = item;
            return (
              <div
                key={id}
                className={
                  activeSlide === id ? 'flex  w-[100%] m-auto justify-center  flex-col items-center' : 'hidden'
                }
              >
                <div className="flex md:w-[70%] m-auto flex-col items-center  text-center transition-all justify-center">
                  <img src={img} alt={feedback} className="rounded-full w-[100px] md:w-[180px] " />
                  <div className=" px-10">
                    <h3 className="text-[15px] font-bold md:text-[18px] mt-[24px] leading-6 md:leading-[30px] text-[#393939] ">
                      <q> {feedback} </q>
                    </h3>
                    <p className=" text-[13px] md:text-[16px] mt-[16px] leading-[19px] text-[#5A5A5A] font-light italic">
                      {' '}
                      {name}
                    </p>
                    <p className=" text-[13px] md:text-[16px] mt-[8px] leading-[19px] text-[#5A5A5A] font-light italic  mb-[24px]">
                      {role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex items-center w-[30%] md:w-[14%] m-auto justify-between mt-5 py=[50px]">
            <button onClick={previous} className="cursor-pointer">
              <img src="images/previous.svg" alt="previous" />
            </button>
            <button onClick={next} className="cursor-pointer">
              <img src="images/next.svg" alt="next" />
            </button>{' '}
          </div>
        </div>{' '}
      </div>
      <Culture />
      <section className="text-center py-10 ">
        <h1 className='text-xl'>Apply for roles</h1>
        <p className="w-1/2 mx-auto py-6  text-sm max-[480px]:w-full max-[480px]:px-8 max-[480px]:pb-10 my-6">
        <svg  className="inline float-left mb-2 ml-2 mr-2"width="10" height="10" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.892 11.104L5.212 0.399998H8.092L5.404 11.104H0.892ZM8.38 11.104L12.748 0.399998H15.628L12.892 11.104H8.38Z" fill="#5D387F"/>
</svg>
Every member of the team brings something unique to Gritty Grammar which strenghtens the team. We are
          growing and we would like you to join us. Do you think you have what it takes to join the team? Find out how
          you can add your talent and skills to our team and help us push forward our mission! <svg className=" float-right -top-0 relative   object-right-top mb-2 ml-5 mr-"  width="10" height="10" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.892 11.104L5.212 0.399998H8.092L5.404 11.104H0.892ZM8.38 11.104L12.748 0.399998H15.628L12.892 11.104H8.38Z" fill="#5D387F"/>
</svg>

        </p>
        <a href="/roles" className="bg-purple-800 p text-white rounded-lg py-4 px-4">
          Explore Open Roles
        </a>
      </section>
      <Footer />
      </div>
      
  
  )
};

export default Careers;
