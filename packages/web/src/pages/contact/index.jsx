import React, { useState } from 'react'
import useTheme from '../../hooks/useTheme'
import ContactCSS from './Contact.module.css'
import login from "../../assets/login.svg"
import user from '../../assets/user.svg'
import flag from '../../assets/flag/NG.png'
import chat from '../../assets/chat/messages-2.png'
import stickynote from '../../assets/stickynote.svg'
import deviceMessage from '../../assets/device-message.svg'
import danger from "../../assets/danger.svg"
import archive from '../../assets/archive.svg'
import Modal from './Contact_modal/Modal.jsx';
import Footer from '../../modules/static/landing-page/Footer';
import { IconContext } from "react-icons";
import { AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import { FaFacebookSquare, FaUserAlt, FaPhoneAlt } from 'react-icons/fa';
import { BsChatFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';


const index = () => {
    const context = useTheme();
    const dark = context.theme === 'dark';
    const [openModal, setOpenModal] = useState(false);

    return (
        <div
            contact-theme={context.theme}
            className={ContactCSS.main_container}>
            <div className={ContactCSS.container}>
            <div className="sm:hidden lg:flex">
              <div   className={ContactCSS.hero_container}>
                  <p

                    className={ContactCSS.h1}>Contact Us
                </p>
                <p
                    
                    className={ContactCSS.p1}> The Gritty App Is Brought To You By The Team at Grit Grammar. If you Have Any Questions Or Feedback, Please Don't Hesitate To Reach Out To Us. We Are Always Happy To Help!</p>
                  </div>
                  </div>
                <div className="sm:flex lg:hidden">
                  <div className={ContactCSS.mini_container}>
                      <p
                        contact-theme={context.theme}
                        className={ContactCSS.p2}>Talk to our support team
                    </p>
                    <p
                        contact-theme={context.theme}
                        className={ContactCSS.p3}> If you Have Any Questions Or Feedback, Please Don't Hesitate To Reach Out To Us. We Are Always Happy To Help!</p>
                      </div>
                      </div>

                <div className="flex justify-between gap-20 m-2 p-4" >
                  <div className="hidden lg:flex lg:flex-col mt-8 ">
                    <div className={ContactCSS.reach}>
                    <h2   contact-theme={context.theme} className={ContactCSS.h2}> Get in touch with us</h2>
                  <div className="Numbers">
                    <p   contact-theme={context.theme} className={ContactCSS.p4}> Phone Number</p>
                      <p   contact-theme={context.theme} className={ContactCSS.p5}>(603) 555-0123</p>
                      <p   contact-theme={context.theme} className={ContactCSS.p5}>(239) 555-0108</p>
                  </div>
                  <div className="Email">
                    <p   contact-theme={context.theme} className={ContactCSS.p4}>Email</p>
                      <p  contact-theme={context.theme}  className={ContactCSS.p5}>manhhachkt08@gmail.com</p>
                      <p  contact-theme={context.theme}  className={ContactCSS.p5}>tienlapspktnd@gmail.com</p>
                      <p   contact-theme={context.theme} className={ContactCSS.p5}>vuhaithuongnute@gmail.com</p>
                  </div>
                  <div className="Office">
                    <p   contact-theme={context.theme} className={ContactCSS.p4}>Nigerian Office</p>
                      <p   contact-theme={context.theme} className={ContactCSS.p5}>6391 Elgin St. Celina, Delaware 10299</p>
                      <p   contact-theme={context.theme} className={ContactCSS.p5}>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                  </div>
                  <div className="Socials">
                    <p   contact-theme={context.theme} className={ContactCSS.p4}>Socials Media</p>
                      <p   contact-theme={context.theme} className={ContactCSS.p6}>
                        <IconContext.Provider value={{ className: "mr-2" }}>
                          <div>
                            <AiFillInstagram />
                          </div>
                        </IconContext.Provider>
                        @SpeakBetter</p>
                      <p   contact-theme={context.theme} className={ContactCSS.p6}>
                        <IconContext.Provider value={{ color: "red", className: "mr-2" }}>
                          <div>
                          <AiFillYoutube />
                          </div>
                          </IconContext.Provider>
                          @SpeakBetter</p>
                      <p   contact-theme={context.theme} className={ContactCSS.p6}>
                        <IconContext.Provider value={{ color: "blue", className: "mr-2" }}>
                          <div>
                          <FaFacebookSquare />
                          </div>
                        </IconContext.Provider>
                        @SpeakBetter</p>
                  </div>
                </div>
                </div>

                <div className="mt-0 lg:mt-8">
                <form className="sm:w-[97vw] sm:m-2 lg:w-full">
                <div className={ContactCSS.form}>
                <div>
                    <div className="flex flex-col lg:flex-row">
                        <div className={ContactCSS.element}>
                            <label contact-theme={context.theme}>First Name</label>
                            <div className={ContactCSS.input_container}>
                            <IconContext.Provider value={{ color: "#8C54BF", className: "m-2" }}>
                              <div>
                              <FaUserAlt/>
                              </div>
                            </IconContext.Provider>
                            <input contact-theme={context.theme} type="text" name='fname' className="w-full lg:w-{50%}" placeholder= ' Mike' />
                            </div>
                        </div>

                        <div className={ContactCSS.element}>
                            <label contact-theme={context.theme}>Last Name</label>
                            <div className={ContactCSS.input_container}>
                            <IconContext.Provider value={{className: "m-2" }}>
                              <div>
                              <FaUserAlt/>
                              </div>
                            </IconContext.Provider>
                            <input contact-theme={context.theme} type="text"  name='lname' className=" w-full lg:w-{50%}" placeholder='Type Name' />
                            </div>
                        </div>
                      </div>
                    </div>

                        <div className={ContactCSS.element2}>
                            <label contact-theme={context.theme}>Email</label>
                            <div className={ContactCSS.input_container}>
                            <IconContext.Provider value={{className: "m-2" }}>
                              <div>
                              <MdEmail />
                              </div>
                            </IconContext.Provider>
                            <input contact-theme={context.theme} type="email" name='email' className="w-full" placeholder='Type Email' />
                        </div>
                        </div>

                        <div className={ContactCSS.element2}>
                            <label contact-theme={context.theme}>Phone Number</label>
                            <div className={ContactCSS.input_container}>
                            <IconContext.Provider value={{className: "m-2 hidden lg:flex" }}>
                              <div>
                              <FaPhoneAlt />
                              </div>
                            </IconContext.Provider>
                            <div className="flex lg:hidden">
                            <div className="flex m-0 p-0">
                            <img src={flag} alt="" className=" h-2/3 mt-1" />
                            <p className="ml-1">+234</p>
                            </div>
                            </div>
                            <input contact-theme={context.theme} type='tel' name='fname' className="w-full ml-4"placeholder='800 000 0000' />
                            </div>

                    </div>

                    <div className={ContactCSS.extra_areas}>
                    <p className={ContactCSS.subject}>Subject</p>

                    <div className="">
                    <div
                        contact-theme={context.theme}
                        className={ContactCSS.boxes}>
                        <div className="flex flex-col mt-2">
                        <div className="hidden lg:grid lg:grid-cols-4 lg:justify-around gap-8 m-0 p-0">
                        <button className={ContactCSS.box}>
                            <img src={login} alt="" />
                            <p className='text-sm'>Login issues</p>
                        </button>

                        <button className={ContactCSS.box}>
                            <img src={user} alt="" />
                            <p className='text-sm'>Account issues</p>
                        </button>

                        <button className={ContactCSS.box}>
                            <img src={stickynote} alt="" />
                            <p className='text-sm'>Usage Issues</p>
                        </button>

                        <button className={ContactCSS.box}>
                            <img src={deviceMessage} alt="" />
                            <p className='text-sm'>Chat issues</p>
                        </button>

                        <button className={ContactCSS.box}>
                            <img src={danger} alt="" />
                            <p className='text-sm'>Error checking</p>
                        </button>

                        <button className={ContactCSS.lastbox}>
                            <img src={archive} alt="" />
                            <p className='text-sm'>General Inquiry</p>
                        </button>

                        </div>

                        <div className="flex lg:hidden sm:gap-8 sm:pl-8 sm:pr-8 sm:items-center sm:justify-center lg:gap-8 p-0">
                        <button className={ContactCSS.box}>
                            <img src={deviceMessage} alt="" />
                            <p className='text-sm'>Chat issues</p>
                        </button>

                        <button className={ContactCSS.box}>
                            <img src={danger} alt="" />
                            <p className='text-sm'>Error checking</p>
                        </button>

                        <button className={ContactCSS.lastbox}>
                            <img src={archive} alt="" />
                            <p className='text-sm'>General Inquiry</p>
                        </button>
                        </div>
                    </div>
                    </div>
                    </div>

                    <div className={ContactCSS.row3}>
                        <label>Message</label>
                        <textarea name="textarea" placeholder='Write your message here' className="text-black"></textarea>
                    </div>
                    <div className={ContactCSS.send}>
                        <button
                          onClick={() => setOpenModal(true)}
                          className={ContactCSS.btn}>
                        Send Message
                        </button>
                      <Modal open={openModal} onClose={() =>setOpenModal(false)}/>
                    </div>
                    </div>
                </div>
                </form>
                </div>
              </div>
            </div>
            <Footer />
        </div>
    );
}

export default index
