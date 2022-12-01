import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import toast, { Toaster } from 'react-hot-toast';
import styles from './forgot.module.css';
import Logo from '../../../assets/signup-logo.png';
import Image1 from '../../../assets/steponeframeone.png';
import Image2 from '../../../assets/steponeframetwo.png';
import LoadingButton from '@mui/lab/LoadingButton';
import useForgotPassword from '../../../hooks/auth/useForgotPassword';

const index = () => {
  const [resetLink, setResetLink] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const error = (message) => toast.error(message);
  const success = (message) => toast.success(message);
  const authForgotPassword = useForgotPassword();

  useEffect(() => {
    localStorage.setItem('email', userEmail);
  }, [userEmail]);

  let navigate = useNavigate();
  const handleBack = () => {
    setResetLink(true);
    navigate('/signin');
  };

  const handleSendResetLink = (e) => {
    e.preventDefault();
    if (userEmail === '') {
      error('Invalid email!');
      return;
    }
    authForgotPassword
      .mutateAsync({
        email: userEmail,
      })
      .then((res) => {
        success(res?.data?.message);
      })
      .catch((err) => {
        error(err?.data?.message);
      });
  };
  const handleOpenMail = () => {
    navigate('/reset-password');
  };
  const isTabletorMobile = useMediaQuery('(min-width: 850px)');
  return (
    <div className={styles._gcmainforgot}>
      <div className={styles._gcforgot}>
        <div className={styles._gcforgotcol1}>
          {isTabletorMobile && (
            <div className={styles._gcforgotlogo}>
              <img src={Logo} alt="Grammar Checker Logo" />
            </div>
          )}
          {!resetLink == true ? (
            <div className={styles._gcforgotcontent}>
              <div className={styles._authback}>
                <svg onClick={handleBack} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
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
              <h2>Don&rsquo;t panic, we&rsquo;ll just reset your password</h2>
              <form className={styles._gcforgotform} onSubmit={handleSendResetLink}>
                <div className={styles._gcforgotinput}>
                  <span>Enter Your Email</span>
                  <input
                    type="email"
                    placeholder="shalomtaiwo@example.com"
                    onChange={(e) => setUserEmail(e.target.value)}
                    id="forgotEmail"
                  />
                  <span className={styles._gcforgotvalidate}>Email is available</span>
                </div>
                <div className={styles._gcforgotcontinue}>
                  <LoadingButton size="small" type="submit" loading={authForgotPassword.isLoading} variant="contained">
                    Continue
                  </LoadingButton>
                </div>
              </form>
            </div>
          ) : (
            <div className={styles._gcforgotcontent}>
              <div className={styles._authback}>
                <svg onClick={handleBack} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
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
              <h2>Reset Link Sent</h2>
              <div className={styles._gcresetform}>
                <div className={styles._gcresetLink}>
                  <span className={styles._gcresetLinkText}>
                    A link has been sent to your email address, click on the link to reset your password.
                  </span>
                </div>
                <div className={styles._gcforgotcontinue}>
                  <button onClick={handleOpenMail}>Open Mail</button>
                </div>
              </div>
              <div className={styles._gcresetresend}>
                <span>
                  Didn&rsquo;t see any email? <button>Click here to resend</button>
                </span>
              </div>
            </div>
          )}
        </div>
        <div className={styles._gcforgotcol2}>
          <div className={styles._gcmainforgotcol2body}>
            <div className={styles._gcmainforgotcol2images}>
              <img src={Image1} alt="column1" />
              <img src={Image2} alt="column1" />
            </div>
            {isTabletorMobile && (
              <div className={styles._gcmainforgotcol2content}>
                <h3>Adaptive learning & Improvements</h3>
                <p>
                  Our App gets to know you better as you use it and provides more personalised recommendations for
                  improvements.
                </p>
              </div>
            )}
          </div>
          <div className={styles._gcmainforgotcol2footer}>
            <div className={styles._gcforgotslider}>
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
