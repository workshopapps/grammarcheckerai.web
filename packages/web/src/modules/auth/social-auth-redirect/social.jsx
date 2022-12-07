import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Social() {
  let navigate = useNavigate();
  const url = new URL(window?.location?.href);
  const params = new URLSearchParams(url?.search);
  const userToken = params.get('token');
  const userId = params.get('_id');
  const handleCreateAccount = () => {
    navigate('/signup');
  };
  useEffect(() => {
    if (!userId || !userToken) {
      handleCreateAccount();
    } else {
      localStorage.setItem('grittyuserid', userId);
      localStorage.setItem('grittyusertoken', userToken);
      localStorage.setItem('isdashboard', true);
      window.location.replace('/me/home');
      navigate('/me/home', { replace: true });
    }
  }, [userId, userToken]);
  return <div>Login successful Redirecting........</div>;
}
export default Social;
