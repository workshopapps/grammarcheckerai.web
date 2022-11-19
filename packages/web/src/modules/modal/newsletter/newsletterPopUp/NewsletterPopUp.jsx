// import React, { useState, useEffect } from "react";
import styles from '../newsletterPopUp/NewsletterPopUp.module.scss';
import letter from '../../../../assets/newsletterImages/letter.png';
import close from '../../../../assets/newsletterImages/close-square.png';

const NewsletterPopUp = () => {
  // const [triggerPopUp, setTriggerPopUp] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setTriggerPopUp(true);
  //   }, 3000);
  // }, []);

  return (
    <>
      <section className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_content__closeBtn}>
            <div
              // onClick={()=>setTriggerPopUp(false)}
              className={styles.newsletter_success__card__close}
            >
              <img src={close} alt="Close icon" />
            </div>
          </div>

          <div className={styles.modal_content__text}>
            <img src={letter} alt="Email icon" />

            <div>
              <h3>Subscribe To Our Newsletter</h3>
              <p>
                Sign-up for our weekly newsletter to get the latest news, updates and amazing offers delivered directly
                in your inbox
              </p>
            </div>

            <form>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="Email" placeholder="youremail@example.com" required />
              <button id="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsletterPopUp;
