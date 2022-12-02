import { Link } from 'react-router-dom';
import styles from './footer.module.css';
import Logo from '../../../assets/images/logo2.png';

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
        
          <div className={styles._ftcol2}>
            <div className={styles._ftcol2title}>Resources</div>
            <div className={styles._ftcol2content}>
              <Link to="/faq">FAQ</Link>
              <Link to="/career">Careers and Culture</Link>
              <Link to="/newsletter">Newsletter</Link>
              <Link to="/legal">Legal</Link>
              <Link to="/terms">Terms of Use</Link>
            </div>
          </div>
          <div className={styles._ftcol1}>
            <div className={styles._ftcol1title}>Products</div>
            <div className={styles._ftcol1content}>
              <Link to="/home">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/testimonials">Testimonial</Link>
              <Link to="/api-status">API status</Link>
            </div>
          </div>
          <div className={styles._ftsidebar}></div>
        </div>
       
        <div className={styles._ftcopyright}>
          <p>&copy;2022 GrittyGrammar</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
