import React from 'react';
import styles from './index.module.css';
import { MdPayments } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useGetUserSubscription from '../../hooks/account/useGetUserSubscription';
import useUserProfile from '../../hooks/account/useUserProfile';
// import CircularProgress from '@mui/material/CircularProgress';

const Subscription = () => {
  const navigate = useNavigate();
  const userSubscription = useGetUserSubscription(localStorage.getItem('isEmail'));
  const userProfile = useUserProfile(localStorage.getItem('grittyuserid'));

  console.log(userSubscription?.value, 'userSubscription?.value');
  console.log(userProfile?.value, 'userProfile?.value');

  const handlePremium = () => {
    navigate('/premium');
  };
  const checkForArray = (data) => (Array.isArray(data) ? data : [data]);

  return (
    <div className={styles._subsPage}>
      <div className={styles._subsMain}>
        <h2>Subscription History</h2>
        <p>Manage Subscription information here</p>
      </div>

      {userSubscription.data && !userSubscription?.value && (
        <div className={styles.empty_state}>
          <MdPayments />
          <h3 className="">No Subscriptions</h3>
          <p>There have been no Subscription in this section yet</p>
          <button onClick={handlePremium}>Upgrade Now</button>
        </div>
      )}
      {/* {true && (
        <div className="h-20 w-full ">
          <CircularProgress color="inherit" size="xl" />
        </div>
      )} */}

      {userSubscription.data && userSubscription?.value && (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="left">Plan</TableCell>
                  <TableCell align="left">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checkForArray(userSubscription?.value).map((subs) => (
                  <TableRow key={subs?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {subs?.createdAt ? dayjs(subs?.createdAt).format('DD/MM/YYYY') : null}
                    </TableCell>
                    <TableCell align="left">{subs?.interval}</TableCell>
                    <TableCell align="left">NGN {subs?.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default Subscription;
