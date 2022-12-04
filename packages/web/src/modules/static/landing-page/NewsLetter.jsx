import React, { useRef, useState, useEffect } from 'react';
import useTheme from '../../../hooks/useTheme';
import styles from './styles/index.module.css';
import axios from 'axios';

const NewsLetter = () => {
  const email = useRef();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const user = localStorage.getItem('emailData');
  // console.log(user);

  useEffect(() => {
    if (user === userEmail) {
      setIsError(true);
    }
  }, [userEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'https://api.speakbetter.hng.tech/v1/subscribe/newsletter/confirm',
      data: {
        email: 'egwuenuprecious7@gmail.com'
      }
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })

    if (email.current.value !== '') {
      localStorage.setItem('emailData', email.current.value);
    }
    setIsSubmit(true);
  };
  const context = useTheme();
  return (
    <section
      className={`${
        context.theme === 'dark' ? 'bg-transparent text-white' : null
      } w-[90%] md:w-[60%] mx-auto text-center flex flex-col justify-center 
        md:items-start md:ml-[10em] gap-5 my-36 py-8`}
    >
      <h5 className="text-xl md:text-3xl font-black -mb-2">Be the first to know</h5>
      <p className="text-center md:text-left">
        Subscribe to out newsletter and be the first to know about new updates and news, but no spam, scouts honor!
      </p>

      <form onSubmit={handleSubmit} encType="application/json" className="relative md:w-[80%] flex ">
        <input
            type="email"
            ref={email}
            onChange={(event) => setUserEmail(event.target.value)}
            id="email"
            name="Email"
            placeholder="Youremail@example.com"
            required
          className={`${styles.subscribe} rounded-tl-md rounded-bl-md text-black bg-gray-200 placeholder:text-black py-4 px-3 w-[100%] shadow-sm`}
        />
        <button
          type="submit"
          value={isSubmit}
          className={` py-4 px-7 bg-[#5D387F] text-[#E8DDF2] rounded-tr-md rounded-br-md hover:bg-[#392150] hover:text-white transition-colors`}
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default NewsLetter;
