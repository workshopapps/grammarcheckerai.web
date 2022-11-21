import React from "react"
import Heroimg from "../../assets/blogimg/Frame 1000001903.svg"
import { Link } from "react-router-dom"
import Ai from "../../pages/Blog/Ai"

const Hero = () => {
     return(
          <section className="mb-10">
               <div className="md:flex justify-between items-center flex-row-reverse md:max-w-3xl md:mx-auto xl:max-w-5xl">
                    <div className="p-4 mb-4 md:w-80 md:h-full md:mb-0 md:p-0 xl:w-3/4">
                         <img src ={Heroimg} alt="Heroimg" className="md:w-full md:h-full" />
                    </div>

                    <div className="p-4 md:p-6">
                         <h1 className="text-header text-xl font-bold mb-3 text-center md:text-left xl:text-3xl">The Time Is Now for Conversational AI</h1>

                         <p className="font-normal text-sm mb-3 md:w-80">When we needed to punch code into a command line just to load a program, computers were far less user-friendly. But the mouse and graphical interfaces made things much easier, and computers blossomed from niche products into the mainstream.....</p>
                         
                         <Link to={Ai} className="text-header text-sm font-bold mb-3 text-left">Read more</Link>
                    </div>  
               </div>
               
          </section>
     )
}

export default Hero