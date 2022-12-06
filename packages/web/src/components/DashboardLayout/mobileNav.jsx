import PropTypes from 'prop-types';
import closepng from '../../assets/close.png';
import logoImg from '../../assets/images/logo2.png';
import SidebarLink from '../SidebarLink';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { BsDownload, BsClock, BsFillPersonLinesFill, BsCashCoin } from 'react-icons/bs';

export default function mobileNav({ nav, toggleNav }) {
  return (
    <div className={nav ? 'bg-[#000]/50 h-screen absolute z-[101] w-full translate-x-[0rem] ease-in-out transition-all opacity-100 duration-[800ms] sm:hidden' : 'w-full absolute h-screen ease-in-out transition-all duration-[800ms] translate-x-[-40rem] -z-[99]'}>
      <div className="w-[50%] h-screen bg-[#F6F6F6] max-h-screen min-h-screen sm:sticky top-0">
        <button onClick={toggleNav} className="absolute top-4 right-4 w-8 h-8">
          <img src={closepng} alt="close" />
        </button>
        <div className="w-32 mx-auto py-20">
          <img src={logoImg} alt="" className="w-full" />
        </div>
        <div className="w-full space-y-3">
          <SidebarLink func={toggleNav} Icon={IoHomeOutline} to="/me/home">
            Home
          </SidebarLink>
          <SidebarLink func={toggleNav} Icon={BsClock} to="/me/history">
            History
          </SidebarLink>
          <SidebarLink func={toggleNav} Icon={BsDownload} to="/me/import">
            Import
          </SidebarLink>
          <SidebarLink func={toggleNav} Icon={BsFillPersonLinesFill} to="/me/profile">
            Profile
          </SidebarLink>
          <SidebarLink func={toggleNav} Icon={BsCashCoin} to="/me/subscription">
            Billing
          </SidebarLink>
          <SidebarLink func={toggleNav} Icon={IoSettingsOutline} to="/me/settings">
            Settings
          </SidebarLink>
        </div>
      </div>
    </div>
  );
}

mobileNav.propTypes = {
  nav: PropTypes.bool,
  toggleNav: PropTypes.func,
};
