import { Link } from 'react-router-dom';
import styles from './footer.module.css';
import Logo from '../../../assets/images/wlogo.png';
import AppStore from '../../../assets/images/applestore.png';
import GoogleStore from '../../../assets/images/googlestore.png';
import facebookimg from '../../../assets/footer/facebook.png';
import youtubeimg from '../../../assets/footer/youtube.png';
import instagramimg from '../../../assets/footer/insta.png';

const Footer = () => {
  return (
    <footer className={styles._lpfooter}>
      <div className={styles._footer}>
        <div className={styles._ftcolumns}>
          <div className={styles._ftcolLogo}>
            <div className={styles._ftcolcontentImage}>
              <img src={Logo} alt="footer logo" />
            </div>
            <div className="space-x-6 my-6 flex items-center justify-center ml-16">
              <img src={instagramimg} alt="insta" />
              <img src={facebookimg} alt="fb" />
              <img src={youtubeimg} alt="yt" />
            </div>
          </div>
          <div className="flex space-x-16 lg:space-x-0 lg:justify-around lg:w-1/2">
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

            <div className={styles._ftcol2}>
              <div className={styles._ftcol2title}>Resources</div>
              <div className={styles._ftcol2content}>
                <Link to="/faq">FAQ</Link>
                <Link to="/career">Careers and Culture</Link>
                <Link to="/newsletter">Newsletter</Link>
                <Link to="/legal">Legal</Link>
                <Link to="/terms-of-use">Terms of Use</Link>
              </div>
            </div>
          </div>

          <div className="my-4 lg:space-y-4 flex items-center space-x-4 lg:space-x-0 lg:block">
            <img src={AppStore} alt="" className="w-1/3 lg:w-5/6 " />
            <img src={GoogleStore} alt="" className="w-1/3 lg:w-5/6 " />
          </div>
        </div>
        <div className={styles._ftcopyright}>
          <p>&copy;2022 GrittyGrammar</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
