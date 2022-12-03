import React from "react"
import useTheme from "../../hooks/useTheme"
import Heroimg from "../../assets/blogimg/Frame 1000001903.svg"
import { Link } from "react-router-dom"
import styles from './index.module.css';


const Hero = () => {
     const context = useTheme();
     return(
          <section className="md:mb-8">
               <div className="md:flex px-4 justify-center items-center flex-row-reverse md:max-w-3xl md:mx-auto md:px-0 xl:max-w-6xl">
                    <div className={`mb-4 h-48 md:w-80 md:mb-0 md:p-0 xl:w-1/2 ${styles._img_height}`}>
                         <img src ={Heroimg} alt="Heroimg" className= {`md:w-full h-full object-cover` }/>
                    </div>

                    <div className="md:p-2 md:px-4 md:w-1/2 xl:pr-4 xl:px-0">
                         <h1 className={`text-header ${context.theme === 'dark' ? 'text-white' : null} text-xl font-bold mb-3 text-center md:text-center xl:text-3xl transition-all xl:px-4`}>The Time Is Now for Conversational AI</h1>

                         <p className="font-normal text-justify text-sm mb-3">The ease with which we use computers substantially influences the likelihood that technology may disrupt a particular element of life or business. Computers were far less user-friendly when we needed to enter code into a command line only to load a software However, the mouse and graphical user interfaces made things much simpler, and computers grew from specialist goods to become commonplace. Touch advanced the situation further, contributing to the development of a society in which most individuals wear a computer on their wrist in addition to carrying one in their pocket.<br /><br />

                         What is the upcoming field that will advance human-computer interactions? conversant AI.<br />
                         You may believe that voice interfaces are nothing new because talkative smartphone assistants have been available for more than a decade. But you&apos;ve probably noticed that those assistants have improved in terms of listening skills, conversational skills, and overall usefulness........<Link to="/ai" className="text-header text-sm font-bold mb-3 text-left hover:text-[#5d387f]">Read more</Link></p>
                         
                         
                    </div>  
               </div>
               
          </section>
     )
}

export default Hero