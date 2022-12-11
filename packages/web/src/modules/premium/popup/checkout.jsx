import PropTypes from 'prop-types';
import { Button, Dialog } from '@mui/material';
import style from './popup.module.css';
import styles from './checkout.module.css';
import React, { useState, useEffect, Fragment } from 'react';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Listbox, Transition } from '@headlessui/react';
import { useFlutterwave } from 'react-flutterwave';
import useStripe from '../../../hooks/auth/useStripe';
// import userCheckPlanVerify from '../../../hooks/account/userCheckPlanVerify';

const Currency = [
  { id: 1, name: 'USD' },
  { id: 2, name: 'NGN' },
];

const Checkout = (props) => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [userToken, setUserToken] = useState('');
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);
  const [userLSEmail, setUserLSEmail] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(Currency[0]);

  const success = (message) => toast.success(message);
  const error = (message) => toast.error(message);
  const [loading, setLoading] = useState(false);

  const authLogin = useLogin();
  const authStripe = useStripe;
  let navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };
  const handleCreateAccount = () => {
    navigate('/signup');
  };

  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value);
  };

  useEffect(() => {
    if (
      (!localStorage.getItem('grittyuserid') && localStorage.getItem('grittyuserid') === null) ||
      localStorage.getItem('grittyuserid') === ''
    ) {
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
  // const useVerify = async (url, token) => {
  //   var requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   await fetch(url, requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => {
  //       const oBJ = JSON.parse(result);
  //       useVerify(
  //         `https://api.speakbetter.hng.tech/v1/paystack/?email=${oBJ.data.data.customer.email}`,
  //         'sk_test_30c6122a460a1b8e03c16a44f331ffdfab463c3e',
  //       );
  //     })
  //     .catch((error) => error(error));
  // };
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
              setIsAlreadyLoggedIn(true);
            }, 3000);
          } else {
            error('Already Logged in, proceeding...');
            useFetch(
              `https://api.speakbetter.hng.tech/v1/user/profile/${localStorage.getItem('grittyuserid')}`,
              localStorage.getItem('grittyusertoken'),
            );
            setIsAlreadyLoggedIn(true);
          }
        })
        .catch((err) => {
          error(err.response.data.message);
        });
    }
  };

  const config = {
    public_key: 'FLWPUBK_TEST-2e1fdd9734036594eb776d8603318f21-X',
    tx_ref: 'fgjfjgjfgjksds',
    amount: props.ngn,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    payment_plan: props.ngnplan,
    customer: {
      email: userLSEmail,
      name: userName,
    },
    customizations: {
      title: 'Speak Better',
      description: 'Subscription Payment',
      logo: 'https://assets.piedpiper.com/logo.png',
    },
  };

  const FlutterPayment = useFlutterwave(config);

  const handleNavigate = () => {
    toast.dismiss();
    setTimeout(() => {
      navigate('/me/home');
    }, 1000);
  };

  const handleStripe = () => {
    setUserLSEmail(JSON.parse(localStorage.getItem('isUserDetails')).email);
    console.log(userLSEmail);
    setLoading(true);
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
      console.log('checking stripe');
      authStripe
        .mutateAsync({
          plan: 'price_1MD8wPDsYRsW1yFuyTdES0Mb',
          amount: '5.00',
          currency: 'USD',
          interval: 'weekly',
          txref: 'str-006fg550002',
        })
        .then((res) => {
          console.log(res);
        });
    }
  };

  const handleFlutterPayment = () => {
    const user = JSON.parse(localStorage.getItem('isUserDetails'));

    setUserName(`${user?.firstName} ${user?.lastName}`);
    setUserLSEmail(JSON.parse(localStorage.getItem('isUserDetails')).email);

    // console.log(userName);
    console.log(config);
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
      FlutterPayment({
        callback: (response) => {
          console.log(response);
          setTimeout(() => {}, 2000);
        },
        onClose: () => {
          setLoading(false);
        },
      });
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
            {isAlreadyLoggedIn && (
              <div className={styles._paymentMethod}>
                <FormControl className={styles._paymentChoice}>
                  <div className={styles._paymentHeader}>
                    <FormLabel className={styles._paymentTitle} id="demo-controlled-radio-buttons-group">
                      Payment Methods
                    </FormLabel>
                    <hr className={styles._divider} />
                    <button className={styles._paymentback} onClick={props.handleBack}>
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
                      <span>back</span>
                    </button>
                  </div>
                  <div className={styles._sbCurrency}>
                    <Listbox value={selectedCurrency} onChange={setSelectedCurrency}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate">{selectedCurrency.name}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {Currency.map((person, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-purple-100 text-amber-900' : 'text-gray-900'
                                  }`
                                }
                                value={person}
                              >
                                {({ selected }) => (
                                  <>
                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                      {person.name}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                  >
                    <button className="focus:outline-none focus:ring focus:ring-violet-300"></button>
                    {/* <FormControlLabel
                      className={`${styles._paystack}`}
                      value="paystack"
                      sx={{
                        color: 'black',
                        bgcolor: 'white',
                        '&.Mui-checked': {
                          color: 'white',
                        },
                      }}
                      control={
                        <Radio
                          sx={{
                            color: 'black',
                            '&.Mui-checked': {
                              color: 'purple',
                            },
                          }}
                        />
                      }
                      label="Paystack"
                    ></FormControlLabel> */}
                    <FormControlLabel
                      className={styles._stripe}
                      value="stripe"
                      sx={{
                        color: 'black',
                        bgcolor: 'white',
                        '&.Mui-checked': {
                          color: 'white',
                        },
                      }}
                      control={
                        <Radio
                          sx={{
                            color: 'black',
                            '&.Mui-checked': {
                              color: 'purple',
                            },
                          }}
                        />
                      }
                      label="Stripe"
                    ></FormControlLabel>
                    <FormControlLabel
                      className={styles._flutterwave}
                      value="flutterwave"
                      sx={{
                        color: 'black',
                        bgcolor: 'white',
                        '&.Mui-checked': {
                          color: 'white',
                        },
                      }}
                      control={
                        <Radio
                          sx={{
                            color: 'black',
                            '&.Mui-checked': {
                              color: 'purple',
                            },
                          }}
                        />
                      }
                      label="Flutterwave"
                    ></FormControlLabel>
                  </RadioGroup>
                </FormControl>
              </div>
            )}
            {!isAlreadyLoggedIn && (
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
                <div>
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
                </div>
              </div>
            )}

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
                {value === '' ? (
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
                ) : (
                  <div className={styles._cpSummary}>
                    <h3>Plan: {props.duration}</h3>
                    {selectedCurrency.id && (
                      <h3>
                        Amount: {selectedCurrency.name} {selectedCurrency.id === 2 && props.zar}
                        {selectedCurrency.id === 1 && props.usd}
                      </h3>
                    )}
                    <h3 className={styles._cpSummarypayment}>Payment Method: {value}</h3>
                    {value === 'stripe' && (
                      <LoadingButton
                        loading={loading}
                        sx={{
                          color: 'white',
                        }}
                        variant="outlined"
                        type="button"
                        className={styles._paymentButton}
                        onClick={handleStripe}
                      >
                        Pay with Stripe
                      </LoadingButton>
                    )}
                    {value === 'flutterwave' && (
                      // <h3>Coming soon...</h3>
                      <LoadingButton
                        loading={loading}
                        sx={{
                          color: 'white',
                        }}
                        variant="outlined"
                        type="button"
                        className={styles._paymentButton}
                        onClick={handleFlutterPayment}
                      >
                        Pay with Flutterwave
                      </LoadingButton>
                    )}
                  </div>
                )}
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
  zar: PropTypes.number,
  usd: PropTypes.number,
  ngn: PropTypes.number,
  plan: PropTypes.string,
  ngnplan: PropTypes.string,
  userIsSubscribed: PropTypes.bool,
};

export default Checkout;
