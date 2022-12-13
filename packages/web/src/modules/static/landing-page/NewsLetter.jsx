import React, { useRef, useState, useEffect } from 'react';
import useTheme from '../../../hooks/useTheme';
import styles from './styles/index.module.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const NewsLetter = () => {
  const email = useRef();
  const [isSubmit, setIsSubmit] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [unsubscribedEmail, setUnsubscribedEmail] = useState('');
  const error = (message) => toast.error(message);
  const success = (message) => toast.success(message);
  const url = `https://api.speakbetter.hng.tech/v1/subscribe/newsletter/confirm`;


  useEffect(() => {
    localStorage.setItem('email', userEmail);
    localStorage.setItem('unsubscribed', unsubscribedEmail);
  }, [userEmail, unsubscribedEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userEmail === '') {
      error('Please enter your email!');
      return;
    } else {
      axios
        .post(url, {
          email: userEmail,
          unsubscribed: unsubscribedEmail,
        })
        .then((res) => {
          if (userEmail || unsubscribedEmail) {
            console.log(res);
            success(res.data.message);
             setUserEmail('')
          } else {
            error('Already subscribed');
            setUserEmail('')
          }
        })
        .catch((err) => {
          console.log(err);
          error(err?.response?.data?.message);
        });
    }

    
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
        Subscribe to our newsletter and be the first to know about new updates and news, but no spam, scouts honor!
      </p>

      <form onSubmit={handleSubmit} encType="application/json" className="relative md:w-[80%] flex ">
        <input
          type="email"
          value={userEmail}
          onChange={(event) => setUserEmail(event.target.value)}
          id="email"
          name="email"
          placeholder="youremail@example.com"         
          className={`${styles.subscribe} rounded-tl-md rounded-bl-md text-black bg-gray-200 py-4 px-3 w-[100%] shadow-sm`}
        />
        <button
          type="submit"
          value={isSubmit}
          className={` py-4 px-7 bg-[#5D387F] text-[#E8DDF2] rounded-tr-md rounded-br-md hover:bg-[#392150] hover:text-white transition-colors`}
        >
          Subscribe
        </button>
      </form>
       <Toaster />
    </section>
  );
};

export default NewsLetter;
