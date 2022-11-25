import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import toast, { Toaster } from 'react-hot-toast';
import useSignup from '../../../../hooks/auth/useSignup';
import LoadingButton from '@mui/lab/LoadingButton';
import PasswordMask from 'react-password-mask';
import styles from './step2.module.css';
import Logo from '../../../../assets/signup-logo.png';
import Image2 from '../../../../assets/Correction 1.png';
import Image1 from '../../../../assets/error 1.png';
import google from '../../../../assets/google.png';
import apple from '../../../../assets/apple.png';
import facebook from '../../../../assets/facebook.png';
import Carousel from 'nuka-carousel';

const index = () => {
  const [newUserName, setNewUserName] = useState('');
  const [newUserFirstName, setNewUserFirstName] = useState('');
  const [newUserLastName, setNewUserLastName] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserConfirmPassword, setNewUserConfirmPassword] = useState('');
  const [isSamePassword, setIsSamePassword] = useState(true);
  const [newUserEmail, setNewUserEmail] = useState('');

  const error = (message) => toast.error(message);
  const success = (message) => toast.success(message);

  const authSignup = useSignup();

  let navigate = useNavigate();
  const handlePrev = () => {
    navigate('/home');
  };

  /* 
    handleSignUp => signs up the user if they do not exist in the database.
    The function checks for invalid fields as well as empty fields and returns an erro
    when the conditions are not according to the rule.
    -------------------------
    After a successful attempt at creating the new user => the function navigates to the sign in page.
    This is done using a setTimeout after user account creation
    
  */
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
        .then(() => {
          success("Account Created Succesfully!\nYou'll be redirected to the Dashboard in 5 seconds...");
          setTimeout(() => navigate('/me/home'), 5000);
        })
        .catch((err) => {
          error(err.message);
        });
    } else if (newUserPassword !== newUserConfirmPassword) {
      setIsSamePassword(false);
    }
  };

  const handleGoogleAuth = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    fetch('https://grittygrammar.hng.tech/api/v1/auth/google', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const oBJ = JSON.parse(result);
        window.location.href = oBJ.message;
      })
      .catch((error) => console.log('error', error));
  };

  const handleFacebookAuth = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    fetch('https://grittygrammar.hng.tech/api/v1/auth/facebook', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const oBJ = JSON.parse(result);
        window.location.href = oBJ.message;
      })
      .catch((error) => console.log('error', error));
  };

  const handleLinkedInAuth = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    fetch('https://grittygrammar.hng.tech/api/v1/auth/linkedin', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const oBJ = JSON.parse(result);
        window.location.href = oBJ.message;
      })
      .catch((error) => console.log('error', error));
  };
  const isTabletorMobile = useMediaQuery('(min-width:850px)');
  return (
    <div className={styles._gs2mainsignup}>
      <div className={styles._gs2signup}>
        <div className={styles._gs2signupcol1}>
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
              <p className={styles._gssignuptophead}>
                STEP <span>1</span> OUT OF <span>1</span>
              </p>
            )}
            <h2>Get Started with Gritty Grammar today!</h2>
            <p className={styles._subtitle}>Start your learning journey today, you can skip this process for later.</p>
            <form className={styles._gs2signupform} onSubmit={handleSignUp}>
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
            <Carousel autoplay={true} autoplayInterval={5000} withoutControls={true} autoplayReverse={true}>
              <div className={styles._gs2mainsignupcol2images}>
                <img src={Image1} alt="column1" />
                <img src={Image2} alt="column1" />
              </div>
              <div className={styles._gs2mainsignupcol2images}>
                <img src={Image1} alt="column1" />
                <img src={Image2} alt="column1" />
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
          <div className={styles._gs2mainsignupcol2footer}>
            <div className={styles._gs2signupslider}>
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
