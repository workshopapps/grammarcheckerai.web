import React, { useState } from 'react';
import MobileNav from './mobileNav';
import { Outlet } from 'react-router-dom';
import logoImg from '../../assets/images/logo.webp';
import hamburger from '../../assets/hamburger.png';
import SidebarLink from '../SidebarLink';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { BsDownload, BsClock, BsFillPersonLinesFill } from 'react-icons/bs';

function DashboardLayout() {
  const [nav, setNav] = useState(false);

  return (
    <div className="flex min-h-screen">
      <button onClick={() => setNav(!nav)} className="absolute sm:hidden top-4 left-4">
        <img src={hamburger} alt="hamburger" />
      </button>
      <div className="md:w-80 h-full bg-[#F6F6F6] max-h-screen min-h-screen z-[100] hidden sm:block sm:sticky top-0">
        <div className="w-32 mx-auto py-20">
          <img src={logoImg} alt="" className="w-full" />
        </div>
        <div className="w-full space-y-3">
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
          <SidebarLink Icon={IoSettingsOutline} to="/me/settings">
            Settings
          </SidebarLink>
        </div>
      </div>
      <MobileNav nav={nav} setNav={setNav} />
      <div className="w-full pt-5">
        {/* <div className="py-7 border-b border-slate-300 w-full"></div> */}
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
