import closepng from '../../assets/close.png'
import logoImg from '../../assets/images/logo.svg';
import SidebarLink from '../SidebarLink';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { BsDownload, BsClock, BsFillPersonLinesFill } from 'react-icons/bs';

export default function mobileNav({ nav, setNav}) {
  return (
    <div className={nav ? 'bg-[#000]/50 absolute z-[100] w-full' : 'hidden'}>
        <div className='w-[50%] sm:hidden h-full bg-[#F6F6F6] max-h-screen min-h-screen sm:sticky top-0'>
            <button onClick={() => setNav(!nav)} className='absolute top-4 right-4 w-8 h-8'>
            <img src={closepng} alt="close" />
            </button>
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

    </div>
    
  )
}
