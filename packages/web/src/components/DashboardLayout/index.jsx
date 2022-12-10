import React, { useState } from 'react';
import MobileMenu from './MobileMenu';
import { Outlet, Link } from 'react-router-dom';
import logoImg from '../../assets/images/logo2.png';
import SidebarLink from '../SidebarLink';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { BsDownload, BsClock, BsFillPersonLinesFill, BsCashCoin, BsArrowBarRight } from 'react-icons/bs';
import { AiFillWechat } from 'react-icons/ai';
import LogOutModal from './LogOutModal';

function DashboardLayout() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex flex-col-reverse sm:flex-row  min-h-screen">
      <div className="md:w-80 h-full bg-[#F6F6F6] max-h-full min-h-screen z-[40] hidden sm:block sm:sticky top-0">
        <div className="w-40 mx-auto pt-10 pb-20">
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
            className="mt-10 flex w-full  pl-16 border-r-4 py-5 border-[#5D387F00] hover:border-[#5D387F33] items-center gap-5 m-auto"
          >
            <BsArrowBarRight className="" />
            <span>Log out</span>
          </button>
        </div>
      </div>
      <div className="h-[10%]">
        <MobileMenu />
      </div>
      <LogOutModal handleClose={handleClose} open={open} />
      <div className="w-full h-[90%] sm:pt-5">
        {/* <div className="py-4 border-b border-slate-300 w-full"></div> */}
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
