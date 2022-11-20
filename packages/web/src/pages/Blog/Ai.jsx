import React from "react"
import Heroimg from "../../assets/blogimg/Frame 1000001903.svg"
import Cta from "../../components/Blog/Cta"

const Ai = () => {
     return(
               <section className="mb-10">

               <div className="mt-10 md:max-w-3xl md:mx-auto xl:max-w-5xl">

               <h1 className="text-header text-xl font-bold mb-4 text-center xl:text-3xl">The Time Is Now for Conversational AI</h1>
               
               <div className="text-header text-sm font-bold mb-4 text-center p-4">
                    <span className="mr-3">Home</span>
                    <span className="mr-3">&gt;&gt;&gt;</span>
                    <span className="mr-3">Blog</span>
                    <span className="mr-3">&gt;&gt;&gt;</span>
                    <span className="text-blog">The Time Is Now for Conversational AI</span>
               </div>
                    <div className="p-4 mb-10 md:w-full md:h-full md:mb-10 xl:w-full">
                         <img src ={Heroimg} alt="" className="md:w-full md:h-full" />
                    </div>

                    <div className="p-4 py-4">
                         <p className="font-normal text-base mb-3">
                    The ease with which we use computers substantially influences the likelihood that
                    technology may disrupt a particular element of life or businesses. Computers were far less
                    user-friendly when we needed to enter code into a command line only to load a software.
                    However, the mouse and graphical user interfaces made things much simpler, and
                    computers grew from specialist goods to become commonplace. Touch advanced the
                    situation further, contributing to the development of a society in which most individuals
                    wear a computer on their wrist in addition to carrying one in their pocket.
                    What is the upcoming field that will advance human-computer interactions? conversant
                    AI.
                    </p>
                    <p className="font-normal text-base mb-3">
                    You may believe that voice interfaces are nothing new because talkative smartphone
                    assistants have been available for more than a decade. But you've probably noticed that
                    those assistants have improved in terms of listening skills, conversational skills, and
                    overall usefulness. This is due to a number of technological advancements that have
                    taken place in the background that have improved smartphone experiences as well as the
                    integration of AI-powered voice technologies into a number of new products and use
                    cases.
                    </p>
                    <p className="font-normal text-base mb-3">
                    For instance, BERT, a method for natural language processing that makes speech models
                    more context-aware and easier and faster to train, was open-sourced by Google AI
                    researchers. One of Google's Alphabet siblings, DeepMind, also unveiled WaveNet, which
                    replaced phonetic models with ones that utilize waveforms to forecast which sounds are
                    likely to follow one another in order to produce substantially more realistic-sounding
                    synthetic voices. Both technologies are now deeply embedded and they’re just a few
                    among many examples of advances that help computers not only interact with us more
                    naturally, but also act on our requests more effectively.
                    </p>
                    <p className="font-normal text-base mb-3">
                    Soon, most human-computer interactions may not involve completing a series of set
                         actions — clicking or swiping our way along a well-defined user journey — so much as
                         just talking to machines and expecting them to keep up, even as the conversation
                         changes course or topic.
                    </p>
                    </div>  
               </div>
               <Cta />
               
          </section>
     )
}

export default Ai