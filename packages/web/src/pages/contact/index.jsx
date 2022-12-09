import React, { useState } from 'react';
import axios from 'axios';
import useTheme from '../../hooks/useTheme';
import ContactCSS from './Contact.module.css';
import login from '../../assets/login.svg';
import user from '../../assets/user.svg';
import flag from '../../assets/flag/NG.png';
import chat from '../../assets/chat/messages-2.png';
import stickynote from '../../assets/stickynote.svg';
import deviceMessage from '../../assets/device-message.svg';
import danger from '../../assets/danger.svg';
import archive from '../../assets/archive.svg';
import Modal from './Contact_modal/Modal.jsx';
import Footer from '../../modules/static/landing-page/Footer';
import { IconContext } from 'react-icons';
import { AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import { FaFacebookSquare, FaUserAlt, FaPhoneAlt } from 'react-icons/fa';
import { BsChatFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

const index = () => {
  const context = useTheme();
  const dark = context.theme === 'dark';
  const [openModal, setOpenModal] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setUserEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setUserMessage] = useState('');
  const [active, setActive] = useState(0);

  const setClick = (num) => {
    if (active === num) {
      setActive(0);
    } else {
      setActive(num);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'post',
      url: 'https://api.speakbetter.hng.tech/v1/contact',
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        message: message,
      },
    })
      .then((response) => {
        console.log(response);
        setOpenModal(true);
      })
      .catch((error) => {
        console.log(error);
        setOpenModal(false);
      });
    setIsSubmit(true);
    e.target.reset();
  };

  return (
    <div contact-theme={context.theme} className={ContactCSS.main_container}>
      <div className={ContactCSS.container}>
        <div className="sm:hidden lg:flex">
          <div className={ContactCSS.hero_container}>
            <p className={ContactCSS.h1}>Contact us</p>
            <p className={ContactCSS.p1}>
              {' '}
              The SpeakBetter App Is Brought To You By The Team at SpeakBetter. If you Have Any Questions Or Feedback,
              Please Don't Hesitate To Reach Out To Us. We Are Always Happy To Help!
            </p>
          </div>
        </div>
        <div className="sm:flex lg:hidden">
          <div className={ContactCSS.mini_container}>
            <p contact-theme={context.theme} className={ContactCSS.p2}>
              Talk to our support team
            </p>
            <p contact-theme={context.theme} className={ContactCSS.p3}>
              {' '}
              If you Have Any Questions Or Feedback, Please Don't Hesitate To Reach Out To Us. We Are Always Happy To
              Help!
            </p>
          </div>
        </div>

        <div className="flex justify-between gap-20 m-2 p-4 ml-8">
          <div className="hidden lg:flex lg:flex-col mt-8 ">
            <div className={ContactCSS.reach}>
              <h2 contact-theme={context.theme} className={ContactCSS.h2}>
                {' '}
                Get in touch with us
              </h2>
              <div className="Numbers">
                <p contact-theme={context.theme} className={ContactCSS.p4}>
                  {' '}
                  Phone Number
                </p>
                <p contact-theme={context.theme} className={ContactCSS.p5}>
                  (603) 555-0123
                </p>
                <p contact-theme={context.theme} className={ContactCSS.p5}>
                  (239) 555-0108
                </p>
              </div>
              <div className="Email">
                <p contact-theme={context.theme} className={ContactCSS.p4}>
                  Email
                </p>
                <p contact-theme={context.theme} className={ContactCSS.p5}>
                  Enquiries@SpeakBetter.com
                </p>
                <p contact-theme={context.theme} className={ContactCSS.p5}>
                  Complaints@Speakbetter.com
                </p>
              </div>
              <div className="Office">
                <p contact-theme={context.theme} className={ContactCSS.p4}>
                  Nigerian Office
                </p>
                <p contact-theme={context.theme} className={ContactCSS.p5}>
                  6391 Elgin St. Celina, Delaware 10299
                </p>
                <p contact-theme={context.theme} className={ContactCSS.p5}>
                  1901 Thornridge Cir. Shiloh, Hawaii 81063
                </p>
              </div>
              <div className="Socials">
                <p contact-theme={context.theme} className={ContactCSS.p4}>
                  Socials Media
                </p>
                <p contact-theme={context.theme} className={ContactCSS.p6}>
                  <IconContext.Provider value={{ className: 'mr-2' }}>
                    <div>
                      <AiFillInstagram />
                    </div>
                  </IconContext.Provider>
                  @SpeakBetter
                </p>
                <p contact-theme={context.theme} className={ContactCSS.p6}>
                  <IconContext.Provider value={{ color: 'red', className: 'mr-2' }}>
                    <div>
                      <AiFillYoutube />
                    </div>
                  </IconContext.Provider>
                  @SpeakBetter
                </p>
                <p contact-theme={context.theme} className={ContactCSS.p6}>
                  <IconContext.Provider value={{ color: 'blue', className: 'mr-2' }}>
                    <div>
                      <FaFacebookSquare />
                    </div>
                  </IconContext.Provider>
                  @SpeakBetter
                </p>
              </div>
            </div>
          </div>

          <div className="mt-0 lg:mt-8 mx-auto">
            <form onSubmit={handleSubmit} encType="application/json" className="sm:w-[100%] sm:m-2 lg:w-full">
              <div className={ContactCSS.form}>
                <div>
                  <div className="flex flex-col lg:flex-row">
                    <div className={ContactCSS.element}>
                      <label contact-theme={context.theme}>First Name</label>
                      <div className={ContactCSS.input_container}>
                        <IconContext.Provider value={{ color: '#8C54BF', className: 'm-2' }}>
                          <div>
                            <FaUserAlt />
                          </div>
                        </IconContext.Provider>
                        <input
                          contact-theme={context.theme}
                          required
                          type="text"
                          name="firstName"
                          id="first_name"
                          className=" w-full lg:w-{50%}"
                          placeholder="Mike"
                          onChange={(e) => setFirstName(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className={ContactCSS.element}>
                      <label contact-theme={context.theme}>Last Name</label>
                      <div className={ContactCSS.input_container}>
                        <IconContext.Provider value={{ className: 'm-2' }}>
                          <div>
                            <FaUserAlt />
                          </div>
                        </IconContext.Provider>
                        <input
                          contact-theme={context.theme}
                          required
                          type="text"
                          name="lastName"
                          id="last_name"
                          className=" w-full lg:w-{50%}"
                          placeholder="Type Name"
                          onChange={(e) => setLastName(event.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={ContactCSS.element2}>
                  <label contact-theme={context.theme}>Email</label>
                  <div className={ContactCSS.input_container}>
                    <IconContext.Provider value={{ className: 'm-2' }}>
                      <div>
                        <MdEmail />
                      </div>
                    </IconContext.Provider>
                    <input
                      contact-theme={context.theme}
                      required
                      type="email"
                      name="email"
                      id="email"
                      className="w-full"
                      placeholder="Type Email"
                      onChange={(e) => setUserEmail(event.target.value)}
                    />
                  </div>
                </div>

                <div className={ContactCSS.element2}>
                  <label contact-theme={context.theme}>Phone Number</label>
                  <div className={ContactCSS.input_container}>
                    <IconContext.Provider value={{ className: 'm-2 hidden lg:flex' }}>
                      <div>
                        <FaPhoneAlt />
                      </div>
                    </IconContext.Provider>
                    <div className="flex lg:hidden">
                      <div className="flex m-0 p-0">
                        <img src={flag} alt="" className=" h-2/3 mt-1" />
                        <p contact-theme={context.theme} className="ml-1">
                          +234
                        </p>
                      </div>
                    </div>
                    <input
                      contact-theme={context.theme}
                      required
                      type="tel"
                      name="phoneNumber"
                      id="phone_number"
                      className="w-full ml-8 lg:ml-4"
                      placeholder="800 000 0000"
                      onChange={(e) => setPhoneNumber(event.target.value)}
                    />
                  </div>
                </div>

                <div className={ContactCSS.extra_areas}>
                  <label contact-theme={context.theme}>Subject</label>

                  <div className="">
                    <div contact-theme={context.theme} className={ContactCSS.boxes}>
                      <div className="flex flex-col mt-2">
                        <div className="hidden lg:grid lg:grid-cols-4 lg:justify-around gap-8 m-0 p-0">
                          <button
                            className={ContactCSS.box}
                            onClick={() => setClick(1)}
                            style={{
                              backgroundColor: active == 1 ? '#5D387F' : '#F6F6F6',
                              color: active === 1 ? 'white' : 'black',
                            }}
                          >
                            <img src={login} alt="" />
                            <p className="text-sm">Login issues</p>
                          </button>

                          <button
                            className={ContactCSS.box}
                            onClick={() => setClick(2)}
                            style={{
                              backgroundColor: active === 2 ? '#5D387F' : '#F6F6F6',
                              color: active === 2 ? 'white' : 'black',
                            }}
                          >
                            <img src={user} alt="" />
                            <p className="text-sm">Account issues</p>
                          </button>

                          <button
                            className={ContactCSS.box}
                            onClick={() => setClick(3)}
                            style={{
                              backgroundColor: active === 3 ? '#5D387F' : '#F6F6F6',
                              color: active === 3 ? 'white' : 'black',
                            }}
                          >
                            <img src={stickynote} alt="" />
                            <p className="text-sm">Usage Issues</p>
                          </button>

                          <button
                            className={ContactCSS.box}
                            onClick={() => setClick(4)}
                            style={{
                              backgroundColor: active === 4 ? '#5D387F' : '#F6F6F6',
                              color: active === 4 ? 'white' : 'black',
                            }}
                          >
                            <img src={deviceMessage} alt="" />
                            <p className="text-sm">Chat issues</p>
                          </button>

                          <button
                            className={ContactCSS.box}
                            onClick={() => setClick(5)}
                            style={{
                              backgroundColor: active === 5 ? '#5D387F' : '#F6F6F6',
                              color: active === 5 ? 'white' : 'black',
                            }}
                          >
                            <img src={danger} alt="" />
                            <p className="text-sm">Error checking</p>
                          </button>

                          <button
                            className={ContactCSS.lastbox}
                            onClick={() => setClick(6)}
                            style={{
                              backgroundColor: active === 0 ? '#5D387F' : '#F6F6F6',
                              color: active === 0 ? 'white' : 'black',
                            }}
                          >
                            <img src={archive} alt="" />
                            <p className="text-sm">General Inquiry</p>
                          </button>
                        </div>

                        <div className="flex gap-8 pl-8 pr-8 items-center justify-center lg:hidden p-0">
                          <button
                            className={ContactCSS.box}
                            onClick={() => setClick(4)}
                            style={{
                              backgroundColor: active === 4 ? '#5D387F' : '#F6F6F6',
                              color: active === 4 ? 'white' : 'black',
                            }}
                          >
                            <img src={deviceMessage} alt="" />
                            <p className="text-sm">Chat issues</p>
                          </button>

                          <button
                            className={ContactCSS.box}
                            onClick={() => setClick(5)}
                            style={{
                              backgroundColor: active === 5 ? '#5D387F' : '#F6F6F6',
                              color: active === 5 ? 'white' : 'black',
                            }}
                          >
                            <img src={danger} alt="" />
                            <p className="text-sm">Error checking</p>
                          </button>

                          <button
                            className={ContactCSS.lastbox}
                            onClick={() => setClick(6)}
                            style={{
                              backgroundColor: active === 0 ? '#5D387F' : '#F6F6F6',
                              color: active === 0 ? 'white' : 'black',
                            }}
                          >
                            <img src={archive} alt="" />
                            <p className="text-sm">General Inquiry</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={ContactCSS.row3}>
                    <label contact-theme={context.theme}>Message</label>
                    <div className={ContactCSS.textarea_container}>
                      <img src={chat} alt="" className="h-[20px] mt-2" />
                      <textarea
                        contact-theme={context.theme}
                        required
                        name="message"
                        id="message"
                        placeholder="Type message"
                        className="m-1"
                        onChange={(e) => setUserMessage(event.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className={ContactCSS.send}>
                    <button id="submit" value={isSubmit} type="submit" className={ContactCSS.btn}>
                      Send Message
                    </button>
                    <Modal open={openModal} onClose={() => setOpenModal(false)} />
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
};

export default index;
