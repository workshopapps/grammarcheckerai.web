import React from 'react';
import styles from './index.module.css';
import { MdPayments } from 'react-icons/md';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import axios from 'axios';

const Subscription = (props) => {
  // const useFetch = (url) => {
  //   var requestOptions = {
  //     method: 'GET',
  //     customer: 'tshalom01@gmail.com',
  //     headers: {
  //       Authorization: 'Bearer sk_test_11cd20d24df0f472d32521e1bfb3c00608593c54',
  //     },
  //   };

  //   fetch(url, requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => {
  //       const oBJ = JSON.parse(result);
  //       console.log(oBJ);
  //     })
  //     .catch((err) => console.log(err.message));
  // };

  // const handleUserSubs = () => {
  //   useFetch('https://api.paystack.co/subscription');
  // };

  return (
    <div className={styles._subsPage}>
      <div></div>
      <div className={styles.empty_state}>
        <MdPayments />
        {/* <button onClick={handleUserSubs} color="primary">
          View user
        </button> */}
        <h3 className="">No Subscriptions</h3>
        <p>There have been no Subscription in this section yet</p>
        <button>Upgrade Now</button>
      </div>
    </div>
  );
};

Subscription.propTypes = {};

export default Subscription;
