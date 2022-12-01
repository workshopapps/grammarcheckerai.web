import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import editicon from '../../assets/edit.svg';
import toast, { Toaster } from 'react-hot-toast';
import { ENDPOINTS } from '../../lib/constants';

//components
import ProfileScreenButton from '../../components/Button/profileButton/ProfileScreenButton';
import Fallback from '../../components/Fallback/Fallback';

export default function profileScreen() {
  const [data, setData] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const endpoint = ENDPOINTS.API_BASE_URL;
  const url = endpoint + 'user/profile/';
  //const id = "56341e98-b07c-4374-bfcc-ddf766a52322";
  const error = (message) => toast.error(message);
  const success = (message) => toast.success(message);
  const token = localStorage.getItem('grittyusertoken');
  const id = localStorage.getItem('grittyuserid');

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
      localStorage.setItem('userData', JSON.stringify(data.Detail));
      setData(data.Detail);
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
      success('display name updated! Refreshing...');
      setTimeout(() => location.reload(), 2000);
    } catch (err) {
      console.log(err);
      error('error updating data.');
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const ChangeUsername = (e) => {
    e.preventDefault();
    updateUserData(newUsername);
    setOpenEdit(!openEdit);
    setNewUsername('');
  };

  //data && console.log(JSON.parse(localStorage.getItem("userData")));

  const onSignOut = () => {
    localStorage.clear();
    window.location.replace('/signin');
    location.reload();
  };

  return (
    <main className="bg-white h-screen pt-2 sm:pt-16">
      {data && (
        <div className="w-[90%] md:w-[80%] h-[95%] flex flex-col m-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center pb-3 border-none sm:border-b-[3px] border-[#d2d2d2]/50 relative">
            <h3 className="text-2xl font-bold">User Profile</h3>
            <span className="font-bold flex justify-center items-center text-center bg-[#5d387f] text-white rounded-full text-3xl sm:text-2xl h-24 w-24 mt-3 md:mt-0 sm:h-12 sm:w-12 uppercase">
              {data.firstName.charAt(0) + '' + data.lastName.charAt(0)}
            </span>
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
                        ? 'bg-[#5d387f] text-white p-2 rounded absolute bottom-2 right-0 cursor-pointer'
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
                value={data.password.substring(0, 10)}
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
            <ProfileScreenButton onClick={onSignOut}>Sign Out</ProfileScreenButton>
          </div>
        </div>
      )}
      {isLoading && <Fallback />}
      <Toaster />
    </main>
  );
}
