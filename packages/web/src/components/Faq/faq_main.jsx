import React, { useState } from 'react';
import Footer from '../../modules/static/landing-page/Footer';
import data from './faq_data';
import useTheme from '../../hooks/useTheme';

function FaqMain() {
  const context = useTheme();
  const dark = context.theme === 'dark';
  const [searchTerm, setsearchTerm] = useState('');
  return (
    <>
      <div className="w-full h-full flex flex-col justify-between ">
        <div
          className={` ${
            dark && 'bg-[#211f21]'
          } lg:h-[350px] h-[320px] md:h-[320px]  bg-[#5D387F]  grid place-items-center`}
        >
          {' '}
          <div className=" lg:w-[50%] md:[70%] w-[85%] m-auto flex justify-center items-center flex-col">
            <h3 className="lg:mt-[45px] mt-[55px] flex items-center justify-center text-[#F2F2F2]  lg:text-[#FFFFFF] font-semibold lg:leading-[24px] leading-[17px] md:leading-[20px] lg:text-[24px] md:text-[20px] text-[16px] font-[Inter]">
              FAQs
            </h3>
            <h1 className="mt-[14px] lg:leading-[54px] leading-[38px]  mb-[16px] text-[#FFFFFF] font-semibold lg:text-[54px] md:text-[50px] text-[32px] flex items-center justify-center font-[Inter]">
              Ask us anything
            </h1>
            <p className="flex items-center justify-center w-[360px] md:w-[400px] mt-[5px] mb-[10px] font-normal lg:text-[20px] md:text-[18px] text-[16px] leading-[24px] text-center lg:leading-[30px] text-[#F2F2F2] lg:text-[#FFFFFF] font-[Inter] lg:w-[758px]">
              Have any questions? We&apos;re here to assist you.
            </p>
            <div className="relative text-[#0B303E] focus-within:text-[#0B303E] flex w-[100%] md:w-[70%] lg:w-[80%] m-auto lg:mb-[64px]  lg:mt-[20px] mb-[55px] mt-[27px]">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="submit"
                  className="p-1 focus:outline-none focus:shadow-outline text-[#0B303E] items-center"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-[#53686A]"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </span>
              <input
                type="text"
                name="q"
                id="searchInput"
                className="py-3 text-[18px] leading-[24px]   text-[#0B303E] lg:w-[100%] w-[100%] rounded-md pl-10 focus:outline-none focus:bg-white focus:text-[#0B303E] placeholder:text-[#0B303E]"
                placeholder="Search here"
                onChange={(event) => {
                  setsearchTerm(event.target.value);
                }}
              />
            </div>{' '}
          </div>
        </div>
      </div>

      <div className="place-items-center  ">
        <div
          className={` ${
            dark && 'bg-[black]'
          } grid lg:grid-cols-3 md:grid-cols-2 lg:mt-[44px] place-items-center  md:gap-10  items-center lg:m-10 justify-center m-5`}
        >
          {data
            .filter((val) => {
              if (searchTerm === '') {
                return val;
              } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val;
              }
            })
            .map((val) => {
              return (
                <>
                  <div
                    className=" h-full lg:w-full  block lg:px-6 px-8 md:px-6  rounded-lg  max-w-sm mt-[40px] lg:mt-[56px]"
                    key={val.id}
                  >
                    <div className="lg:w-[56px] lg:h-[56px] w-[46px] h-[46px]  bg-[#E8DDF2] hover:bg-[#fff] hover:shadow-[#E8DDF2] hover:shadow-md rounded-full mt-2">
                      <img
                        src={val.img}
                        className="text-[#5D387F] place-items-center lg:w-[55px] lg:h-[55px] w-[45px] h-[45px] text-x  mx-2 px-3 py-3 ml-[-1px] flex items-center justify-center"
                        alt="tag"
                      />
                    </div>

                    <h2
                      className={` ${
                        dark && 'text-[#c0c0c0]'
                      } text-[#53686A] font-medium text-[16px] lg:text-[22px] lg:mt-[24px] mt-[18px] leading-[22px]  lg:leading-[30px]  lg:w-auto w-[253px] md:w-60  font-[Inter]`}
                    >
                      {val.title}
                    </h2>
                    <p
                      className={` ${
                        dark && 'text-[#c0c0c0]'
                      } text-[#53686A]  text-[11px] md:text-[13px] lg:text-[17px] mt-[10px] md:mt-5 lg:mt-[12px] leading-[20px] lg:leading-[25px] font-normal w-[232px] lg:w-auto  md:w-[250px] h-auto  font-[Inter]`}
                    >
                      {val.para}
                    </p>
                  </div>{' '}
                </>
              );
            })}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default FaqMain;
