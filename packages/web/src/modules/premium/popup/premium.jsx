import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slide from '@mui/material/Slide';
import styles from './popup.module.css';
import medal from '../Assets/medal-star.png';
import ranking from '../Assets/ranking.png';
import check from '../Assets/tick-square.png';
import useMediaQuery from '@mui/material/useMediaQuery';
import Checkout from './checkout';
import Navbar from '../../../components/Navbar';
// import useGetUserSubscription from '../../../hooks/account/useGetUserSubscription';
import { Toaster } from 'react-hot-toast';
import useStripeVerify from '../../../hooks/auth/useStripeVerify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const index = () => {
  const matches = useMediaQuery('(max-width:694px)');
  const [interval, setInterval] = React.useState({ ngnplan: '', plan: '', usd: 0, ngn: 0, zar: 0, duration: '' });
  const [open, setOpen] = React.useState(true);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [paymentOpen, setPaymentOpen] = React.useState(true);
  const authVerify = useStripeVerify();
  const navigate = useNavigate();

  const handleClosePremium = () => {
    setOpen(false);
  };
  const [userIsSubscribed, setUserIsSubscribed] = React.useState(false);
  const [userSubscription, setUserSubscription] = React.useState('');

  const useFetch = (url, token) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const oBJ = JSON.parse(result);
        setUserSubscription(oBJ);
      })
      .then(() => {
        // console.log(userSubscription);
      })
      .catch((error) => error(error));
  };

  React.useEffect(() => {
    useFetch('https://api.speakbetter.hng.tech/v1/subscription', localStorage.getItem('grittyusertoken'));
  }, []);

  const checkForArray = (data) => (Array.isArray(data) ? data : [data]);

  const handleCheckout = (plan) => {
    setInterval(plan);
    if (userSubscription?.data && userSubscription?.data?.length !== 0) {
      checkForArray(userSubscription?.data).map((item) => {
        if (item.status === 'success') {
          setUserIsSubscribed(true);
        } else {
          setUserIsSubscribed(false);
        }
      });
    }
  };

  const handleBack = () => {
    setInterval('');
  };
  const params = new URLSearchParams(window.location.search);

  React.useEffect(() => {
    authVerify
      .mutateAsync({
        sessionId: params.get('session_id'),
      })
      .then((res) => {
        if (res.data.message) {
          setSuccessOpen(true);
        }
      });
  }, []);

  if (interval.duration)
    return (
      <>
        <Checkout
          duration={interval.duration}
          open={open}
          handleClosePremium={handleClosePremium}
          Transition={Transition}
          handleBack={handleBack}
          zar={interval.zar}
          usd={interval.usd}
          ngn={interval.ngn}
          ngnplan={interval.ngnplan}
          plan={interval.plan}
          userIsSubscribed={userIsSubscribed}
        />
        <Toaster />
      </>
    );

  const handleClose = () => {
    setPaymentOpen(false);
    navigate('/me/home');
  };
  return (
    <div className={styles._sbDialog}>
      {successOpen && (
        <>
          <Dialog
            open={paymentOpen}
            onClose={handleClose}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Payment Successful'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Thank you subscribing to SpeakBetter. We appreciate you and will continue to bring you better services.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} className={styles._sbSuccess}>
                Start conversing now...
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
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
                  onClick={() =>
                    handleCheckout({
                      ngnplan: '31053',
                      plan: 'price_1MDCl7DsYRsW1yFupJ9WGYn5',
                      usd: 18.99,
                      ngn: 200,
                      zar: 35,
                      duration: 'monthly',
                    })
                  }
                >
                  <div className={styles._sbPricingTitles}>
                    <p>Monthly</p>
                    <h2>$18.99</h2>
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
                  onClick={() =>
                    handleCheckout({
                      ngnplan: '31054',
                      plan: 'price_1MD8wPDsYRsW1yFuyTdES0Mb',
                      usd: 59.99,
                      ngn: 200,
                      // zar: 100,
                      duration: 'quarterly',
                    })
                  }
                >
                  <div className={styles._sbPricingTitles}>
                    <p>Quarterly</p>
                    <h2>$59.99</h2>
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
                  onClick={() =>
                    handleCheckout({
                      ngnplan: '31055',
                      plan: 'price_1MDDBZDsYRsW1yFu6omANT0d',
                      usd: 20,
                      ngn: 249.99,
                      // zar: 350,
                      duration: 'annually',
                    })
                  }
                >
                  <div className={styles._sbPricingTitles}>
                    <p>Annually</p>
                    <h2>$249.99</h2>
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
                        $18.99<span> / month</span>
                      </p>
                      <button
                        onClick={() =>
                          handleCheckout({
                            ngnplan: '31053',
                            plan: 'price_1MDCl7DsYRsW1yFupJ9WGYn5',
                            usd: 18.99,
                            ngn: 30,
                            // zar: 35,
                            duration: 'monthly',
                          })
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
                        <span>Billed Quaterly - $59.99</span>
                      </h5>
                      <p>
                        $59.99<span> / 3 months</span>
                      </p>
                      <button
                        onClick={() =>
                          handleCheckout({
                            ngnplan: '31054',
                            plan: 'price_1MD8wPDsYRsW1yFuyTdES0Mb',
                            usd: 59.99,
                            ngn: 50,
                            // zar: 100,
                            duration: 'quarterly',
                          })
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
                        <span>Annually</span>
                        <span>Billed Annually - $249.99</span>
                      </h5>
                      <p>
                        $249.99<span> / year</span>
                      </p>
                      <button
                        onClick={() =>
                          handleCheckout({
                            ngnplan: '31055',
                            plan: 'price_1MDDBZDsYRsW1yFu6omANT0d',
                            usd: 249.99,
                            ngn: 3500,
                            // zar: 350,
                            duration: 'annually',
                          })
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
    </div>
  );
};

export default index;
