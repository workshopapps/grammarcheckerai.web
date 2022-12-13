/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoadingButton from '@mui/lab/LoadingButton';
import styles from './login.module.css';
import Logo from '../../../assets/images/logo2.png';
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
import useGetFacebookLink from '../../../hooks/auth/useGetFacebooLink';
import useAuthFacebook from '../../../hooks/auth/useAuthFacebook';
import Loader from '../../../components/Loader';
import useGetLinkedInLink from '../../../hooks/auth/useGetLinkedInLink';
import useAuthLinkedIn from '../../../hooks/auth/useAuthLinkedIn';
import useAuthGoogle from '../../../hooks/auth/useAuthGoogle';
import useGetGoogleLink from '../../../hooks/auth/useGetGoogleLink';

const Index = () => {
  const context = useTheme();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [userToken, setUserToken] = useState('');

  const location = useLocation();

  const search = location?.search;
  const whichSocailAuth = new URLSearchParams(search)?.get('from');

  const googleLink = useGetGoogleLink();
  const facebookLink = useGetFacebookLink();
  const linkedInLink = useGetLinkedInLink();

  const handleSocialAuthLogin = () => {
    if (location?.search && location?.search?.includes('google')) {
      return useAuthGoogle(location?.search);
    } else if (whichSocailAuth === 'facebook') {
      return useAuthFacebook(location?.search);
    } else if (whichSocailAuth === 'linkedin') {
      return useAuthLinkedIn(location?.search);
    } else {
      return null;
    }
  };
  const socialAuth = handleSocialAuthLogin();

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

  React.useEffect(() => {
    if (socialAuth) {
      socialAuth
        .mutateAsync({})
        .then((res) => {
          success('Login Successful! Redirecting in 5 seconds');
          const resId = res.data.data._id;
          const resToken = res.data.data.token;
          setUserId(resId);
          setUserToken(resToken);
          localStorage.setItem('grittyuserid', userId);
          localStorage.setItem('grittyusertoken', userToken);
          localStorage.setItem('isdashboard', true);
        })
        .then(() => {
          setTimeout(() => {
            getUserDetails(`https://api.speakbetter.hng.tech/v1/user/profile/${localStorage.getItem('grittyuserid')}`);
          }, 2000);
        })
        .then(() => {
          setTimeout(() => {
            window.location.replace('/me/home');
            navigate('/me/home', { replace: true });
          }, 5000);
        })
        .catch((err) => {
          error(err?.response?.data?.message);
          
        });
    }
  }, []);

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
        localStorage.setItem('isUserDetails', JSON.stringify(oBJ.data));
      })
      .catch((error) => error('error', error));
  };

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
        })
        .then(() => {
          setTimeout(() => {
            getUserDetails(`https://api.speakbetter.hng.tech/v1/user/profile/${localStorage.getItem('grittyuserid')}`);
          }, 2000);
        })
        .then(() => {
          setTimeout(() => {
            window.location.replace('/me/home');
            navigate('/me/home', { replace: true });
          }, 5000);
        })
        .catch((err) => {
          if(err?.response?.data?.message === "Action unsuccessful") {
            error(err?.response?.data?.data?.password)
          } else {
          error(err?.response?.data?.message);
          }
        });
    }
  };
  /*
    handleGoogleAuth handles the Google social login.

    This redirects to the endpoint which gets a usertoken from google
    Then redirects to the provided URL token for user login

  */
  const paramsInfo = new URLSearchParams();
  console.log('params', paramsInfo, location);

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
      .catch((err) => error(err.message)
      );
  };
  // useEffect(() => {
  //   const res = useFetch('https://speakbetter.hng.tech/api/v1/auth/google');
  //   console.log(res.message);
  // });

  const handleGoogleAuth = () => {};

  /*
      handleFacebookAuth handles the Facebook social login.

      This redirects to the endpoint which gets a usertoken from facebook
      Then redirects to the provided URL token for account creation

    */

  // const handleFacebookAuth = () => {
  //   useFetch('https://speakbetter.hng.tech/api/v1/auth/facebook');
  // };

  /*
      handleLinkedInAuth handles the LinkedIn social login.

      This redirects to the endpoint which gets a usertoken from linkedin
      Then redirects to the provided URL token for account creation

    */

  // const handleLinkedInAuth = () => {
  //   useFetch('https://speakbetter.hng.tech/api/v1/auth/linkedin');
  // };

  const isTabletorMobile = useMediaQuery('(min-width:850px)');
  return (
    <div signup-theme={context.theme} className={styles._gs2mainlogin}>
      {socialAuth?.isLoading && <Loader />}
      <div className={styles._gs2login}>
        <div className={styles._gs2logincol1} gs2logincol1-theme={context.theme}>
          {isTabletorMobile && (
            <div className={styles._gs2loginlogo}>
              <img src={Logo} alt="Speak Better Logo" />
            </div>
          )}
          <div className={styles._gs2logincontent}>
            <div className={styles._authback}>
              <button
                onClick={handlePrev}
                className="lg:text-[#383839] md:text-[#383839] text-[#fff] font-bold rounded inline-flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="48"
                    d="M328 112L184 256l144 144"
                  />
                </svg>
                <span>Go back</span>
              </button>
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
              <div className={styles._gs2logincheck}></div>
              <div className={styles._g2loginandForgot}>
                <div className={styles._g2loginoption}>
                  <input
                    id="userRememberPassword"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span>Keep me signed in</span>
                </div>
                <div>
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
                  <button type="button" className={styles._google}>
                    <a href={googleLink?.value}>
                      <img src={google} alt="google authentication" />
                    </a>
                  </button>
                  <button type="button" className={styles._facebook}>
                    <a href={facebookLink?.value}>
                      <img src={facebook} alt="facebook authentication" />
                    </a>
                  </button>
                  <button type="button" className={styles._apple}>
                    <a href={linkedInLink?.value}>
                      <img src={apple} alt="apple authentication" />
                    </a>
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
