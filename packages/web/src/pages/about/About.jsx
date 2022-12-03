import React from 'react';
import useTheme from '../../hooks/useTheme';
import { Values, Teams } from '../../pages/about/data/data';
import { useNavigate } from 'react-router-dom';
import illustration1 from '../../assets/abt_images/illustration1.png';
import illustration2 from '../../assets/abt_images/Illustration2.png';
import illustration4 from '../../assets/abt_images/illustration4.png';
import rings from '../../assets/abt_images/rings.png';
import ring1 from '../../assets/abt_images/ring1.png';
import Footer from '../../modules/static/landing-page/Footer';

const About = () => {
  const context = useTheme();
  const navigate = useNavigate();
  const dark = context.theme === 'dark';
  return (
    <>
      <div className={`no-space_ ${dark && 'bg-[#0f0e0e]'} transition-all `}>
        <div className=" flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center bg-btn md:p-5 lg:w-full md:py-14 relative">
            <img src={rings} alt="" width={135} className=" absolute right-10 top-1 sm:w-[80px]" />
            <img src={ring1} alt="" width={350} className="hidden md:block absolute left-0 bottom-1" />
            <div className="flex flex-col items-center justify-center lg:h-[280px] py-5">
              <p className="font-semibold text-white mt-5 mb-5  lg:text-4xl lg:h-[48px] lg:mt-9">ABOUT US</p>
              <p className={` text-white text-center mb-8 p-3 md:px-16 lg:text-base lg:h-64 lg:w-3/5 lg:mx-auto`}>
                AI-powered grammar checker backed by an automatic speech recognition system trained with over 650,000
                hours of multilingual speech data collected from all over the internet
              </p>
            </div>
          </div>
          <div className="py-14 space-y-6">
            <h2 className="text-lighttextGray text-2xl text-center">Trusted by top brands</h2>
            <div className="overflow-scroll scrollbar-hide flex justify-between gap-x-16">
              {['catalog', 'spherule', 'lightbox', 'luminous', 'altshift'].map((brand, idx) => (
                <img src={`/images/${brand}.svg`} alt="brand" key={idx} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 justify-center items-center w-full lg:px-32 m-auto lg:grid-cols-2 mt-3 lg:mx-2 md:px-10 lg:mt-10  ">
            <div className="  flex flex-col justify-center items-center lg:items-start m-5 lg:p-24 ">
              <p className={` ${dark && 'text-[#fff]'} text-lineColor `}>Our Mission </p>
              <p className={` ${dark && 'text-[#8C54BF]'} text-primary font-bold mt-1 mb-2  text-xl`}>
                Why we are here
              </p>
              <p className={` ${dark && 'text-[#8C54BF]'} text-textColor text-center lg:text-left text-lg `}>
                To aid human comunication by creating a grammatically correct population
              </p>
            </div>
            <div className=" py-6 px-20 md:px-40 lg:pr-20 flex justify-center items-center ">
              <img src={illustration1} alt="" width={400} />
            </div>
          </div>

          <div
            className={`flex flex-col w-full items-center justify-center mt-7 lg:px-20 ${
              dark && 'bg-[#333333] md:bg-[#333333]'
            }  bg-NumBg md:bg-white `}
          >
            <div className="grid grid-cols-1 justify-center items-center  m-auto sm:grid-cols-1  lg:grid-cols-2 mt-3  md:justify-around  lg:mx-2 md:px-10 lg:px-4 lg:mt-20   ">
              <div className="hidden lg:block justify-self-center">
                <img src={illustration2} alt="" width={400} />
              </div>
              <div className=" w-full h-full mt-0 md:p-0">
                <div className="w-10/12 md:full  mx-auto relative py-5">
                  <p
                    className={`${
                      dark && 'text-[#8C54BF]'
                    } text-cartBg font-bold text-center lg:text-left text-xl lg:text-2xl my-3 md:block`}
                  >
                    Our Unique Values
                  </p>
                  <div className="border-l-2 mt-0 border-lineColor">
                    {Values &&
                      Values.map((value, idx) => (
                        <div
                          className="transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4 Y text-white rounded mb-10 flex-col md:flex-row"
                          key={idx}
                        >
                          <div className="w-5 h-5 bg-lineColor absolute -left-10 transform -translate-x-2/4 rounded-full z-10 -mt-2 md:mt-0"></div>
                          <div className="w-10 h-1 bg-lineColor absolute -left-10 z-0"></div>
                          <div className="flex-auto " key={idx}>
                            <h1 className={`${dark && 'text-[#e9e3e3]'} font-normal text-textColor`}>
                              {value.message}
                            </h1>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="mt-0 lg:hidden py-6 px-20 flex justify-center items-center ">
                <img src={illustration2} alt="" width={400} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 justify-between  m-5  lg:m-auto  lg:px-20  lg:grid-cols-2">
            <div className="flex flex-col p-8 justify-center mt-4 md:p-8">
              <p className={`${dark && 'text-[#fff]'} text-lineColor text-center  lg:text-left`}>
                About Our Technology
              </p>
              <p
                className={`font-bold  text-center lg:text-left ${
                  dark && 'text-[#8C54BF]'
                } text-cartBg text-xl lg:text-2xl mt-2 mb-3`}
              >
                {' '}
                What we are building
              </p>
              <p className={`${dark && 'text-[#8C54BF]'} lg:text-left text-textColor`}>
                Speak Better is an AI-powered grammar checker designed to check and correct grammar for multiple
                languages. A brainchild of Carpenter-team-grit’s mission of having a population of excellent
                grammarians. It offers the necessary tools for fluent and effective communication.
              </p>
            </div>
            <div className=" mt-6 flex items-center justify-center">
              <img src={illustration4} alt="" width={400} />
            </div>
          </div>
          {/* 
          <div className="hidden lg:block flex-col  bg-NumBg items-center justify-center w-full ">
            <p className="text-center text-lighttextGray text-lg mt-8 ">Trusted by top brands</p>
            <div className="flex flex-row items-center justify-between lg:w-[60%] lg: m-[auto] py-5 ">
              <img src={figma} alt="" width={30} />
              <img src={saucelabs} alt="" width={45} />
              <img src={mavenir} alt="" width={55} />
              <img src={tend} alt="" width={85} />
              <img src={stord} alt="" width={135} />
            </div>
          </div> */}
          <div className=" flex flex-col items-center justify-center m-8 mt-24">
            <div className="space-y-2">
              <p className={'font-bold text-primary text-center text-xl lg:text-2xl'}>Team behind our product</p>
              <p className="text-purple-500 text-center">Amazing heads of department at Speak Better</p>
            </div>
            <div className="grid grid-cols-1 gap-4 justify-between  m-5 p-5 md:m-4 md:p-4 md:grid-cols-4  lg:grid-cols-5">
              {Teams &&
                Teams.map((team, idx) => (
                  <div className=" flex flex-col items-center justify-start mt-4 gap-1  " key={idx}>
                    <img src={team.imgsrc} alt="" className=" mb-2 h-[140px] w-[140px]" />
                    <p className="font-bold text-purple-500 text-center text-base">{team.name}</p>
                    <p className="text-purple-500 text-center">{team.role}</p>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-dark-100 py-12 px-8 mt-4 md:w-full space-y-7">
            <div>
              <p className=" text-purple-500  text-center text-3xl font-semibold">Try Quick Transcribe for free</p>
              <p className=" text-textColor text-center font-light text-sm lg:w-80 mx-auto mt-2">
                Set up your personal account, free forever and never worry about a error in your speech again
              </p>
            </div>
            <a
              href="/converse"
              className=" bg-purple-500 text-white ease-in-out duration-[.4s] transition-colors text-center py-3 px-5 rounded-lg mt-3"
            >
              Get Started
            </a>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default About;
