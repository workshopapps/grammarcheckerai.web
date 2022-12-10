import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { HiGlobeEuropeAfrica } from "react-icons/hi2";
import { BsDownload, BsClock, BsFillPersonLinesFill, BsCashCoin, BsThreeDotsVertical, BsArrowBarRight  } from 'react-icons/bs';
import { AiFillWechat } from "react-icons/ai";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import LogOutModal from './LogOutModal';

export default function MobileMenu() {
const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    handleClose();
    setModal(!modal);
  };

  return (
    <>
    <LogOutModal modal={modal} toggleModal={toggleModal} />
    <div className='sm:hidden z-[999] sticky flex bottom-0 w-full bg-[#F6F6F6]'>
        <div className="w-full flex justify-between text-xs py-3 px-5">
          <NavLink className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-[#5D387F]' : 'text-slate-700'} transition ease-in`} to="/me/home">
            <IoHomeOutline size={26} />
            Home
          </NavLink>
          <NavLink className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-[#5D387F]' : 'text-slate-700'} transition ease-in`} to="/me/history">
            <BsClock size={26} />
            History
          </NavLink>
          <NavLink className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-[#5D387F]' : 'text-slate-700'} transition ease-in`} to="/me/import">
            <BsDownload size={26} />
            Import
          </NavLink>
          <NavLink className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-[#5D387F]' : 'text-slate-700'} transition ease-in`} to="/me/subscription">
            <BsCashCoin size={26} />
            Billing
          </NavLink>
        </div>
          <Button
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <BsThreeDotsVertical size={26} className='text-[#5D387F]' />
          </Button>
          <Menu
                id="fade-menu"
                MenuListProps={{
                'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}><NavLink className='flex items-center gap-2' to="/"><HiGlobeEuropeAfrica />Go home</NavLink></MenuItem>
                <MenuItem onClick={handleClose}><NavLink className='flex items-center gap-2' to='/me/profile'><BsFillPersonLinesFill />Profile</NavLink></MenuItem>
                <MenuItem onClick={handleClose}><NavLink className='flex items-center gap-2'  to='/me/settings'><IoSettingsOutline/> Settings</NavLink></MenuItem>
                <MenuItem onClick={handleClose}><NavLink className='flex items-center gap-2'  to='/startgame'><AiFillWechat/> Quiz</NavLink></MenuItem>
                <MenuItem className='flex items-center gap-2' onClick={toggleModal}><BsArrowBarRight />Logout</MenuItem>
            </Menu>
        
    </div>
    </>
  )
}
