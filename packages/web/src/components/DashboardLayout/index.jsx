import React from 'react';
import MobileMenu from './MobileMenu';
import { Outlet, Link } from 'react-router-dom';
import logoImg from '../../assets/simple_logo.svg';
import SidebarLink from '../SidebarLink';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { BsDownload, BsClock, BsFillPersonLinesFill, BsCashCoin, BsArrowBarRight } from 'react-icons/bs';
import { HiMenuAlt2 } from 'react-icons/hi';
import { AiFillWechat } from 'react-icons/ai';
import LogOutModal from './LogOutModal';
import { Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';

function DashboardLayout() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userData = JSON.parse(localStorage.getItem('isUserDetails'));

  return (
    <div className="flex flex-col-reverse sm:flex-row  sm:min-h-screen">
      <div className="md:w-80 h-full bg-[#F6F6F6] max-h-full min-h-screen z-[40] hidden md:block sm:sticky top-0 border-r border-[#0000000d]">
        <div className="w-14 mx-auto py-10 animate-pulse">
          <Link to="/me/home">
            <img src={logoImg} alt="" className="w-full" />
          </Link>
        </div>
        <div className="w-full h-full space-y-1">
          <SidebarLink Icon={IoHomeOutline} to="/me/home">
            Home
          </SidebarLink>
          <SidebarLink Icon={BsClock} to="/me/history">
            History
          </SidebarLink>
          <SidebarLink Icon={BsDownload} to="/me/import">
            Import
          </SidebarLink>
          <SidebarLink Icon={BsFillPersonLinesFill} to="/me/profile">
            Profile
          </SidebarLink>
          <SidebarLink Icon={BsCashCoin} to="/me/subscription">
            Billing
          </SidebarLink>
          <SidebarLink Icon={IoSettingsOutline} to="/me/settings">
            Settings
          </SidebarLink>
          <SidebarLink Icon={AiFillWechat} to="/startgame">
            Quiz
          </SidebarLink>
          <button
            onClick={() => handleOpen()}
            className="mt-10 flex w-full text-sm text-slate-800 pl-16 border-r-4 py-5 border-[#5D387F00] hover:border-[#5D387F33] items-center gap-5 m-auto"
          >
            <BsArrowBarRight size={18} />
            <span>Log out</span>
          </button>
        </div>
      </div>
      <div className="h-[10%]">
        <MobileMenu />
      </div>
      <LogOutModal handleClose={handleClose} open={open} />
      <div className="w-full">
        <div className="py-4 border-b border-[#0000000d] bg-[#F6F6F6] w-full sm:sticky top-0">
          <div className="max-w-[1100px] mx-auto flex justify-between px-4">
            <IconButton aria-label="delete" color="primary">
              <HiMenuAlt2 />
            </IconButton>

            <Link to="/me/profile">
              <Avatar
                alt="Remy Sharp"
                sx={{ bgcolor: '#8C54BF', fontSize: '0.9rem' }}
                src="/static/images/avatar/1.jpg"
              >
                {userData ? userData.firstName.charAt(0) + '' + userData.lastName.charAt(0) : 'NA'}
              </Avatar>
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
