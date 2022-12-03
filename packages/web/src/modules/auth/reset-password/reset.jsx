import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import toast, { Toaster } from 'react-hot-toast';
import styles from './reset.module.css';
import Logo from '../../../assets/signup-logo.png';
import Image2 from '../../../assets/Correction 1.png';
import Image1 from '../../../assets/error 1.png';
import useResetPassword from '../../../hooks/auth/useResetPassword';
import LoadingButton from '@mui/lab/LoadingButton';

const index = () => {
  const [userNewPassword, setUserNewPassword] = useState('');
  const [userConfirmNewPassword, setUserConfirmNewPassword] = useState('');
  const url = new URL(window?.location?.href);
  const params = new URLSearchParams(url?.search);
  const token = params.get('token');

  console.log(typeof token);
  const authResetPassword = useResetPassword();

  const error = (message) => toast.error(message);
  const success = (message) => toast.success(message);

  let navigate = useNavigate();
  const handlePrev = () => {
    navigate('/signin');
  };

  const handleSaveNewPassword = () => {
    if (userConfirmNewPassword !== userNewPassword) {
      error('Passwords do not match!');
      return;
    }
    if (userConfirmNewPassword === '' && userNewPassword === '') {
      error('Password cannot be empty!');
      return;
    }
    authResetPassword
      .mutateAsync({
        new_password: userNewPassword,
        confirm_password: userConfirmNewPassword,
      })
      .then((res) => {
        success(res.data.message ?? 'Success');
      })
      .catch((err) => {
        error(err.response.message);
      });
  };
  const isTabletorMobile = useMediaQuery('(min-width:850px)');
  return (
    <div className={styles._gs2mainlogin}>
      <div className={styles._gs2login}>
        <div className={styles._gs2logincol1}>
          {isTabletorMobile && (
            <div className={styles._gs2loginlogo}>
              <img src={Logo} alt="Grammar Checker Logo" />
            </div>
          )}
          <div className={styles._gs2logincontent}>
            <div className={styles._authback}>
              <svg onClick={handlePrev} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="48"
                  d="M328 112L184 256l144 144"
                />
              </svg>
            </div>
            <h2>Set A New Password</h2>
            <p className={styles._subtitle}>Create a super memorable password</p>
            <div className={styles._gs2loginform}>
              <div className={styles._gs2logininput}>
                <span>Enter New Password</span>
                <input
                  type="password"
                  id="userNewPassword"
                  defaultValue={userNewPassword}
                  onChange={(e) => setUserNewPassword(e.target.value)}
                />
              </div>
              <div className={styles._gs2logininput}>
                <span>Confirm Password</span>
                <input
                  type="password"
                  id="userConfirmPassword"
                  defaultValue={userConfirmNewPassword}
                  onChange={(e) => setUserConfirmNewPassword(e.target.value)}
                />
              </div>
              <div className={styles._gcforgotcontinue}>
                <LoadingButton
                  onClick={handleSaveNewPassword}
                  size="small"
                  type="submit"
                  loading={authResetPassword.isLoading}
                  variant="contained"
                >
                  Reset Password
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
        <div className={styles._gs2logincol2}>
          <div className={styles._gs2mainlogincol2body}>
            <div className={styles._gs2mainlogincol2images}>
              <img src={Image1} alt="column1" />
              <img src={Image2} alt="column1" />
            </div>
            {isTabletorMobile && (
              <div className={styles._gs2mainlogincol2content}>
                <h3>Learn, Unlearn & Relearn</h3>
                <p>
                  Our A.I can adapt to an individual&rsquo;s learning style and pace, ensuring that they get the most
                  out of the app.
                </p>
              </div>
            )}
          </div>
          <div className={styles._gs2mainlogincol2footer}>
            <div className={styles._gs2loginslider}>
              <div className={styles._dots}>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default index;
