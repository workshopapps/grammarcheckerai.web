/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styles from '../emailtemplate/EmailTemplate.module.scss';
import logo from '../../../assets/newsletterImages/logo.png';
import close from '../../../assets/newsletterImages/close-square.png';
import arrow from '../../../assets/newsletterImages/arrow-left.png';
import skill from '../../../assets/newsletterImages/skill.png';
import recentErrors from '../../../assets/newsletterImages/recentErrors.png';
import chatHistory from '../../../assets/newsletterImages/chatHistory.png';
import facebook from '../../../assets/newsletterImages/facebook.png';
import youtube from '../../../assets/newsletterImages/youtube.png';
import linkedin from '../../../assets/newsletterImages/linkedin.png';
import twitter from '../../../assets/newsletterImages/twitter.png';
import instagram from '../../../assets/newsletterImages/instagram.png';
import text2speech from '../../../assets/newsletterImages/text2speech.png';

const EmailTemplate = () => {
  return (
    <section className={styles.email}>
      <div className={styles.email_nav}>
        <div className={styles.email_nav__btn}>
          <img src={arrow} alt="arrow icon" />
          <img src={close} alt="close button icon" />
        </div>
        <div className={styles.email_nav__logo}>
          <img src={logo} alt="" />
          <h4>Speak Better</h4>
        </div>
      </div>

      <div className={styles.email_content}>
        <div className={styles.email_content__top}>
          <div>
            <img src={skill} alt="" />
          </div>

          <div>
            <h3>Improve your speaking skill to the max</h3>
            <p>
              Welcome to Speak Better, It's great to have you! Here are a bunch of features that will get your
              speaking up to speed
            </p>
          </div>
        </div>

        <div className={styles.email_content__bottom}>
          <img src={recentErrors} alt="" />
          <div>
            <h4>Speak Better</h4>
            <p>
              Learn from your mistakes with Speak Better.Get comprehensive description and tips for how to avoid similar
              mistakes in the future
            </p>
          </div>
        </div>

        <div className={styles.email_content__bottom}>
          <div>
            <h4>History storage</h4>
            <p>Keep all of your documents/ audio safe and secure on one place. Never lose a draft again!</p>
          </div>
          <img src={chatHistory} alt="" />
        </div>

        <div className={styles.email_content__bottom}>
          <img src={text2speech} alt="" />
          <div>
            <h4>Text-to-speech</h4>
            <p>This feature that allows you to hear written text, for those moments where you're unable to read it.</p>
          </div>
        </div>

        <div className={styles.email_content__btn}>
          <button>Learn More</button>
        </div>

        <hr />

        <div className={styles.email_content__links}>
          <img src={twitter} alt="" />
          <img src={linkedin} alt="" />
          <img src={facebook} alt="" />
          <img src={instagram} alt="" />
          <img src={youtube} alt="" />
        </div>

        <div className={styles.email_content__policy}>
          <p>You're receiving this email because you are a subscriber of Speak Better</p>
          <p>If you feel you received it by mistake or wish to unsubscribe, click here</p>
        </div>
      </div>
    </section>
  );
};

export default EmailTemplate;
