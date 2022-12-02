import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@mui/material';
import styles from './popup.module.css';

const Checkout = (props) => {
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClosePremium}
      TransitionComponent={props.Transition}
      className={styles._sbDialog}
    >
      <button onClick={props.handleBack}>Back</button>
      <h3>{props.duration}</h3>
    </Dialog>
  );
};

Checkout.propTypes = {
  open: PropTypes.node,
  handleClosePremium: PropTypes.func,
  handleBack: PropTypes.func,
  Transition: PropTypes.func,
  duration: PropTypes.node,
};

export default Checkout;
