import React from 'react'
import Footer from '../../modules/static/landing-page/Footer'

export default function Trademark() {
  return (
    <div>
         <div className='py-14 text-center bg-[#E8DDF2] text-BLACK'>
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
