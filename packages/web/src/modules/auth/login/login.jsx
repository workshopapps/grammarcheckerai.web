import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import styles from './login.module.css';
import Logo from '../../../assets/signup-logo.png';
import Image2 from '../../../assets/Correction 1.png';
import Image1 from '../../../assets/error 1.png';
import google from '../../../assets/google.png';
import apple from '../../../assets/apple.png';
import facebook from '../../../assets/facebook.png';
import { getStorageData, useLocalStorage } from '../../../hooks/useLocalStorage';
import toast, { Toaster } from 'react-hot-toast';

const index = () => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [existingUserName, setExistingUserName] = useLocalStorage('existingUserName', getStorageData('demoData'));
  const [existingUserPassword, setExistingUserPassword] = useLocalStorage(
    'existingUserPassword',
    getStorageData('demoData'),
  );
  const [existingUserEmail, setExistingUserEmail] = useLocalStorage('existingUserEmail', getStorageData('demoData'));
  const success = (message) => toast.success(message);
  const error = (message) => toast.error(message);

  let navigate = useNavigate();

  const handlePrev = () => {
    navigate('/home');
  };
  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };
  const handleCreateAccount = () => {
    navigate('/signup');
  };
  /* 
    handleLogin logs the user in on a succesful input.
    It checks if the user is found in the database and finds the password for the user as well.
    After a succesful input, redirects the user to a Protected Route and shows the logged in user's dashboard
    -----------------------------
    If user input is unsuccesful, shows an error notification and keeps the user on the page.
  */
  const handlelogin = () => {
    setExistingUserName(getStorageData('newUserName'));
    setExistingUserPassword(getStorageData('newUserPassword'));
    setExistingUserEmail(getStorageData('createEmail'));
    if ((userName === existingUserName) & (userPassword === existingUserPassword)) {
      setExistingUserName(getStorageData('newUserName'));
      setExistingUserPassword(getStorageData('newUserPassword'));
      setExistingUserEmail(getStorageData('createEmail'));
      console.log(existingUserEmail);
      success('Login Successful!');
      setTimeout(() => navigate('/me/home'), 2000);
    } else {
      error('Incorrect log in');
      setExistingUserName(getStorageData('demoData'));
      setExistingUserPassword(getStorageData('demoData'));
      setExistingUserEmail(getStorageData('demoData'));
    }
  };
  const isTabletorMobile = useMediaQuery({
    query: '(min-width: 850px)',
  });
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
            <h2>Welcome Back</h2>
            <p className={styles._subtitle}>Start your learning journey today, you can skip this process for later.</p>
            <div className={styles._gs2loginform}>
              <div className={styles._gs2logininput}>
                <span>Username</span>
                <input
                  type="text"
                  placeholder="meisieshalom"
                  defaultValue={userName}
                  id="userName"
                  required
                  pattern="[A-Za-z_-]{1,32}"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className={styles._gs2logininput}>
                <span>Password</span>
                <input
                  type="password"
                  defaultValue={userPassword}
                  id="userPassword"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                  required
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              </div>
              <div className={styles._gs2logincheck}>
                <div className={styles._g2loginoption}>
                  <input type="checkbox" id="userRememberPassword" />
                  <span>Keep me signed in</span>
                </div>
                <div className={styles._gs2loginsignin}>
                  <button className={styles._gsloginforgot} onClick={handleForgotPassword}>
                    Forgot Password?
                  </button>
                </div>
              </div>
              <div className={styles._gs2logincontinue}>
                <button onClick={handlelogin}>Login</button>
                <div className={styles._gs2loginsignin}>
                  <button className={styles._gsloginforgot} onClick={handleCreateAccount}>
                    Create New Account
                  </button>
                </div>
              </div>
              <div className={styles._gs2sociallogincol}>
                <p>Alternatively, you can sign up with:</p>
                <div className={styles._gs2sociallogins}>
                  <button className={styles._google}>
                    <img src={google} alt="google authentication" />
                  </button>
                  <button className={styles._facebook}>
                    <img src={facebook} alt="facebook authentication" />
                  </button>
                  <button className={styles._apple}>
                    <img src={apple} alt="apple authentication" />
                  </button>
                </div>
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
