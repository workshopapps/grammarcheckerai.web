import React from 'react';
import close from '../../../../assets/newsletterImages/close-square.png';
import envelope2 from '../../../../assets/newsletterImages/envelope2.png';
import styles from './NewsletterErrorPopUp.module.scss';

const NewsletterErrorPopUp = () => {
  return (
    <section className={styles.newsletter_error}>
      <div className={styles.newsletter_error__card}>
        <div className={styles.newsletter_error__card__close}>
          <img src={close} alt="Close icon" />
        </div>

        <div className={styles.newsletter_error__card__text}>
          <img id="mailIcon" src={envelope2} alt="" />
          <h3>Oops....</h3>
          <p>The email address is already subscribed to our newsletter.</p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterErrorPopUp;
