/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import styles from '../newsletter/NewsletterPage.module.scss';
import letter from '../../../assets/newsletterImages/letter.png';
import background from '../../../assets/newsletterImages/background.png';
import close from '../../../assets/newsletterImages/close-square.png';
import envelope1 from '../../../assets/newsletterImages/envelope1.png';

// Page should run when the newsletter link on the navbar/footer is clicked

const NewsletterPage = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isClosed, setIsClosed] = useState(false); // To close subscription success modal

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setIsClosed(false);
  };

  return (
    <section className={styles.newsletter}>
      <aside className={styles.newsletter_left}>
        <div className={styles.newsletter_left__text}>
          <img src={letter} alt="Email icon" />

          <div>
            <h3>Subscribe To Our Newsletter</h3>
            <p>
              Sign-up for our weekly newsletter to get the latest news, updates and amazing offers delivered directly in
              your inbox
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="Email" placeholder="Youremail@example.com" required />
            <button id="submit" value={isSubmit}>
              Subscribe
            </button>
          </form>
        </div>
      </aside>

      <aside className={styles.newsletter_right}>
        <img src={background} alt="reminder icon" />
      </aside>

      {isSubmit ? isClosed : null}
      {isClosed ? null : (
        <div className={styles.newsletter_success}>
          <div className={styles.newsletter_success__card}>
            <div onClick={() => setIsClosed(true)} className={styles.newsletter_success__card__close}>
              <img className={styles.newsletter_success__card__close_img} src={close} alt="Close icon" />
            </div>

            <div className={styles.newsletter_success__card__text}>
              <img className={styles.newsletter_success__card__text_img} id="mailIcon" src={envelope1} alt="" />
              <h3>Thanks for your subscription</h3>
              <p>
                We have sent an email to Grittygrammergmail.com to confirm the validity of our email address. after
                receiving the email follow the link provided to complete your registration.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsletterPage;
