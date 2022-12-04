import React from 'react';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import styles from './popup.module.css';
import medal from '../Assets/medal-star.png';
import ranking from '../Assets/ranking.png';
import check from '../Assets/tick-square.png';
import useMediaQuery from '@mui/material/useMediaQuery';
import Checkout from './checkout';
import Navbar from '../../../components/Navbar';
import useGetUserSubscription from '../../../hooks/account/useGetUserSubscription';
import { Toaster } from 'react-hot-toast';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const index = () => {
  const matches = useMediaQuery('(max-width:694px)');
  const [interval, setInterval] = React.useState({ plan: '', amount: 0, duration: '' });
  const [open, setOpen] = React.useState(true);

  const handleClosePremium = () => {
    setOpen(false);
  };
  const [userIsSubscribed, setUserIsSubscribed] = React.useState(false);
  const userSubscription = useGetUserSubscription(JSON.parse(localStorage.getItem('isUserDetails'))?.email);

  const handleCheckout = (plan) => {
    setInterval(plan);
    if (userSubscription?.value && userSubscription?.value.length !== 0) {
      // console.log('User is subscribed');
      userSubscription?.value?.map((item) => {
        if (item.status === 'initiated') {
          setUserIsSubscribed(true);
          return;
        }
        setUserIsSubscribed(false);
      });
    } else {
      // console.log('User is not subscribed');
      setUserIsSubscribed(false);
    }
  };

  const handleBack = () => {
    setInterval('');
  };

  if (interval.duration)
    return (
      <>
        <Checkout
          duration={interval.duration}
          open={open}
          handleClosePremium={handleClosePremium}
          Transition={Transition}
          handleBack={handleBack}
          amount={interval.amount}
          plan={interval.plan}
          userIsSubscribed={userIsSubscribed}
        />
        <Toaster />
      </>
    );
  return (
    <Dialog fullScreen open={true} TransitionComponent={Transition} className={styles._sbDialog}>
      <div className={styles._sbpopup}>
        <Navbar />
        {matches ? null : (
          <div className={styles._sbmodalclose}>
            {/* <IconButton onClick={props.handleClosePremium}>
              <AiOutlineClose />
            </IconButton> */}
          </div>
        )}
        <div className={styles._sbmodalContent}>
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
                  onClick={() => handleCheckout({ plan: 'PLN_2cqf3nx11trbn4b', amount: 3500, duration: 'monthly' })}
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
                  onClick={() => handleCheckout({ plan: 'PLN_gcfglkovoj8a06z', amount: 10000, duration: 'quarterly' })}
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
                  onClick={() => handleCheckout({ plan: 'PLN_gcfglkovoj8a06z', amount: 35000, duration: 'annually' })}
                >
                  <div className={styles._sbPricingTitles}>
                    <p>Annually</p>
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
                      <button
                        onClick={() =>
                          handleCheckout({ plan: 'PLN_2cqf3nx11trbn4b', amount: 3500, duration: 'monthly' })
                        }
                      >
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
                        onClick={() =>
                          handleCheckout({ plan: 'PLN_gcfglkovoj8a06z', amount: 10000, duration: 'quarterly' })
                        }
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
                      <button
                        onClick={() =>
                          handleCheckout({ plan: 'PLN_gcfglkovoj8a06z', amount: 35000, duration: 'annually' })
                        }
                      >
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
      <Toaster />
    </Dialog>
  );
};

export default index;
