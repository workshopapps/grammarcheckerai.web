import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import styles from './premiumcheck.module.css';
import { IconButton } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import medal from '../Assets/medal-star.png';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const index = (props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/premium');
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClosePremium}
      TransitionComponent={Transition}
      className={styles._sbDialog}
    >
      <div className={styles._sbpopup}>
        <div className={styles._sbheader}>
          <div>
            <div className={styles._sbmedal}>
              <img src={medal} alt="medal" />
              <h3>Premium Feature.</h3>
            </div>
            <p>20 seconds free trial exceeded</p>
          </div>
          <div className={styles._sbmodalclose}>
            <IconButton onClick={props.handleClosePremium}>
              <AiOutlineClose />
            </IconButton>
          </div>
        </div>
        <div className={styles._sbpremium}>
          <p>
            You voice note has exceeded the allocated duration for free accounts which is 20 seconds. To gain access to
            more minutes and other amazing features. Please visit the premium page for more info.
          </p>
        </div>
        <div className={styles._sbfooterpro}>
          <button onClick={handleNavigate}>Visit Premium Page</button>
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
