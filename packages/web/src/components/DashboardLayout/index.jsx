import React, { useState } from 'react';
import MobileMenu from './MobileMenu'
import { Outlet, Link } from 'react-router-dom';
import logoImg from '../../assets/images/logo2.png';
import SidebarLink from '../SidebarLink';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { BsDownload, BsClock, BsFillPersonLinesFill, BsCashCoin, BsArrowBarRight } from 'react-icons/bs';
import LogOutModal from './LogOutModal';

function DashboardLayout() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="flex min-h-screen">
      <div className="md:w-80 h-full bg-[#F6F6F6] max-h-screen min-h-screen z-[100] hidden sm:block sm:sticky top-0">
        <div className="w-40 mx-auto py-20">
          <Link to='/'>
            <img src={logoImg} alt="" className="w-full" />
          </Link>
        </div>
        <div className="w-full h-full space-y-3">
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
          <button onClick={() => toggleModal()} className='mt-10 flex w-full border-[#5d387f] py-4 justify-center items-center gap-5 m-auto hover:bg-[#5d387f] hover:text-white'>
            <BsArrowBarRight className='' />
            <span>Log out</span>
          </button>
         
        </div>
      </div>
      <MobileMenu />
      <LogOutModal modal={modal} toggleModal={toggleModal} />
      <div className="w-full pt-5">
        {/* <div className="py-7 border-b border-slate-300 w-full"></div> */}
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
