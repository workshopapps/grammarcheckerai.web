import React from 'react'
import Footer from '../../modules/static/landing-page/Footer'
import { useNavigate } from 'react-router-dom';

export default function Trademark() {
  let navigate = useNavigate();
  const handlePrev = () => {
    navigate('/legal');
  };
  return (
    <div>
      <div className='py-14 text-center bg-[#E8DDF2] text-BLACK'>
        <div className="goback pb-30">
          <button onClick={handlePrev} className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-2 ml-10 flex items-center mt-0 lg:absolute w-36 h-12 sm: relative sm:float-top">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='h-10'>
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="48"
                d="M328 112L184 256l144 144"
              />
            </svg>
            <span>Go back</span>
          </button>
        </div>
        <h1 className='md:text-3xl text-2xl font-bold'>Trademark and Copyright Policy</h1>
        <p>Last updated: 12 November, 2022.</p>
      </div>

      <div className='px-5 md:px-10 py-10'>
        <h3 className='font-bold text-xl py-4'>Trademark</h3>
        <p>
          All materials available through this website and other websites owned or provided by Speak Better, including any products, services, and web content including but not limited to software, images, text, and various downloads (“Materials”) are owned by Speak Better.
        </p>

        <h3 className='font-bold text-xl mt-5 py-4'>Copyright</h3>
        <p>
          Materials are protected by copyright, trademark , and other intellectual property laws and all rights in the said materials are reserved by Speak Better or their respective owners. You may view, copy and print pages from the website for personal use only. You may not otherwise use, reproduce, download, modify, store, post, broadcast, transmit, sell, or make available to any party any part of the content of the website without any prior written approval from Speak Better.
        </p>
      </div>
      <Footer />
    </div>
  )
}
