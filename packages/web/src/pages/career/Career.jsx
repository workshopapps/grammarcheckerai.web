import React, { useState, useEffect } from 'react';
import Culture from '../../components/Careers/culture';
import Footer from '../../components/Careers/footer';

import Navbar from '../../components/Navbar';
import teamData from '../../data/careers/teamData.json';
import { FaChevronLeft, FaChevronRight  } from 'react-icons/fa';


const Careers = () => {
  const [index, setIndex] = useState(0)
   console.log(index);
 

 
  const nextPerson = () => {
    setIndex (index === 1 ? 0 : prev =>prev + 1 ) ;
  }
  const prevPerson = () => {
    setIndex (index === 0 ? 1 : prev =>prev - 1 ) ;
  };



  return (
    <div>
      <Navbar />

      <section className= "bg-purple-500 py-20 text-center space-y-1 text-dark-200 ">
        <h4 className="text-white text-4xl py-[5]" >Careers and Culture</h4>
        <h1 className="text-sm py-[20] -mt-8  text-white  max-[480px]:max-[480px]:w-3/5 max-[480px]:mx-auto">
          A culture rooted in setting people up for success
        </h1>
      </section>
      <div>
        <div className="flex items-center justify-center px-60 py-14 bg-gray-100 ">
          <div className="">
            <h4 className="text-center text-xl font-bold text-dark-primary">
              Hear from <span className="text-purple-500">the team</span>
            </h4>
            <section>
              <div className =" overflow-hidden flex w-[300vw] h-full " style={{transform:`translateX(-${index * 100}vw)`}}>
                {teamData.map(({ img, feedback, name, role, id }) => (
                  <div  key={id} className =" overflow-hidden flex justify-center w-[100vw] mt-12 ">
                    <article className=" flex flex-col items-center">
                      <img className=" rounded-full w-[200px]  " src={img} alt={name} />
                      <p className="text-center max-w-[480px] mt-10">{feedback}</p>
                      <div className="mt-8 text-center text-sm leading-5">
                        <p>{name}</p>
                        <p className='italic'>{role}</p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-4 justify-center bottom-0 mt-10">
                <button className="flex justify-center items-center rounded-full bg-black text-white w-7 h-7" onClick={prevPerson}>
                  <FaChevronLeft />
                </button>
                <button className="flex justify-center items-center rounded-full bg-black text-white w-7 h-7" onClick={nextPerson}>
                  <FaChevronRight />
                </button>
              </div>
            </section>
            {/* <div  className="flex  max-[480px]:whitespace-normal"> 
          {teamData.map(({ img, feedback, name, role, id }) => (
            <div style={{...carouselStyle}}
        
              key={id}
              className="w-full justify-center  overflow:hidden items-center min-w-full transition-all max-[360px]:min-w-fit"
        
            >
              <TeamFeedback img={img} feedback={feedback} name={name} role={role}  />
          </div>
        ))}
        </div> */}
            {/* <div className="flex items-center justify-center space-x-10">
              <button className="prev-btn" onClick={prevSlide}>
                <FaChevronLeft />
              </button>
              <button className="next-btn" onClick={nextSlide}>
                <FaChevronRight />
              </button>
            </div> */}
          </div>
        </div>
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
  );
};

export default Careers;
