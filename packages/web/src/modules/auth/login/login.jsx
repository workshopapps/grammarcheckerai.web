/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoadingButton from '@mui/lab/LoadingButton';
import styles from './login.module.css';
import Logo from '../../../assets/signup-logo.png';
import Image2 from '../../../assets/Correction 1.png';
import Image1 from '../../../assets/error 1.png';
import Image3 from '../../../assets/steponeframeone.png';
import Image4 from '../../../assets/steponeframetwo.png';
import google from '../../../assets/google.png';
import apple from '../../../assets/apple.png';
import facebook from '../../../assets/facebook.png';
import useLogin from '../../../hooks/auth/useLogin';
import toast, { Toaster } from 'react-hot-toast';
import PasswordMask from 'react-password-mask';
import Carousel from 'nuka-carousel';

import useTheme from '../../../hooks/useTheme';

const Index = () => {
  const context = useTheme();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [userToken, setUserToken] = useState('');

  const success = (message) => toast.success(message);
  const error = (message) => toast.error(message);

  const authLogin = useLogin();

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

    A successful login provides a token and id which monitors user session.
  */
  useEffect(() => {
    localStorage.setItem('grittyuserid', userId);
    localStorage.setItem('grittyusertoken', userToken);
  }, [userId, userToken]);

  const handlelogin = (e) => {
    e.preventDefault();
    if ((userEmail !== '') & (userPassword !== '')) {
      authLogin
        .mutateAsync({
          email: userEmail,
          password: userPassword,
        })
        .then((res) => {
          success('Login Successful! Redirecting in 5 seconds');
          const resId = res.data.data._id;
          const resToken = res.data.data.token;
          setUserId(resId);
          setUserToken(resToken);
          localStorage.setItem('grittyuserid', userId);
          localStorage.setItem('grittyusertoken', userToken);
          localStorage.setItem('isdashboard', true);
          setTimeout(() => navigate('/me/home'), 5000);
        })
        .catch((err) => {
          error(err.message);
        });
    }
  };
  /* 
    handleGoogleAuth handles the Google social login. 

    This redirects to the endpoint which gets a usertoken from google
    Then redirects to the provided URL token for user login

  */
  const useFetch = (url) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const oBJ = JSON.parse(result);
        window.location.href = oBJ.message;
      })
      .catch((err) => error(err.message));
  };

  const handleGoogleAuth = () => {
    useFetch('https://grittygrammar.hng.tech/api/v1/auth/google');
  };

  /* 
      handleFacebookAuth handles the Facebook social login. 
  
      This redirects to the endpoint which gets a usertoken from facebook
      Then redirects to the provided URL token for account creation
  
    */

  const handleFacebookAuth = () => {
    useFetch('https://grittygrammar.hng.tech/api/v1/auth/facebook');
  };

  /* 
      handleLinkedInAuth handles the LinkedIn social login. 
  
      This redirects to the endpoint which gets a usertoken from linkedin
      Then redirects to the provided URL token for account creation
  
    */

  const handleLinkedInAuth = () => {
    useFetch('https://grittygrammar.hng.tech/api/v1/auth/linkedin');
  };

  const isTabletorMobile = useMediaQuery('(min-width:850px)');
  return (
    <div signup-theme={context.theme} className={styles._gs2mainlogin}>
      <div className={styles._gs2login}>
        <div className={styles._gs2logincol1} gs2logincol1-theme={context.theme}>
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
            <h2 signup-theme={context.theme}>Welcome Back</h2>
            <p signup-theme={context.theme} className={styles._subtitle}>
              Start your learning journey today, you can skip this process for later.
            </p>
            <form onSubmit={(e) => handlelogin(e)} className={styles._gs2loginform}>
              <div className={styles._gs2logininput}>
                <span>Email</span>
                <input
                  type="email"
                  placeholder="shalomtaiwo@example.com"
                  defaultValue=""
                  id="userName"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
              <div className={styles._gs2logininput}>
                <span>Password</span>
                <PasswordMask
                  type="password"
                  value={userPassword}
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
                  <button
                    signup-theme={context.theme}
                    type="button"
                    className={styles._gsloginforgot}
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
              <div className={styles._gs2logincontinue}>
                <LoadingButton size="small" type="submit" loading={authLogin.isLoading} variant="contained">
                  Login
                </LoadingButton>
                <div className={styles._gs2loginsignin}>
                  <a
                    href="#/"
                    signup-theme={context.theme}
                    className={styles._gsloginforgot}
                    onClick={handleCreateAccount}
                  >
                    Create New Account
                  </a>
                </div>
              </div>
              <div className={styles._gs2sociallogincol}>
                <p>Alternatively, you can sign up with:</p>
                <div className={styles._gs2sociallogins}>
                  <button type="button" className={styles._google} onClick={handleGoogleAuth}>
                    <img src={google} alt="google authentication" />
                  </button>
                  <button type="button" className={styles._facebook} onClick={handleFacebookAuth}>
                    <img src={facebook} alt="facebook authentication" />
                  </button>
                  <button type="button" className={styles._apple} onClick={handleLinkedInAuth}>
                    <img src={apple} alt="apple authentication" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={styles._gs2logincol2}>
          <div className={styles._gs2mainlogincol2body}>
            <Carousel autoplay={true} autoplayInterval={5000} withoutControls={true}>
              <div className={styles._gs2mainsignupcol2images}>
                <img src={Image1} alt="column1" />
                <img src={Image2} alt="column1" />
              </div>
              <div className={styles._gcmainsignupcol2images}>
                <img src={Image3} alt="column1" />
                <img src={Image4} alt="column1" />
              </div>
            </Carousel>
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
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
