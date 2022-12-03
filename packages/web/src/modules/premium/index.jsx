import React from 'react';
import styles from './index.module.css';
import { MdPayments } from 'react-icons/md';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import axios from 'axios';

const Subscription = (props) => {
  const [isUserHistory, setIsUserHistory] = React.useState([]);
  const useFetch = (url) => {
    var requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer sk_test_11cd20d24df0f472d32521e1bfb3c00608593c54',
      },
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const oBJ = JSON.parse(result);
        console.log(oBJ.data);
        setIsUserHistory(oBJ.data);
      })
      .catch((err) => console.log(err.message));
  };

  React.useEffect(() => {
    useFetch(`https://api.paystack.co/subscription/`);
  }, []);

  return (
    <div className={styles._subsPage}>
      {isUserHistory === '' && isUserHistory == null ? (
        <div className={styles.empty_state}>
          <MdPayments />
          <h3 className="">No Subscriptions</h3>
          <p>There have been no Subscription in this section yet</p>
          <button>Upgrade Now</button>
        </div>
      ) : (
        <div>{isUserHistory.map((subs, index) => {})}</div>
      )}
    </div>
  );
};

Subscription.propTypes = {};

export default Subscription;
