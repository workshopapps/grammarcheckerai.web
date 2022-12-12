import React, { useState, useEffect } from 'react';
import Ctaimg from '../../assets/blogimg/cuate.svg';
import axios from 'axios';
import useTheme from '../../hooks/useTheme';
import toast, { Toaster } from 'react-hot-toast';
import styles from './index.module.css';

const Cta = () => {
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
      error('Please enter a valid email!');
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
          } else {
            error('Already subscribed');
          }
        })
        .catch((err) => {
          console.log(err);
          error(err?.response?.data?.message);
        });
    }
  };
  const context = useTheme();
  const dark = context.theme === 'dark';

  return (
    <section>
      <div className={styles._newsletter}>
        <div className="p-4 px-10 mb-10 md:flex justify-between items-center md:max-w-3xl md:mx-auto">
          <img src={Ctaimg} alt="" className="mx-auto mb-3 md:mx-0 w-80" />

          <div className="md:pl-8">
            <h1 className={`text-header ${dark ? 'text-white' : null} text-xl font-bold mb-3 text-center xl:text-xl`}>
              Enjoyed the read?
            </h1>

            <p
              className={` ${
                context.theme === 'dark' ? 'text-white' : null
              } font-normal text-sm mb-5 mx-auto max-w-xs xl:text-base`}
            >
              Join our monthly newsletter for helpful tips on how to learn languages fluently and AI tecnology.
            </p>

            <div className="w-80 mx-auto">
              <form onSubmit={handleSubmit}>
                <input
                  className="border border-solid border-input_border bg-input p-2 w-2/3 rounded-l outline-none "
                  placeholder="Your email"
                  type="email"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <button className="bg-btn p-2 text-white w-1/3 rounded-r hover:bg-[#392150] ease-in-out duration-[.4s] transition-colors">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </section>
  );
};

export default Cta;
