import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@mui/material';
import style from './popup.module.css';
import styles from './checkout.module.css';

const Checkout = (props) => {
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClosePremium}
      TransitionComponent={props.Transition}
      className={style._sbDialog}
    >
      <div className={styles._cpBody}>
        <div className={styles._cpCol1}>
          <button onClick={props.handleBack}>Back</button>
        </div>
        <div className={styles._cpCol2}>
          <h3>{props.duration}</h3>
        </div>
      </div>
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
