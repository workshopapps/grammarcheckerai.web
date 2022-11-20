import React, { useState } from 'react'
import data from './faq_data';

import FaqFooter from './faq_footer';

function FaqMain() {
    const [searchTerm, setsearchTerm] = useState("");
  return (
    <>


            <div className='w-full h-full flex flex-col justify-between '>

                <div className="mt-[82px] lg:h-[271px] h-[286px] md:h-[300px]  bg-[#8C54BF] grid place-items-center">
                
                    <h3 className="lg:mt-[45px] mt-[55px] flex items-center justify-center text-[#ffffff80] font-semibold lg:leading-[24px] leading-[17px] md:leading-[20px] lg:text-[24px] md:text-[20px] text-[16px] font-[Inter]">FAQs</h3>
                    <h1 className="mt-[10px] lg:leading-[54px] leading-[38px] text-[#FFFFFF] font-semibold lg:text-[54px] md:text-[50px] text-[32px] flex items-center justify-center font-[Inter]">Ask us anything</h1>
                    <p className="flex items-center justify-center mt-[21px] font-normal lg:text-[20px] md:text-[18px] text-[16px] leading-[24px] text-center lg:leading-[30px] text-[#FFFFFF] font-[Inter] w-[297px] lg:w-[758px]">Have any questions? We&apos;re here to assist you.</p>

                    <div className="relative text-[#0B303E] focus-within:text-[#0B303E] lg:w-[316px] lg:mb-[64px] w-[290px] lg:mt-[22px] mb-[55px] mt-[27px]">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline text-[#0B303E] items-center">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5 text-[#53686A]"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </span>
                    <input type="text" name="q" id="searchInput" className="py-3 text-[18px] leading-[24px]  text-[#0B303E] lg:w-[316px] w-[290px] bg-[#FFFFFF]   rounded-md pl-10 focus:outline-none focus:bg-white focus:text-[#0B303E] placeholder:text-[#0B303E]" placeholder="Search here"  onChange={(event) => {
                        setsearchTerm(event.target.value);
                    }}/>
                    </div>            
                

                </div>

            </div>



            <div className="place-items-center ">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:mt-[63px] place-items-center lg:gap-3 gap-5 items-center lg:m-15 justify-center m-5">

        {
            data
            .filter((val) => {
                if(searchTerm === ""){
                 return val;
                } else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val;
                }

            })
            .map((val) =>{
                return(
                    <div className="h-full" key={val.id}>
                    <div className="w-[46px] h-[46px]  bg-[#E8DDF2] rounded-full  lg:mt-[64px]">
                        <img src={val.img} className="text-[#5D387F] place-items-center w-[45px] h-[45px] text-x  mx-2 px-3 py-3 ml-[-1px] flex items-center justify-center" alt="tag"/>
                    </div>
                    <h2 className="text-[#393939] text-[16px] lg:text-[22px] mt-[14px] leading-[22px] lg:leading-[30px] font-[500px] lg:w-[433px] w-[323px] font-[Inter]">{val.title}</h2>
                    <p className="text-[#53686A] text-[13px] lg:text-[18px] mt-5 lg:mt-[10px] leading-[18px] lg:leading-[24px] font-normal w-[282px] lg:w-[403px]  md:w-[350px] lg:h-[71px] lg:[403px] font-[Inter]">{val.para}
                    </p>
                    <p className=" text-[#53686A] text-[16px]  leading-[18px] font-normal w-[282px] lg:w-[403px]  md:w-[350px] lg:h-[71px] lg:mt-[30px] mt-[10px]">{val.para2}</p>             
                </div>
                )
            })
        }
       

    </div>       
            </div>

            <FaqFooter/>

    </>

  )
}

export default FaqMain;