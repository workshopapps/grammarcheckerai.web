import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@mui/material';
import style from './popup.module.css';
import styles from './checkout.module.css';
import OutlinedInput from '@mui/material/OutlinedInput';

const Checkout = (props) => {
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClosePremium}
      TransitionComponent={props.Transition}
      className={style._sbDialog}
    >
      <div className={styles._cpHeader}>
        <button onClick={props.handleBack}>Back</button>
      </div>
      <div className={styles._cpBody}>
        <div className={styles._cpCol1}>
          <div className={styles._cpUserFields}>
            <div className={styles._cpCheckoutFields}>
              <p>First Name</p>
              <OutlinedInput placeholder="John" fullWidth color="secondary" />
            </div>
            <div className={styles._cpCheckoutFields}>
              <p>Last Name</p>
              <OutlinedInput placeholder="Doe" fullWidth color="secondary" />
            </div>
            <div className={styles._cpCheckoutFields}>
              <p>Email</p>
              <OutlinedInput placeholder="johndoe@example.com" fullWidth color="secondary" />
            </div>
            <div className={styles._cpCheckoutFields}>
              <p>Password</p>
              <OutlinedInput placeholder="" fullWidth color="secondary" type="password" />
            </div>
            <div className={styles._cpCheckoutFields}>
              <p>Confirm Password</p>
              <OutlinedInput placeholder="" fullWidth color="secondary" type="password" />
            </div>
          </div>
        </div>
        <div className={styles._cpCol2}>
          <h3>{props.duration}</h3>
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
};

export default Checkout;
