/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import toast, { Toaster } from 'react-hot-toast';
import useSignup from '../../../../hooks/auth/useSignup';
import LoadingButton from '@mui/lab/LoadingButton';
import PasswordMask from 'react-password-mask';
import styles from './step2.module.css';
import Logo from '../../../../assets/images/signuplogo.png';
import Image2 from '../../../../assets/Correction 1.png';
import Image1 from '../../../../assets/error 1.png';
import Image3 from '../../../../assets/steponeframeone.png';
import Image4 from '../../../../assets/steponeframetwo.png';
import google from '../../../../assets/google.png';
import apple from '../../../../assets/apple.png';
import facebook from '../../../../assets/facebook.png';
import Carousel from 'nuka-carousel';

import useTheme from '../../../../hooks/useTheme';

const index = () => {
  const context = useTheme();
  const [newUserName, setNewUserName] = useState('');
  const [newUserFirstName, setNewUserFirstName] = useState('');
  const [newUserLastName, setNewUserLastName] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserConfirmPassword, setNewUserConfirmPassword] = useState('');
  const [isSamePassword, setIsSamePassword] = useState(true);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [userToken, setUserToken] = useState('');

  const error = (message) => toast.error(message);
  const success = (message) => toast.success(message);

  const authSignup = useSignup();

  let navigate = useNavigate();
  const handlePrev = () => {
    navigate('/home');
  };
  const getUserDetails = (url) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('grittyusertoken')}`,
      },
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const oBJ = JSON.parse(result);
        console.log(oBJ.data);
        localStorage.setItem('isUserDetails', JSON.stringify(oBJ.data));
      })
      .catch((error) => error('error', error));
  };

  /* 
    handleSignUp => signs up the user if they do not exist in the database.
    The function checks for invalid fields as well as empty fields and returns an erro
    when the conditions are not according to the rule.
    -------------------------
    After a successful attempt at creating the new user => the function navigates to the sign in page.
    This is done using a setTimeout after user account creation

    User is given a token on account creation which monitors their existing session
    
  */
  useEffect(() => {
    localStorage.setItem('grittyuserid', userId);
    localStorage.setItem('grittyusertoken', userToken);
  }, [userId, userToken]);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (
      (newUserName !== '') &
      (newUserFirstName !== '') &
      (newUserLastName !== '') &
      (newUserPassword !== '') &
      (newUserEmail !== '') &
      (newUserConfirmPassword === newUserPassword)
    ) {
      authSignup
        .mutateAsync({
          email: newUserEmail,
          firstName: newUserFirstName,
          lastName: newUserLastName,
          username: newUserName,
          language: 'English',
          password: newUserPassword,
          confirm_password: newUserConfirmPassword,
        })
        .then((res) => {
          success("Account Created Succesfully!\nYou'll be redirected to the Dashboard in 5 seconds...");
          const resId = res.data.data._id;
          const resToken = res.data.data.token;
          setUserId(resId);
          setUserToken(resToken);
          localStorage.setItem('grittyuserid', userId);
          localStorage.setItem('grittyusertoken', userToken);
          localStorage.setItem('isdashboard', true);
          getUserDetails(`https://api.speakbetter.hng.tech/v1/user/profile/${localStorage.getItem('grittyuserid')}`);
          setTimeout(() => {
            navigate('/me/home', { replace: true });
          }, 5000);
        })
        .catch((err) => {
          error(err.response.data.message);
        });
    } else if (newUserPassword !== newUserConfirmPassword) {
      setIsSamePassword(false);
    }
  };

  /* 
    handleGoogleAuth handles the Google social login. 

    This redirects to the endpoint which gets a usertoken from google
    Then redirects to the provided URL token for account creation

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
    useFetch('https://speakbetter.hng.tech/api/v1/auth/google');
  };

  /* 
    handleFacebookAuth handles the Facebook social login. 

    This redirects to the endpoint which gets a usertoken from facebook
    Then redirects to the provided URL token for account creation

  */

  const handleFacebookAuth = () => {
    useFetch('https://speakbetter.hng.tech/api/v1/auth/facebook');
  };

  /* 
    handleLinkedInAuth handles the LinkedIn social login. 

    This redirects to the endpoint which gets a usertoken from linkedin
    Then redirects to the provided URL token for account creation

  */

  const handleLinkedInAuth = () => {
    useFetch('https://speakbetter.hng.tech/api/v1/auth/linkedin');
  };

  const isTabletorMobile = useMediaQuery('(min-width:850px)');
  return (
    <div step-theme={context.theme} className={styles._gs2mainsignup}>
      <div className={styles._gs2signup}>
        <div step-theme={context.theme} className={styles._gs2signupcol1}>
          {isTabletorMobile && (
            <div className={styles._gs2signuplogo}>
              <img src={Logo} alt="Grammar Checker Logo" />
            </div>
          )}
          <div className={styles._gs2signupcontent}>
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
            {isTabletorMobile && (
              <p step-theme={context.theme} className={styles._gssignuptophead}>
                STEP <span>1</span> OUT OF <span>1</span>
              </p>
            )}
            <h2 step-theme={context.theme}>Get Started with Speak Better today!</h2>
            <p step-theme={context.theme} className={styles._subtitle}>
              Start your learning journey today, you can skip this process for later.
            </p>
            <form className={styles._gs2signupform} onSubmit={(e) => handleSignUp(e)}>
              <div className={styles._gs2signupinput}>
                <span>Enter Your Email</span>
                <input
                  type="email"
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  placeholder="shalomtaiwo@example.com"
                  id="signupEmail"
                  required
                />
              </div>
              <div className={styles._gs2signupinput}>
                <span>Username</span>
                <input
                  type="text"
                  onChange={(e) => setNewUserName(e.target.value)}
                  pattern="[A-Za-z_-]{1,32}"
                  placeholder="meisieshalom"
                  required
                  id="signupUserName"
                />
              </div>
              <div className={styles._gs2signupinput}>
                <span>First Name</span>
                <input
                  type="text"
                  required
                  placeholder="Shalom"
                  onChange={(e) => setNewUserFirstName(e.target.value)}
                  id="signupFirstName"
                />
              </div>
              <div className={styles._gs2signupinput}>
                <span>Last Name</span>
                <input
                  type="text"
                  required
                  placeholder="Taiwo"
                  onChange={(e) => setNewUserLastName(e.target.value)}
                  id="signupLastName"
                />
              </div>
              <div className={styles._gs2signupinput}>
                <span>Create a password</span>
                <PasswordMask
                  type="password"
                  required
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  value={newUserPassword}
                  title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                  id="signupCreatePassword"
                />
              </div>
              <div className={styles._gs2signupinput}>
                <span>Confirm password</span>
                <PasswordMask
                  type="password"
                  required
                  value={newUserConfirmPassword}
                  onChange={(e) => setNewUserConfirmPassword(e.target.value)}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                  id="signupConfirmPassword"
                />
                <span className={styles._gs2signupvalidate}>
                  {isSamePassword === false ? 'Passwords must be the same' : ''}
                </span>
              </div>
              <div className={styles._gs2signupcontinue}>
                <LoadingButton size="small" type="submit" loading={authSignup.isLoading} variant="contained">
                  Create Account
                </LoadingButton>
                <div className={styles._gs2signupsignin}>
                  <p>
                    Have an account? <a href="/signin">Login</a>
                  </p>
                </div>
              </div>
              <div className={styles._gs2socialsignupcol}>
                <p>Alternatively, you can sign up with:</p>
                <div className={styles._gs2socialsignups}>
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
        <div className={styles._gs2signupcol2}>
          <div className={styles._gs2mainsignupcol2body}>
            <Carousel
              autoplay={true}
              autoplayInterval={7000}
              withoutControls={true}
              pauseOnHover={true}
              wrapAround={true}
              animation="fade"
            >
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
              <div className={styles._gs2mainsignupcol2content}>
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

export default index;
