import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { TextField, Button } from '@mui/material';
import usePremium from '../../hooks/auth/usePremium';
const Premium = () => {
  const planPremium = usePremium();
  const publicKey = 'pk_test_0c3ed4c2ad95f30b182a119b48ae9f99e9c4cb5c';
  const amount = 100;
  const currency = 'ZAR';
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const componentProps = {
    reference: new Date().getTime().toString(),
    email,
    amount,
    currency,
    metadata: {
      name,
    },
    publicKey,
    text: 'Subscribe',

    onSuccess: () => {
      planPremium
        .mutateAsync({
          customer: email,
          plan: 'PLN_4yhibhhlmcw51j4',
        })
        .then((res) => {
          console.log(res);
          setName(res);
        })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    },
    onClose: () => alert('njddsdhj'),
  };

  const useFetch = (url) => {
    var requestOptions = {
      method: 'GET',
      customer: email,
      headers: {
        Authorization: 'Bearer sk_test_7c8d4865357e9ee081faf517549b011044a8cd12',
      },
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const oBJ = JSON.parse(result);
        console.log(oBJ);
      })
      .catch((err) => console.log(err.message));
  };

  const handleUserSubs = () => {
    useFetch('https://api.paystack.co/subscription');
  };

  return (
    <div>
      <div>
        <TextField
          fullWidth
          label="Full names"
          id="fullWidth"
          value={name}
          type={'text'}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="email"
          id="fullWidth"
          type={'email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {email !== '' && name !== '' ? <PaystackButton {...componentProps} /> : null}
      </div>
      <Button onClick={handleUserSubs} variant="outlined" color="primary">
        Get user List
      </Button>
    </div>
  );
};

export default Premium;
