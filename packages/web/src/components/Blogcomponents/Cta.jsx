import React from "react"
import Ctaimg from "../blogimg/cuate.svg"

const Cta = () => {
     return(
          <section>
               <div className="p-4 mb-5 md:flex justify-between items-center md:max-w-3xl md:mx-auto">
                    <img src={Ctaimg} alt="" className="mx-auto mb-3 md:mx-0 w-80"  />
                    <div>
                         <h1 className="text-header text-xl font-bold mb-3 text-center xl:text-xl">Enjoyed the read?</h1>

                         <p className="text-cards font-normal text-sm mb-5 mx-auto max-w-xs xl:text-base">Join our monthly newsletter for helpful tips on how to learn languages fluently and AI tecnology.</p>

                         <div className="w-80 mx-auto">
                              <input type="text" className="border border-solid border-input_border bg-input p-2 w-2/3 rounded-l outline-none " placeholder="Your email" />
                              <button className="bg-btn p-2 text-white w-1/3 rounded-r">Subscribe</button>
                         </div>
                    </div>

                    
               </div>
          </section>
     )
}

export default Cta