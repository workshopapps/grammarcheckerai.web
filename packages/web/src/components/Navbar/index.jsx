import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../lib/context/DarkThemeContext';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import logoImg from '../../assets/images/logo2.png';
import logoImgWhite from '../../assets/images/wlogo.png';
import styles from './navbar.module.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Drawer } from '@mui/material';
import { BsList } from 'react-icons/bs';
import {
  FaHome,
  FaBlog,
  FaMoneyBillWave,
  FaEnvelopeOpenText,
  FaSignInAlt,
  FaUsers,
  FaRegComments,
} from 'react-icons/fa';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  const navigate = useNavigate();

  const context = useContext(ThemeContext);
  localStorage.setItem('theme', context.theme);

  const handleNavigate = () => {
    navigate('/signup');
  };

  const isTabletOrMobile = useMediaQuery('(max-width: 1000px)');
  const ismobile = useMediaQuery('(max-width: 700px)');

  return (
    <header className={`${styles._header} dark:bg-header bg-white `}>
      <button className={styles._nvlogo} onClick={() => navigate('/home')}>
        {context.theme === 'dark' ? <img src={logoImgWhite} alt="gritty" /> : <img src={logoImg} alt="gritty" />}
      </button>
      <div className={styles._nvmenu}>
        {!isTabletOrMobile && (
          <div className={`${styles._nvnav} space-x-3`}>
            {[
              { title: 'Home', to: '/home' },
              { title: 'Converse', to: '/converse' },
              { title: 'About', to: '/about' },
              { title: 'Blog', to: '/blog' },
              { title: 'Premium', to: '/premium' },
              { title: 'Contact', to: '/contact' },
              { title: 'Quiz', to: '/startgame' },
            ].map((item) => (
              <NavLink to={item.to} key={item.title} className={({ isActive }) => `${isActive ? 'font-bold' : ''}`}>
                {item.title}
              </NavLink>
            ))}
          </div>
        )}
      </div>
      {
        <div className={styles._nvstarted}>
          {isTabletOrMobile && (
            <Link to="#/" className={styles._mobilenav} onClick={() => setOpen(true)}>
              {context.theme === 'dark' ? <BsList /> : <BsList className='text-["#3030303"]' />}
            </Link>
          )}
          {!ismobile && (
            <button onClick={handleNavigate} className="text-white">
              Get started
            </button>
          )}
          <Drawer open={open} onClose={() => setOpen(false)} className={styles.DrawerNav}>
            <div className="flex justify-between px-6 pt-3">
              <Link to="/">
                <img src={logoImg} alt="speak better" className="" />
              </Link>
              <button onClick={() => setOpen(false)}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.2266 19.7732L19.7732 12.2266"
                    stroke="#393939"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.7732 19.7732L12.2266 12.2266"
                    stroke="#393939"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.0001 29.3337H20.0001C26.6667 29.3337 29.3334 26.667 29.3334 20.0003V12.0003C29.3334 5.33366 26.6667 2.66699 20.0001 2.66699H12.0001C5.33341 2.66699 2.66675 5.33366 2.66675 12.0003V20.0003C2.66675 26.667 5.33341 29.3337 12.0001 29.3337Z"
                    stroke="#393939"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className={styles._nvnav}>
              {[
                { icon: <FaHome className="mx-3" />, title: 'Home', to: '/home' },
                { icon: <FaRegComments className="mx-3" />, title: 'Converse', to: '/converse' },
                { icon: <FaUsers className="mx-3" />, title: 'About', to: '/about' },
                { icon: <FaBlog className="mx-3" />, title: 'Blog', to: '/blog' },
                { icon: <FaMoneyBillWave className="mx-3" />, title: 'Premium', to: '/premium' },
                { icon: <FaEnvelopeOpenText className="mx-3" />, title: 'Contact', to: '/contact' },
                { icon: <FaSignInAlt className="mx-3" />, title: 'Log in', to: '/signin' },
                // { title: 'Sign Up', to: '/signup' },
              ].map((item) => (
                <NavLink
                  to={item.to}
                  key={item.title}
                  onClick={(e) => {
                    setActiveNav(e.target.innerText);
                    setOpen(false);
                  }}
                  className={`${
                    activeNav === item.title ? 'font-bold ' : ''
                  } flex items-center border-8 border-white font-medium text-[#392150] hover:bg-[#392150] hover:text-white rounded-full transition ease-in-out duration-300`}
                >
                  {item.icon}
                  {item.title}
                </NavLink>
              ))}
            </div>
          </Drawer>
        </div>
      }
    </header>
  );
};

export default Navbar;
