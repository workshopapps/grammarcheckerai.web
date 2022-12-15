import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/simple_logo.svg';
import SidebarLink from '../SidebarLink';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { BsDownload, BsClock, BsFillPersonLinesFill, BsArrowBarRight } from 'react-icons/bs';
import LogOutModal from './LogOutModal';
import { Avatar } from '@mui/material';
import logoImgWhite from '../../assets/images/logo2.png';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Drawer, IconButton } from '@mui/material';
import { BsList } from 'react-icons/bs';
import styles from '../Navbar/navbar.module.css';

function DashboardLayout() {
  const [open, setOpen] = React.useState(false);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userData = JSON.parse(localStorage.getItem('isUserDetails'));
  const isTabletOrMobile = useMediaQuery('(max-width: 765px)');
  const location = useLocation();

  React.useEffect(() => {
    setDrawerOpen(false);
  }, [location?.pathname, isTabletOrMobile]);

  return (
    <div className="flex flex-col sm:flex-row  sm:min-h-screen">
      <div className="md:w-72 h-full bg-[#F6F6F6] max-h-full min-h-screen z-[40] hidden md:block sticky left-0 top-0 border-r border-[#0000000d]">
        <div className="w-14 mx-auto py-10 ">
          <Link to="/">
            <img src={logoImg} alt="" className="w-full" />
          </Link>
        </div>
        <div className="w-full h-full space-y-1">
          <SidebarLink Icon={IoHomeOutline} to="/me/home">
            Home
          </SidebarLink>
          <SidebarLink Icon={BsDownload} to="/me/import">
            Import
          </SidebarLink>
          <SidebarLink Icon={BsClock} to="/me/history">
            History
          </SidebarLink>

          {/* <SidebarLink Icon={BsCashCoin} to="/me/subscription">
            Billing
          </SidebarLink> */}
          <SidebarLink Icon={IoSettingsOutline} to="/me/settings">
            Settings
          </SidebarLink>
          {/* <SidebarLink Icon={AiFillWechat} to="/startgame">
            Quiz
          </SidebarLink> */}
          <button
            onClick={() => handleOpen()}
            className="mt-10 flex w-full text-md text-red-500 pl-16 border-r-4 py-5 border-[#5D387F00] hover:border-[#5D387F33] items-center gap-5 m-auto"
          >
            <BsArrowBarRight size={18} />
            <span>Log out</span>
          </button>
        </div>
      </div>

      <LogOutModal handleClose={handleClose} open={open} />
      <div className="w-full h-full min-h-screen flex flex-col pb-4 md:pb-0">
        <div className="py-4 border-b border-[#0000000d] bg-[#F6F6F6] w-full sm:sticky top-0 z-30">
          <div className="max-w-[1050px] mx-auto flex justify-between items-center px-6">
            <div>
              <div className="h-10 mx-auto block md:hidden">
                <Link to="/me/home">
                  <img src={logoImgWhite} alt="" className="h-full" />
                </Link>
              </div>
            </div>
            {isTabletOrMobile ? (
              <IconButton onClick={() => setDrawerOpen(true)}>
                <BsList size={20} className='text-["#3030303"]' />
              </IconButton>
            ) : (
              <Link to="/me/profile">
                <Avatar sx={{ bgcolor: '#8C54BF', fontSize: '0.9rem' }} src="/static/images/avatar/1.jpg">
                  {userData ? userData.firstName.charAt(0) + '' + userData.lastName.charAt(0) : 'NA'}
                </Avatar>
              </Link>
            )}
          </div>
        </div>
        <div className="flex-1 flex px-4  justify-center items-center">
          <Outlet />
        </div>
      </div>

      {isTabletOrMobile && (
        <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)} className={styles.DrawerNav}>
          <div className="flex justify-between px-6 sm:pl-[50px] pt-5">
            <Link to="/me/home">
              <img src={logoImgWhite} alt="speak better" className="h-10" />
            </Link>
            <button onClick={() => setDrawerOpen(false)}>
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
          <div className={`space-y-2 ${styles._nvnav}`}>
            <SidebarLink Icon={IoHomeOutline} to="/me/home">
              Home
            </SidebarLink>
            <SidebarLink Icon={BsDownload} to="/me/import">
              Import
            </SidebarLink>
            <SidebarLink Icon={BsClock} to="/me/history">
              History
            </SidebarLink>
            <SidebarLink Icon={BsFillPersonLinesFill} to="/me/profile">
              Profile
            </SidebarLink>
            <SidebarLink Icon={IoSettingsOutline} to="/me/settings">
              Settings
            </SidebarLink>

            <button
              onClick={() => {
                setDrawerOpen(false);
                handleOpen();
              }}
              className="mt-10 flex w-full text-md text-red-500 pl-8 sm:pl-16 border-r-4 py-5 border-[#5D387F00] hover:border-[#5D387F33] items-center gap-5 m-auto"
            >
              <BsArrowBarRight size={18} />
              <span>Log out</span>
            </button>
          </div>
        </Drawer>
      )}
    </div>
  );
}

export default DashboardLayout;
