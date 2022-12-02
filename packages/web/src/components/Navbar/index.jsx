import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../lib/context/DarkThemeContext';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import logoImg from '../../assets/images/logo2.png';
import logoImgWhite from '../../assets/images/wlogo.png';
import styles from './navbar.module.css';
// eslint-disable-next-line import/no-unresolved
import useMediaQuery from '@mui/material/useMediaQuery';
// eslint-disable-next-line import/no-unresolved
import { Drawer } from '@mui/material';
//Material UI toggle button
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// import MenuIcon from '@mui/icons-material/Menu';
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#5d387f' : '#5d387f',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#5d387f' : '#5d387f',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#5d387f' : '#5d387f',
    borderRadius: 20 / 2,
  },
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');
  
  const navigate = useNavigate();

  const context = useContext(ThemeContext);
  localStorage.setItem('theme', context.theme);
  const toggleDarkMode = () => {
    context.toggle();
  };

  const isTabletOrMobile = useMediaQuery('(max-width: 1000px)');
  const ismobile = useMediaQuery('(max-width: 700px)');

  return (
    <header className={`${styles._header} dark:bg-header bg-white `} nav-theme={context.theme}>
      <button className={styles._nvlogo} onClick={() => navigate('/home')}>
        {context.theme === 'dark' ? <img src={logoImgWhite} alt="gritty" /> : <img src={logoImg} alt="gritty" />}
      </button>

      <FormGroup>
        <FormControlLabel
          className={`${styles._themeswitch} `}
          onClick={toggleDarkMode}
          control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
        />
      </FormGroup>

      <div className={styles._nvmenu}>
        {!isTabletOrMobile && (
          <div className={styles._nvnav}>
            {[
              { title: 'Home', to: '/home' },
              { title: 'Converse', to: '/converse' },
              { title: 'About', to: '/about' },
              { title: 'Blog', to: '/blog' },
              { title: 'Contact', to: '/contact' },
              // { title: 'Log in', to: '/signin' },
            ].map((item) => (
              <NavLink
                to={item.to}
                key={item.title}
                onClick={(e) => setActiveNav(e.target.innerText)}
                className={`${activeNav === item.title ? 'font-bold ' : ''} `}
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        )}
      </div>
      {/* <div className={styles._nvstarted}>
        {isTabletOrMobile && (
          <Link to="#/" className={styles._mobilenav} onClick={() => setOpen(true)}>
            {context.theme === 'dark' ? <MenuOutlinedIcon /> : <MenuIcon className='text-["#3030303"]' />}
          </Link>
        )} 
        {!ismobile && (
          <button onClick={() => navigate('/signup')} className="text-white">
            Get started
          </button>
        )}
        <Drawer open={open} onClose={() => setOpen(false)} className={styles.DrawerNav}>
          <div className={styles._nvnav}>
            {[
              { title: 'Home', to: '/home' },
              { title: 'Converse', to: '/converse' },
              { title: 'About', to: '/about' },
              { title: 'Blog', to: '/blog' },
              { title: 'Contact', to: '/contact' },
              { title: 'Log in', to: '/signin' },
              // { title: 'Sign Up', to: '/signup' },
            ].map((item) => (
              <NavLink
                to={item.to}
                key={item.title}
                onClick={(e) => setActiveNav(e.target.innerText)}
                className={`${activeNav === item.title ? 'font-bold ' : ''} `}
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        </Drawer>
      </div> */}
    </header>
  );
};

export default Navbar;
