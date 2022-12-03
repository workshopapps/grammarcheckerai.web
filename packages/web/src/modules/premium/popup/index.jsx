import React from 'react';
import PropTypes from 'prop-types';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import styles from './popup.module.css';
import { IconButton } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import medal from '../Assets/medal-star.png';
import ranking from '../Assets/ranking.png';
import check from '../Assets/tick-square.png';
import useMediaQuery from '@mui/material/useMediaQuery';
import usePay from '../../../hooks/auth/usePay';
import Checkout from './checkout';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const index = (props) => {
  const authPay = usePay();
  const matches = useMediaQuery('(max-width:694px)');
  const [checkoutURL, setCheckoutURL] = React.useState('');
  const [interval, setInterval] = React.useState({ plan: '', amount: 0, duration: '' });
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [userToken, setUserToken] = React.useState('');
  const [email, setEmail] = React.useState('');

  const useFetch = (url) => {
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        user: '0fa87984-fb92-4a3c-a43b-de63531686b9',
        email: 'cutytongy@gmail.com',
        name: 'Otong Akan',
        amount: 1000,
        interval: 'weekly',
        subscriptionId: 'PLN_2cqf3nx11trbn4b',
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer pk_test_79b1560168d893e4e503c39acdc3b49f02db69c3',
        'Content-type': 'application/json; charset=UTF-8',
      },
    };

    fetch(url, requestOptions)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err.message));
  };

  const handlePayment = () => {
    useFetch('https://api.speakbetter.hng.tech/v1/paystack/pay');
  };

  // const handlePayment = () => {
  //   authPay
  //     .mutateAsync({
  //       user: '0fa87984-fb92-4a3c-a43b-de63531686b9',
  //       email: email,
  //       name: firstName + '' + lastName,
  //       amount: interval.amount,
  //       interval: interval.duration,
  //       subscriptionId: interval.plan,
  //     })
  //     .then((res) => {
  //       setCheckoutURL(res.data.authorization_url);
  //     })
  //     .then(() => {
  //       alert(checkoutURL);
  //     });
  // };

  const handleCheckout = (plan) => {
    setInterval(plan);
  };

  const handleBack = () => {
    setInterval('');
  };

  if (interval.duration)
    return (
      <Checkout
        duration={interval.duration}
        open={props.open}
        handleClosePremium={props.handleClosePremium}
        Transition={Transition}
        handleBack={handleBack}
      />
    );
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClosePremium}
      TransitionComponent={Transition}
      className={styles._sbDialog}
    >
      <div className={styles._sbpopup}>
        {matches ? null : (
          <div className={styles._sbmodalclose}>
            <IconButton onClick={props.handleClosePremium}>
              <AiOutlineClose />
            </IconButton>
          </div>
        )}
        <div className={styles._sbmodalContent}>
          <div className={styles._sbmodalCol1}>
            <div className={styles._sbmodalHeaderCol1}>
              <div className={styles._sbmodalTitle}>
                {matches ? (
                  <div className={styles._sbmobilemodalclose}>
                    <IconButton onClick={props.handleClosePremium}>
                      <AiOutlineClose />
                    </IconButton>
                  </div>
                ) : (
                  <img src={medal} alt="medal" />
                )}
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
          <div className={styles._sbmodalCol2}>
            <div className={styles._sbmodalHeaderCol2}>
              <div className={styles._sbmodalTitle}>
                {matches ? null : <img src={ranking} alt="ranking" />}
                <h2>{!matches ? 'Choose your plan' : 'Choose plan'}</h2>
              </div>
            </div>
            {matches ? (
              <div className={styles._sbmobile}>
                <button
                  className={styles._sbPricingBox}
                  onClick={() => handleCheckout({ plan: 'monthly', amount: 1000, duration: 'monthly' })}
                >
                  <div className={styles._sbPricingTitles}>
                    <p>Monthly</p>
                    <h2>$10.90</h2>
                  </div>
                  <div className={styles._sbPricingDetails}>
                    <ul>
                      <li>Easy plan</li>
                      <li>Billed monthly</li>
                      <li>Cancel anytime</li>
                    </ul>
                  </div>
                </button>
                <button
                  className={styles._sbPricingBox}
                  onClick={() => handleCheckout({ plan: 'quarterly', amount: 2000, duration: 'quarterly' })}
                >
                  <div className={styles._sbPricingTitles}>
                    <p>Quarterly</p>
                    <h2>$10.90</h2>
                  </div>
                  <div className={styles._sbPricingDetails}>
                    <ul>
                      <li>Easy plan</li>
                      <li>Billed monthly</li>
                      <li>Cancel anytime</li>
                    </ul>
                  </div>
                </button>
                <button
                  className={styles._sbPricingBox}
                  onClick={() => handleCheckout({ plan: 'yearly', amount: 3000, duration: 'yearly' })}
                >
                  <div className={styles._sbPricingTitles}>
                    <p>Yearly</p>
                    <h2>$10.90</h2>
                  </div>
                  <div className={styles._sbPricingDetails}>
                    <ul>
                      <li>Easy plan</li>
                      <li>Billed monthly</li>
                      <li>Cancel anytime</li>
                    </ul>
                  </div>
                </button>
              </div>
            ) : (
              <div className={styles._sbmodalCol2Body}>
                <div className={styles._sbmodalCol2List}>
                  <div className={styles._sbmodalcharges}>
                    <h6 className={styles._sbNoDisplay}>{'Not popular'}</h6>
                    <div className={styles._sbSubs}>
                      <h5 className={styles._sbInterval}>Monthly</h5>
                      <p>
                        $10.90<span> / month</span>
                      </p>
                      <button onClick={() => handleCheckout({ plan: 'monthly', amount: 2000, duration: 'monthly' })}>
                        Select
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className={styles._sbmodalcharges}>
                    <h6>Most Popular:</h6>
                    <div className={styles._sbSubs}>
                      <h5 className={styles._sbIntervalPromo}>
                        <span>Quaterly</span>
                        <span>Billed Quaterly - $35.6</span>
                      </h5>
                      <p>
                        $8.90<span> / month</span>
                      </p>
                      <button
                        onClick={() => handleCheckout({ plan: 'quarterly', amount: 2000, duration: 'quarterly' })}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className={styles._sbmodalcharges}>
                    <h6>Best Value:</h6>
                    <div className={styles._sbSubs}>
                      <h5 className={styles._sbIntervalPromo}>
                        <span>Quaterly</span>
                        <span>Billed Annually - $35.6</span>
                      </h5>
                      <p>
                        $5.90<span> / month</span>
                      </p>
                      <button onClick={() => handleCheckout({ plan: 'yearly', amount: 3000, duration: 'yearly' })}>
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

index.propTypes = {
  open: PropTypes.bool,
  handleClosePremium: PropTypes.func,
};

export default index;
