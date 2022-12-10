import PropTypes from 'prop-types';
import { Button, Dialog } from '@mui/material';
import style from './popup.module.css';
import styles from './checkout.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoadingButton from '@mui/lab/LoadingButton';
import useLogin from '../../../hooks/auth/useLogin';
import toast from 'react-hot-toast';
import PasswordMask from 'react-password-mask';
import { usePaystackPayment } from 'react-paystack';
import usePay from '../../../hooks/auth/usePay';
import check from '../Assets/tick-square.png';
import medal from '../Assets/medal-star-white.png';
// import userCheckPlanVerify from '../../../hooks/account/userCheckPlanVerify';

const Checkout = (props) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [userToken, setUserToken] = useState('');
  const [isPaymentPage, setIsPaymentPage] = useState(false);
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);
  const [userLSEmail, setUserLSEmail] = useState('');

  const success = (message) => toast.success(message);
  const error = (message) => toast.error(message);
  const [loading, setLoading] = useState(false);

  const authLogin = useLogin();
  const authPay = usePay();
  // const authVerify = userCheckPlanVerify(JSON.parse(localStorage.getItem('isUserDetails'))?.email, '');

  let navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };
  const handleCreateAccount = () => {
    navigate('/signup');
  };

  useEffect(() => {
    if (localStorage.getItem('grittyuserid') === null || localStorage.getItem('grittyuserid') === '') {
      localStorage.setItem('grittyuserid', userId);
      localStorage.setItem('grittyusertoken', userToken);
    } else {
      localStorage.setItem('grittyuserid', localStorage.getItem('grittyuserid'));
      localStorage.setItem('grittyusertoken', localStorage.getItem('grittyusertoken'));
      setIsAlreadyLoggedIn(true);
    }
    // console.log(userSubscription);
  }, [userId, userToken]);

  const useFetch = async (url, token) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const oBJ = JSON.parse(result);
        // console.log(oBJ.data);
        localStorage.setItem('isUserDetails', JSON.stringify(oBJ.data));
      })
      .catch((error) => error(error));
  };
  const useVerify = async (url, token) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const oBJ = JSON.parse(result);
        useVerify(
          `https://api.speakbetter.hng.tech/v1/paystack/?email=${oBJ.data.data.customer.email}`,
          'sk_test_11cd20d24df0f472d32521e1bfb3c00608593c54',
        );
      })
      .catch((error) => error(error));
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
          if (localStorage.getItem('grittyuserid') === null || localStorage.getItem('grittyuserid') === '') {
            const resId = res.data.data._id;
            const resToken = res.data.data.token;
            setUserId(resId);
            setUserToken(resToken);
            localStorage.setItem('grittyuserid', userId);
            localStorage.setItem('grittyusertoken', userToken);
            success('Login Successful!');
            setTimeout(() => {
              useFetch(
                `https://api.speakbetter.hng.tech/v1/user/profile/${localStorage.getItem('grittyuserid')}`,
                localStorage.getItem('grittyusertoken'),
              );
              setIsPaymentPage(true);
            }, 3000);
          } else {
            error('Already Logged in, proceeding...');
            useFetch(
              `https://api.speakbetter.hng.tech/v1/user/profile/${localStorage.getItem('grittyuserid')}`,
              localStorage.getItem('grittyusertoken'),
            );
            setIsPaymentPage(true);
          }
        })
        .catch((err) => {
          error(err.response.data.message);
        });
    }
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    const user = JSON.parse(localStorage.getItem('isUserDetails'));

    // Implementation for whatever you want to do with reference and after success call.
    // console.log(reference.trxref);
    authPay
      .mutateAsync({
        email: user.email,
        name: user.firstName + ' ' + user.lastName,
        amount: props.amount,
        interval: props.duration,
        paymentGateway: 'paystack',
        subscriptionId: props.plan,
        txref: reference.trxref,
      })
      .then(() => {
        useVerify(
          `https://api.speakbetter.hng.tech/v1/paystack/verify?email=${user.email}&txref=${reference.trxref}`,
          'sk_test_11cd20d24df0f472d32521e1bfb3c00608593c54',
        );
      })
      .then(() => {
        setLoading(true);
        toast(() => (
          <span className={styles._notifs}>
            <b>Subscription Succesfully!</b>
            <p>Redirecting to dashboard...</p>
            <button onClick={handleNavigate}>Go to Dashboard</button>
          </span>
        ));
      })
      .then(() => {
        setTimeout(() => {
          navigate('/me/home');
        }, 3000);
      })
      .catch((err) => {
        error(err.message);
      });
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    setLoading(false);
  };
  const config = {
    reference: new Date().getTime().toString(),
    email: userLSEmail,
    amount: props.amount * 100,
    publicKey: 'pk_test_79b1560168d893e4e503c39acdc3b49f02db69c3',
  };

  const initializePayment = usePaystackPayment(config);

  const handleNavigate = () => {
    toast.dismiss();
    setTimeout(() => {
      navigate('/me/home');
    }, 1000);
  };

  const handlePayment = async () => {
    setUserLSEmail(JSON.parse(localStorage.getItem('isUserDetails')).email);

    if (props.userIsSubscribed === true) {
      toast(() => (
        <span className={styles._notifs}>
          <b>You are already subscribed!</b>
          <Button variant="outlined" color="secondary" onClick={handleNavigate}>
            Go to Dashboard
          </Button>
        </span>
      ));
    } else if (props.userIsSubscribed === false && userLSEmail && userLSEmail !== '') {
      setLoading(true);
      setTimeout(() => {
        initializePayment(onSuccess, onClose);
      }, 1000);
    }
  };

  const isTabletorMobile = useMediaQuery('(min-width:850px)');
  const isMobile = useMediaQuery('(max-width:389px)');

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClosePremium}
      TransitionComponent={props.Transition}
      className={style._sbDialog}
    >
      <div className={styles._gs2mainlogin}>
        <div className={styles._gs2login}>
          <div className={styles._gs2logincol1}>
            <div className={styles._gs2logincontent}>
              <div className={styles._authback}>
                <svg onClick={props.handleBack} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
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
              <h2>Subscription</h2>
              <p className={styles._subtitle}>Complete the process with just few steps. You’re almost all set.</p>
              {isPaymentPage === true ? (
                <div>
                  <div className={styles._cpSummary}>
                    <h3>Plan: {props.duration}</h3>
                    <h3>Amount: NGN {props.amount}</h3>
                    <LoadingButton
                      loading={loading}
                      color="secondary"
                      variant="outlined"
                      type="button"
                      onClick={handlePayment}
                    >
                      Proceed to Payment
                    </LoadingButton>
                  </div>
                </div>
              ) : (
                <div>
                  {isAlreadyLoggedIn === true ? (
                    <div className={styles._cpSummary}>
                      <h3>Plan: {props.duration}</h3>
                      <h3>Amount: NGN {props.amount}</h3>
                      <LoadingButton
                        loading={loading}
                        color="secondary"
                        variant="outlined"
                        type="button"
                        onClick={handlePayment}
                      >
                        Proceed to Payment
                      </LoadingButton>
                    </div>
                  ) : (
                    <form onSubmit={(e) => handlelogin(e)} className={styles._gs2loginform}>
                      <div>
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
                        {!isMobile && (
                          <div className={styles._gs2logincheck}>
                            <div className={styles._gs2loginsignin}>
                              <a href="#/" className={styles._gsloginforgot} onClick={handleCreateAccount}>
                                Create an account?
                              </a>
                            </div>
                            <div>
                              <button type="button" className={styles._gsloginforgot} onClick={handleForgotPassword}>
                                Forgot Password?
                              </button>
                            </div>
                          </div>
                        )}
                        <div className={styles._gs2logincontinue}>
                          <LoadingButton size="small" type="submit" loading={authLogin.isLoading} variant="contained">
                            Login
                          </LoadingButton>
                        </div>
                        {isMobile && (
                          <div className={styles._gs2logincheck}>
                            <div className={styles._gs2loginsignin}>
                              <a href="#/" className={styles._gsloginforgot} onClick={handleCreateAccount}>
                                Create an account?
                              </a>
                            </div>
                            <div>
                              <button type="button" className={styles._gsloginforgot} onClick={handleForgotPassword}>
                                Forgot Password?
                              </button>
                            </div>
                          </div>
                        )}
                        {/* <div className={styles._gs2sociallogincol}>
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
                </div> */}
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
            {!isTabletorMobile && (
              <div className={styles._gs2logincol2}>
                <div className={styles._sbmodalCol1}>
                  <div className={styles._sbmodalHeaderCol1}>
                    <div className={styles._sbmodalTitle}>
                      <img src={medal} alt="medal" />
                      <h2>Upgrade to premium</h2>
                    </div>
                  </div>
                  <div className={styles._sbmodalCol1Body}>
                    <div className={styles._sbmodalText}>
                      <p>You can get a lot more out of Speak Better by upgrading to premium. Get all features:</p>
                    </div>
                    <div className={styles._sbmodalList}>
                      <div>
                        <img src={check} alt="check" className={styles._sbListIcon} />
                        <p>Unlimited audio length</p>
                      </div>
                      <div>
                        <img src={check} alt="check" className={styles._sbListIcon} />
                        <p>Access to transcription history</p>
                      </div>
                      <div>
                        <img src={check} alt="check" className={styles._sbListIcon} />
                        <p>Variety of AI bot</p>
                      </div>
                      <div>
                        <img src={check} alt="check" />
                        <p>Grammer corrections</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {isTabletorMobile && (
            <div className={styles._gs2logincol2}>
              <div className={styles._sbmodalCol1}>
                <div className={styles._sbmodalHeaderCol1}>
                  <div className={styles._sbmodalTitle}>
                    <img src={medal} alt="medal" />
                    <h2>Upgrade to premium</h2>
                  </div>
                </div>
                <div className={styles._sbmodalCol1Body}>
                  <div className={styles._sbmodalText}>
                    <p>You can get a lot more out of Speak Better by upgrading to premium. Get all features:</p>
                  </div>
                  <div className={styles._sbmodalList}>
                    <div>
                      <img src={check} alt="check" className={styles._sbListIcon} />
                      <p>Unlimited audio length</p>
                    </div>
                    <div>
                      <img src={check} alt="check" className={styles._sbListIcon} />
                      <p>Access to transcription history</p>
                    </div>
                    <div>
                      <img src={check} alt="check" className={styles._sbListIcon} />
                      <p>Variety of AI bot</p>
                    </div>
                    <div>
                      <img src={check} alt="check" />
                      <p>Grammer corrections</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

Checkout.propTypes = {
  open: PropTypes.bool,
  handleClosePremium: PropTypes.func,
  handleBack: PropTypes.func,
  Transition: PropTypes.object,
  duration: PropTypes.node,
  amount: PropTypes.number,
  plan: PropTypes.string,
  userIsSubscribed: PropTypes.bool,
};

export default Checkout;
