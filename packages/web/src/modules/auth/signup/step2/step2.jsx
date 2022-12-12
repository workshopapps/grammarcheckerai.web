/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { signUpSchema } from './schema';
import useSignup from '../../../../hooks/auth/useSignup';
import LoadingButton from '@mui/lab/LoadingButton';
import PasswordMask from 'react-password-mask';
import styles from './step2.module.css';
import Logo from '../../../../assets/images/logo2.png';
import Image2 from '../../../../assets/Correction 1.png';
import Image1 from '../../../../assets/error 1.png';
import Image3 from '../../../../assets/steponeframeone.png';
import Image4 from '../../../../assets/steponeframetwo.png';
import google from '../../../../assets/google.png';
import apple from '../../../../assets/apple.png';
import facebook from '../../../../assets/facebook.png';
import Carousel from 'nuka-carousel';

import Loader from '../../../../components/Loader';
import useGetLinkedInLink from '../../../../hooks/auth/useGetLinkedInLink';
import useAuthLinkedIn from '../../../../hooks/auth/useAuthLinkedIn';

import useGetFacebookLink from '../../../../hooks/auth/useGetFacebooLink';
import useAuthFacebook from '../../../../hooks/auth/useAuthFacebook';
import useAuthGoogle from '../../../../hooks/auth/useAuthGoogle';
import useGetGoogleLink from '../../../../hooks/auth/useGetGoogleLink';
import useTheme from '../../../../hooks/useTheme';

const index = () => {
  const context = useTheme();
  const [userId, setUserId] = useState('');
  const [userToken, setUserToken] = useState('');

  const error = (message) => toast.error(message);
  const success = (message) => toast.success(message);

  const location = useLocation();

  const authGoogle = useAuthGoogle(location?.search);
  const googleLink = useGetGoogleLink();

  const authFacebook = useAuthFacebook(location?.search);
  const facebookLink = useGetFacebookLink();

  const authLinkedIn = useAuthLinkedIn(location?.search);
  const linkedInLink = useGetLinkedInLink();

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

    User is given a token on account creation which monitors their existing session

  */
  useEffect(() => {
    if (
      (localStorage.getItem('grittyuserid') && localStorage.getItem('grittyuserid') !== null) ||
      localStorage.getItem('grittyuserid') !== ''
    ) {
      navigate('/me/home');
      return;
    }
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
        console.log(oBJ.data);
        localStorage.setItem('isUserDetails', JSON.stringify(oBJ.data));
      })
      .catch((error) => error(error?.message));
  };

  /*
    handleGoogleAuth handles the Google social login.

    This redirects to the endpoint which gets a usertoken from google
    Then redirects to the provided URL token for account creation

  */
  const formik = useFormik({
    initialValues: {
      newUserName: '',
      newUserFirstName: '',
      newUserLastName: '',
      newUserEmail: '',
      newUserPassword: '',
      newUserConfirmPassword: '',
    },
    validationSchema: signUpSchema,
    onSubmit: () => {
      authSignup
        .mutateAsync({
          email: formik.values.newUserEmail,
          firstName: formik.values.newUserFirstName,
          lastName: formik.values.newUserLastName,
          username: formik.values.newUserName,
          language: 'English',
          password: formik.values.newUserPassword,
          confirm_password: formik.values.newUserConfirmPassword,
        })
        .then(() => {
          success('Account Created Succesfully! Please sign in.');
        })
        .then(() => {
          setTimeout(() => {
            navigate('/signin');
          }, 2000);
        })
        .catch((err) => {
          // error(err.response.data.message);
          error(err.response.data.data.password);
        });
      formik.resetForm();
    },
  });

  React.useEffect(() => {
    if (location?.search && location?.search?.includes('facebook')) {
      authFacebook
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

    if (location?.search && location?.search?.includes('linkedin')) {
      authLinkedIn
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
    if (location?.search && location?.search?.includes('google')) {
      authGoogle
        .mutateAsync({})
        .then((res) => {
          success('Login Successful! Redirecting in 5 seconds');
          const resId = res.data.data._id;
          const resToken = res.data.data.token;
          localStorage.setItem('grittyuserid', resId);
          localStorage.setItem('grittyusertoken', resToken);
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

  // const handleGoogleAuth = () => {

  //   const res = useFetch('https://speakbetter.hng.tech/api/v1/auth/google');
  //   console.log(res)
  // };

  const handleGoogleAuth = async () => {
    const res = useFetch('http://127.0.0.1:5002/v1/auth/google');
    return res.data;
  };

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
    <div step-theme={context.theme} className={styles._gs2mainsignup}>
      {authFacebook.isLoading && <Loader />}
      {authLinkedIn.isLoading && <Loader />}
      <div className={styles._gs2signup}>
        <div step-theme={context.theme} className={styles._gs2signupcol1}>
          {isTabletorMobile && (
            <div className={styles._gs2signuplogo}>
              <img src={Logo} alt="Grammar Checker Logo" />
            </div>
          )}
          <div className={styles._gs2signupcontent}>
            <div className={styles._authback}>
              <button
                onClick={handlePrev}
                className="lg:text-[#383839] md:text-[#383839] text-[#fff] font-bold lg:mt-8 lg:mb-5 md:mb-3 md:mt-5  rounded inline-flex items-center"
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
            {isTabletorMobile && (
              <p step-theme={context.theme} className={styles._gssignuptophead}>
                STEP <span>1</span> OUT OF <span>1</span>
              </p>
            )}
            <h2 step-theme={context.theme}>Get Started with Speak Better today!</h2>
            <p step-theme={context.theme} className={styles._subtitle}>
              Start your learning journey today, you can skip this process for later.
            </p>
            <form className={styles._gs2signupform} onSubmit={formik.handleSubmit} noValidate>
              {/* ### EMAIL */}
              <div className={styles._gs2signupinput}>
                <span>Enter Your Email</span>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  id="signupEmail"
                  required
                  name="newUserEmail"
                  value={formik.values.newUserEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border-[1px] border-[#d7d7d7] focus:outline-1 focus:outline-gray-400 ${
                    formik.touched.newUserEmail && formik.errors.newUserEmail && 'border-red-400'
                  }`}
                />
                {formik.touched.newUserEmail && formik.errors.newUserEmail && (
                  <p className="text-red-500 pl-2">{formik.errors.newUserEmail}</p>
                )}
              </div>

              {/* ### USERNAME */}
              <div className={styles._gs2signupinput}>
                <span>Username</span>
                <input
                  type="text"
                  placeholder="meisieshalom"
                  required
                  id="signupUserName"
                  name="newUserName"
                  value={formik.values.newUserName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border-[1px] border-[#d7d7d7] focus:outline-1 focus:outline-gray-400 ${
                    formik.touched.newUserName && formik.errors.newUserName && 'border-red-400'
                  }`}
                />
                {formik.touched.newUserName && formik.errors.newUserName && (
                  <p className="text-red-500 pl-2">{formik.errors.newUserName}</p>
                )}
              </div>

              {/* ### FIRST NAME */}
              <div className={styles._gs2signupinput}>
                <span>First Name</span>
                <input
                  type="text"
                  required
                  placeholder="Shalom"
                  id="signupFirstName"
                  name="newUserFirstName"
                  value={formik.values.newUserFirstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border-[1px] border-[#d7d7d7] focus:outline-1 focus:outline-gray-400 ${
                    formik.touched.newUserFirstName && formik.errors.newUserFirstName && 'border-red-400'
                  }`}
                />
                {formik.touched.newUserFirstName && formik.errors.newUserFirstName && (
                  <p className="text-red-500 pl-2">{formik.errors.newUserFirstName}</p>
                )}
              </div>

              {/* ### LAST NAME */}
              <div className={styles._gs2signupinput}>
                <span>Last Name</span>
                <input
                  type="text"
                  required
                  placeholder="Taiwo"
                  id="signupLastName"
                  name="newUserLastName"
                  value={formik.values.newUserLastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border-[1px] border-[#d7d7d7] focus:outline-1 focus:outline-gray-400 ${
                    formik.touched.newUserLastName && formik.errors.newUserLastName && 'border-red-400'
                  }`}
                />
                {formik.touched.newUserLastName && formik.errors.newUserLastName && (
                  <p className="text-red-500 pl-2">{formik.errors.newUserLastName}</p>
                )}
              </div>

              {/* ### PASSWORD */}
              <div className={styles._gs2signupinput}>
                <span>Create a password</span>
                <PasswordMask
                  type="password"
                  required
                  id="signupCreatePassword"
                  placeholder="Password"
                  name="newUserPassword"
                  value={formik.values.newUserPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border-[1px] rounded-lg border-[#d7d7d7] focus:outline-1 focus:outline-gray-400 ${
                    formik.touched.newUserPassword && formik.errors.newUserPassword && 'border-red-400'
                  }`}
                />
                {formik.touched.newUserPassword && formik.errors.newUserPassword && (
                  <p className="text-red-500 pl-2">{formik.errors.newUserPassword}</p>
                )}
              </div>

              {/* ### CONFIRM PASSWORD */}
              <div className={styles._gs2signupinput}>
                <span>Confirm password</span>
                <PasswordMask
                  type="password"
                  required
                  id="signupConfirmPassword"
                  placeholder="Confirm Password"
                  name="newUserConfirmPassword"
                  value={formik.values.newUserConfirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border-[1px] rounded-lg border-[#d7d7d7] focus:outline-1 focus:outline-gray-400 ${
                    formik.touched.newUserConfirmPassword && formik.errors.newUserConfirmPassword && 'border-red-400'
                  }`}
                />
                {formik.touched.newUserConfirmPassword && formik.errors.newUserConfirmPassword && (
                  <p className="text-red-500 pl-2">{formik.errors.newUserConfirmPassword}</p>
                )}
                {/* <span className={styles._gs2signupvalidate}>
                  {isSamePassword === false ? 'Passwords must be the same' : ''}
                </span> */}
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
