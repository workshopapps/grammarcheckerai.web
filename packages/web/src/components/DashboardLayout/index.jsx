import React from 'react';
import { Outlet } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import SidebarLink from '../SidebarLink';

function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="lg:w-90 md:w-80 w-0 h-full bg-[#F6F6F6] max-h-screen min-h-screen ">
        <div className="w-32 mx-auto py-20">
          <img src={logoImg} alt="" className="w-full" />
        </div>
        <div className="w-full">
          <SidebarLink to="home" />
        </div>
      </div>
      <div className="w-full">
        {/* <div className="py-7 border-b border-slate-300 w-full"></div> */}
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
