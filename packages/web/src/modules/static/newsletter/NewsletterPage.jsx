/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NewsletterErrorPopUp from '../../modal/newsletter/newsletterErrorPopUp/NewsletterErrorPopUp';
import styles from '../newsletter/NewsletterPage.module.scss';
import logo from '../../../assets/images/newsletter.logo.png';
import letter from '../../../assets/newsletterImages/letter.png';
import background from '../../../assets/newsletterImages/background.png';
import close from '../../../assets/newsletterImages/close-square.png';
import envelope1 from '../../../assets/newsletterImages/envelope1.png';
import axios from 'axios';

const NewsletterPage = () => {
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
        email: userEmail
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

  const navigate = useNavigate();

  return (
    <div className={styles.newsletterPage}>
      <section className={styles.newsletter}>
        <aside className={styles.newsletter_left}>
            <div className={styles.newsletter_left__logo}>
              <button onClick={() => navigate(-1)} className="text-[#5D387F]">
              {' '}
              &lt; Back{' '}
              </button>
            </div>
            <div className={styles.newsletter_left__text}>
              <img src={letter} alt="Email icon" />

              <div>
                <h3>Subscribe To Our Newsletter</h3>
                <p>
                  Sign-up for our weekly newsletter to get the latest news, updates and amazing offers delivered
                  directly in your inbox
                </p>
              </div>

              <form onSubmit={handleSubmit} encType="application/json">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  ref={email}
                  onChange={(event) => setUserEmail(event.target.value)}
                  id="email"
                  name="Email"
                  placeholder="Youremail@example.com"
                  required
                />
                <button id="submit" value={isSubmit} type="submit">
                  Subscribe
                </button>
              </form>
            </div>
        </aside>

        <aside className={styles.newsletter_right}>
          <img src={background} alt="reminder icon" />
        </aside>

        {isSubmit && (
          <div className={styles.newsletter_success}>
            <div className={styles.newsletter_success__card}>
              <div onClick={() => setIsSubmit(false)} className={styles.newsletter_success__card__close}>
                <img className={styles.newsletter_success__card__close_img} src={close} alt="Close icon" />
              </div>

              <div className={styles.newsletter_success__card__text}>
                <img className={styles.newsletter_success__card__text_img} id="mailIcon" src={envelope1} alt="" />
                <h3>Thanks for your subscription</h3>
                <p>
                  We have sent an email to speakbetter@gmail.com to confirm the validity of our email address. after
                  receiving the email follow the link provided to complete your registration.
                </p>
              </div>
            </div>
          </div>
        )}
        {isError && <NewsletterErrorPopUp setIsError={setIsError} />}
      </section>
    </div>
  );
};

export default NewsletterPage;
