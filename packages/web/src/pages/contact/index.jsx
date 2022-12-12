/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import ContactCSS from './Contact.module.css';
import PropTypes from 'prop-types';
import flag from '../../assets/flag/NG.png';
import chat from '../../assets/chat/messages-2.png';
import Modal from './Contact_modal/Modal.jsx';
import Footer from '../../modules/static/landing-page/Footer';
import { IconContext } from 'react-icons';
import { AiFillInstagram, AiFillYoutube, AiOutlineUser } from 'react-icons/ai';
import { FaFacebookSquare, FaUserAlt, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail, MdLogin } from 'react-icons/md';
import { BsChatSquareQuote, BsClipboardPlus } from 'react-icons/bs';
import { IoWarningOutline, IoBriefcaseOutline } from 'react-icons/io5';
import toast, { Toaster } from 'react-hot-toast';

const index = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setUserEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setUserMessage] = useState('');
  const [active, setActive] = useState(0);
  const error = (message) => toast.error(message);

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
      .then(() => {
        setOpenModal(true);
      })
      .catch((error) => {
        error(error?.response?.data?.message);
        setOpenModal(false);
      });
    setIsSubmit(true);
    e.target.reset();
  };

  const subjects = [
    {
      state: 1,
      Icon: MdLogin,
      title: 'Login issues',
    },
    {
      state: 2,
      Icon: AiOutlineUser,
      title: 'Account issues',
    },
    {
      state: 3,
      Icon: BsClipboardPlus,
      title: 'Usage issues',
    },
    {
      state: 4,
      Icon: BsChatSquareQuote,
      title: 'Chat issues',
    },
    {
      state: 5,
      Icon: IoWarningOutline,
      title: 'Error Checking',
    },
    {
      state: 6,
      Icon: IoBriefcaseOutline,
      title: 'General inquiry',
    },
  ];

  return (
    <div className={ContactCSS.main_container}>
      <div className={ContactCSS.container}>
        <div className="sm:hidden lg:flex">
          <div className={ContactCSS.hero_container}>
            <p className={ContactCSS.h1}>Contact us</p>
            <p className={ContactCSS.p1}>
              {' '}
              The SpeakBetter App Is Brought To You By The Team at SpeakBetter. If you Have Any Questions Or Feedback,
              Please Don&apos;t Hesitate To Reach Out To Us. We Are Always Happy To Help!
            </p>
          </div>
        </div>
        <div className="sm:flex lg:hidden">
          <div className={ContactCSS.mini_container}>
            <p className={ContactCSS.p2}>Talk to our support team</p>
            <p className={ContactCSS.p3}>
              {' '}
              If you Have Any Questions Or Feedback, Please Don&apos;t Hesitate To Reach Out To Us. We Are Always Happy
              To Help!
            </p>
          </div>
        </div>

        <div className="lg:flex justify-between lg:gap-20 m-2 p-4 lg:ml-8">
          <div className="hidden lg:flex lg:flex-col mt-8 ">
            <div className={ContactCSS.reach}>
              <h2 className={ContactCSS.h2}> Get in touch with us</h2>
              <div className="Numbers">
                <p className={ContactCSS.p4}> Phone Number</p>
                <p className={ContactCSS.p5}>(603) 555-0123</p>
                <p className={ContactCSS.p5}>(239) 555-0108</p>
              </div>
              <div className="Email">
                <p className={ContactCSS.p4}>Email</p>
                <p className={ContactCSS.p5}>manhhachkt08@gmail.com</p>
                <p className={ContactCSS.p5}>tienlapspktnd@gmail.com</p>
                <p className={ContactCSS.p5}>vuhaithuongnute@gmail.com</p>
              </div>
              <div className="Office">
                <p className={ContactCSS.p4}>Nigerian Office</p>
                <p className={ContactCSS.p5}>6391 Elgin St. Celina, Delaware 10299</p>
                <p className={ContactCSS.p5}>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
              </div>
              <div className="Socials">
                <p className={ContactCSS.p4}>Socials Media</p>
                <p className={ContactCSS.p6}>
                  <IconContext.Provider value={{ className: 'mr-2' }}>
                    <div>
                      <AiFillInstagram />
                    </div>
                  </IconContext.Provider>
                  @SpeakBetter
                </p>
                <p className={ContactCSS.p6}>
                  <IconContext.Provider value={{ color: 'red', className: 'mr-2' }}>
                    <div>
                      <AiFillYoutube />
                    </div>
                  </IconContext.Provider>
                  @SpeakBetter
                </p>
                <p className={ContactCSS.p6}>
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
            <form onSubmit={handleSubmit} encType="application/json" className="w-full sm:m-2 lg:w-full">
              <div className={ContactCSS.form}>
                <div className="w-full">
                  <div className="flex flex-col lg:flex-row ">
                    <div className={ContactCSS.element}>
                      <label>First Name</label>
                      <div className={ContactCSS.input_container}>
                        <IconContext.Provider value={{ color: '#8C54BF', className: 'm-2' }}>
                          <div>
                            <FaUserAlt />
                          </div>
                        </IconContext.Provider>
                        <input
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
                      <label>Last Name</label>
                      <div className={ContactCSS.input_container}>
                        <IconContext.Provider value={{ className: 'm-2' }}>
                          <div>
                            <FaUserAlt />
                          </div>
                        </IconContext.Provider>
                        <input
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
                  <label>Email</label>
                  <div className={ContactCSS.input_container}>
                    <IconContext.Provider value={{ className: 'm-2' }}>
                      <div>
                        <MdEmail />
                      </div>
                    </IconContext.Provider>
                    <input
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
                  <label>Phone Number</label>
                  <div className={ContactCSS.input_container}>
                    <IconContext.Provider value={{ className: 'm-2 hidden lg:flex' }}>
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
                    <input
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
                  <label>Subject</label>
                  <div className="">
                    <div className={ContactCSS.boxes}>
                      <div className="flex flex-col mt-2">
                        <div className={`${ContactCSS._grid_layout} grid  m-0 p-0`}>
                          {subjects.map((subject) => (
                            <IconCard
                              key={subject.title}
                              {...subject}
                              active={active}
                              onClick={() => setActive(subject.state)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={ContactCSS.row3}>
                    <label>Message</label>
                    <div className={ContactCSS.textarea_container}>
                      <img src={chat} alt="" className="h-[20px] mt-2" />
                      <textarea
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
      <Toaster />
    </div>
  );
};

export const IconCard = ({ state, Icon, title, active, onClick }) => (
  <button
    className={ContactCSS.box}
    onClick={onClick}
    style={{
      transition: 'all 0.2s ease-in',
      backgroundColor: +active === +state ? '#5D387F' : '#F6F6F6',
      color: +active === +state ? 'white' : 'black',
    }}
  >
    <Icon size={24} color={+active === +state ? 'white' : 'black'} />
    <p className="text-sm">{title}</p>
  </button>
);

IconCard.propTypes = {
  title: PropTypes.string,
  Icon: PropTypes.func,
  onClick: PropTypes.func,
  state: PropTypes.number,
  active: PropTypes.number,
};
export default index;
