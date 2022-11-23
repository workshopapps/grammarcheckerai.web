import { Link } from 'react-router-dom';
import styles from './footer.module.css';
import Logo from '../../../assets/images/grit-white.webp';

const Footer = () => {
  return (
    <footer className={styles._lpfooter}>
      <div className={styles._footer}>
        <div className={styles._ftcolumns}>
          <div className={styles._ftcolLogo}>
            <div className={styles._ftcolcontentImage}>
              <img src={Logo} alt="footer logo" width={200} />
            </div>
          </div>
          <div className={styles._ftcol3}>
            <div className={styles._ftcol3title}>More</div>
            <div className={styles._ftcol3content}>
              <Link to='/signup'>Sign Up</Link>
              <Link to='/signin'>Sign In</Link>
              <Link to='/legal'>Legal</Link>
              <Link to='/terms-of-use'>Terms of use</Link>
            </div>
          </div>
          <div className={styles._ftcol2}>
            <div className={styles._ftcol2title}>Useful Links</div>
            <div className={styles._ftcol2content}>
              <Link to="/faq">FAQ</Link>
              <Link to="/career">Careers and Culture</Link>
              <Link to="/newsletter">Newsletter</Link>
              <Link to='/app-status'>Api Status</Link>
            </div>
          </div>
          <div className={styles._ftcol1}>
            <div className={styles._ftcol1title}>General</div>
            <div className={styles._ftcol1content}>
              <Link to='/home'>Home</Link>
              <Link to='/about'>About</Link>
              <Link to='/blog'>Blog</Link>
              <Link>Testimonial</Link>
            </div>
          </div>
          <div className={styles._ftsidebar}></div>
        </div>
        <div className={styles._ftstarted}>
          <p>
            Get Started for Free <button>Sign Up</button>
          </p>
        </div>
        <div className={styles._ftcopyright}>
          <p>&copy;2022 GrittyGrammar</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
