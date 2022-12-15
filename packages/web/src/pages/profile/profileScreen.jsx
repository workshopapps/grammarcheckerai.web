import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import editicon from '../../assets/edit.svg';
import toast, { Toaster } from 'react-hot-toast';
import { ENDPOINTS } from '../../lib/constants';
import { MdOutlineCreate } from "react-icons/md";

//components
import ProfileScreenButton from '../../components/Button/profileButton/ProfileScreenButton';
import Fallback from '../../components/Fallback/Fallback';
import { Avatar, Button, Fade, Menu, MenuItem } from '@mui/material';

export default function profileScreen() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('isUserDetails')));
  const [openEdit, setOpenEdit] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const endpoint = ENDPOINTS.API_BASE_HTTPS_URL;
  const url = endpoint + 'user/profile/';
  const error = (message) => toast.error(message);
  const success = (message) => toast.success(message);
  const token = localStorage.getItem('grittyusertoken');
  const id = localStorage.getItem('grittyuserid');

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const headersList = {
    Authorization: `Bearer ${token}`,
  };

  const getProfileData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url + id, {
        method: 'GET',
        headers: headersList,
      });
      const data = await response.json();
      localStorage.setItem('userData', JSON.stringify(data.data));
      setData(data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateUserData = async (userData) => {
    let bodyContent = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      language: data.language,
      password: data.password,
      confirm_password: data.password,
      username: userData,
    };
    try {
      const response = await fetch(url + 'update', {
        method: 'POST',
        body: JSON.stringify(bodyContent),
        headers: { ...headersList, 'Content-Type': 'application/json; charset=utf-8' },
      });
      const data = await response.json();
      console.log(data);
      getProfileData();
      success('display name updated! Refreshing...');
      //setTimeout(() => location.reload(), 2000);
    } catch (err) {
      console.log(err);
      error('error updating data.');
    }
  };

  const updateProfileImage = async (img) => {
    let bodyContent = {
      imageFile: img,
    };
    try {
      const response = await fetch(url + 'update', {
        method: 'POST',
        body: JSON.stringify(bodyContent),
        headers: { ...headersList, 'Content-Type': 'application/json; charset=utf-8' },
      });
      const data = await response.json();
      console.log(data);
      success('profile picture updated! Refreshing...');
      //setTimeout(() => location.reload(), 2000);
    } catch (err) {
      console.log(err);
      error('error updating data');
    }
  };

  const ChangeUsername = (e) => {
    e.preventDefault();
    updateUserData(newUsername);
    setOpenEdit(!openEdit);
    setNewUsername('');
  };

  return (
    <main className="bg-white h-full pt-2 w-full block sm:pt-16">
      {data && (
        <div className="w-[90%] md:w-[80%] h-[95%] flex flex-col m-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center pb-3 border-none sm:border-b-[3px] border-[#d2d2d2]/50 relative">
            <h3 className="text-2xl font-bold">User Profile</h3>
            <div className='relative mt-4 sm:mt-0 cursor-pointer'>
            <Avatar
                alt="Remy Sharp"
                sx={{ height: '4rem', width: '4rem', bgcolor: '#8C54BF', fontSize: '0.9rem' }}
              >
                {data ? data.firstName.charAt(0) + '' + data.lastName.charAt(0) : 'NA'}
              </Avatar>
              <Button
                className='absolute hover:bg-transparent right-0 bottom-5'
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
              <MdOutlineCreate size={24} className='p-1 bg-white shadow-lg rounded-full text-[#5d387f]' />
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
                <MenuItem>
                  <input onChange={(e) => updateProfileImage(e.target.value)} type="file" accept='image/*' placeholder='set profile picture'/>
                </MenuItem>   
            </Menu>
              
            </div>
          </div>
          <div className="flex flex-col text-center sm:hidden">
            <h1 className="text-xl font-bold text-[#393939]">{data.firstName + ' ' + data.lastName}</h1>
            <p className="text-[#9c9c9c]">{data.email}</p>
          </div>

          <div className="flex flex-col gap-10 mt-5">
            <div className="hidden sm:block border-b-[3px] border-[#d2d2d2]/50">
              <span className="text-sm opacity-50">Full Name</span>
              <p className="text-lg">{data.firstName + ' ' + data.lastName}</p>
            </div>

            <div className="relative border-b-[3px] border-[#d2d2d2]/50">
              <span className="text-sm opacity-50">Display Name</span>
              {!openEdit ? (
                <p className="text-lg">{data.username}</p>
              ) : (
                <form onSubmit={(e) => ChangeUsername(e)}>
                  <input
                    onChange={(e) => setNewUsername(e.target.value)}
                    value={newUsername}
                    className="w-full text-lg focus:outline-none"
                    placeholder={data.username}
                    type="text"
                    name="username"
                    required
                  />
                  <input
                    className={
                      openEdit
                        ? 'bg-[#5d387f] text-white p-2 rounded absolute bottom-1 right-0 cursor-pointer'
                        : 'hidden'
                    }
                    type="submit"
                    value="update"
                  />
                </form>
              )}
              <button
                onClick={() => setOpenEdit(!openEdit)}
                className={openEdit ? 'hidden' : 'absolute bottom-2 right-0 cursor-pointer'}
              >
                <img src={editicon} alt="edit" />
              </button>
            </div>

            <div className="hidden sm:block  border-b-[3px] border-[#d2d2d2]/50">
              <span className="text-sm opacity-50">Email Address</span>
              <p className="text-lg">{data.email}</p>
            </div>

            <div className="relative flex flex-col border-b-[3px] border-[#d2d2d2]/50">
              <span className="text-sm opacity-50">Password</span>
              <input
                type="password"
                name="password"
                value={data.password === null ? '' : data.password.substring(0, 10)}
                disabled
                className="text-xl bg-transparent"
              />
              <p></p>
              <Link to="/me/profile/changepassword">
                <span className="absolute bottom-2 right-0 cursor-pointer">
                  <img src={editicon} alt="edit" />
                </span>
              </Link>
            </div>
          </div>

          <div className="_btnContainer">
            <ProfileScreenButton onClick={() => navigate('/me/profile/deleteaccount')} variant="danger">
              Delete Account
            </ProfileScreenButton>
          </div>
        </div>
      )}
      {isLoading && <Fallback />}
      <Toaster />
    </main>
  );
}
