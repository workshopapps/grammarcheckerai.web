import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from "axios";
import { getStorageData, useLocalStorage } from '../../../hooks/useLocalStorage';
import toast, { Toaster } from 'react-hot-toast';
import styles from './reset.module.css';
import Logo from '../../../assets/signup-logo.png';
import Image2 from '../../../assets/Correction 1.png';
import Image1 from '../../../assets/error 1.png';

const index = () => {
  const [userNewPassword, setUserNewPassword] = useState('');
  const [userConfirmNewPassword, setUserConfirmNewPassword] = useState('');
  const [existingUserPassword, setExistingUserPassword] = useLocalStorage(
    'existingUserPassword',
    getStorageData('demoData'),
  );

  useEffect(() => {
    setExistingUserPassword(getStorageData('demoData'));
  }, []);

  const error = (message) => toast.error(message);
  const success = (message) => toast.success(message);

  let navigate = useNavigate();
  const handlePrev = () => {
    navigate('/signin');
  };
  /* 
    handleSaveNewPassword => resets the originally saved database password
    to the new one when both inputs match
  */
    const url = "http://grittygrammar.hng.tech/password-reset";

  const handleSaveNewPassword = () => {
    if ((userConfirmNewPassword !== userNewPassword)) {
      console.log(userConfirmNewPassword);
      console.log(userNewPassword);
      error("Passwords do not match!");
    }

    else if ((userConfirmNewPassword === "" ) && (userNewPassword === "" )){
      error("Password cannot be empty!")
    }
    else {
      axios.post(url, {
        userNewPassword,
        userConfirmNewPassword
      })
      .then((response) => {
        console.log(response)
        setExistingUserPassword(userNewPassword);
        console.log(existingUserPassword);
        setTimeout(() => navigate('/signin'), 3000);
        success('Password reset Successful!');
      })
      .catch((err) => {
        console.log(err)
        error("Time out...try again!")
      })
    }
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
              <div className={styles._gs2logincontinue}>
                <button onClick={handleSaveNewPassword}>Reset Password</button>
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
