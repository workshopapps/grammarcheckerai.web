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

const Subscription = () => {
  const [isUserHistory, setIsUserHistory] = React.useState([]);
  const navigate = useNavigate();

  const useNewFetch = (url) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('grittyusertoken')}`,
      },
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const oBJ = JSON.parse(result);
        localStorage.setItem('isEmail', oBJ.data.email);
      })
      .catch((error) => error('error', error));
  };

  const useFetch = (url) => {
    var requestOptions = {
      method: 'GET',
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const oBJ = JSON.parse(result);
        if (Array.isArray(oBJ.data)) {
          setIsUserHistory(oBJ.data);
          return;
        }
        setIsUserHistory([oBJ.data]);
      })
      .catch((err) => console.log(err.message));
  };

  React.useEffect(() => {
    useNewFetch(`https://api.speakbetter.hng.tech/v1/user/profile/${localStorage.getItem('grittyuserid')}`);
    useFetch(`https://api.speakbetter.hng.tech/v1/subscribe?email=${localStorage.getItem('isEmail')}`);
  }, []);

  const handlePremium = () => {
    navigate('/premium');
  };

  return (
    <div className={styles._subsPage}>
      <div className={styles._subsMain}>
        <h2>Subscription History</h2>
        <p>Manage Subscription information here</p>
      </div>
      {isUserHistory.length < 1 ? (
        <div className={styles.empty_state}>
          <MdPayments />
          <h3 className="">No Subscriptions</h3>
          <p>There have been no Subscription in this section yet</p>
          <button onClick={handlePremium}>Upgrade Now</button>
        </div>
      ) : (
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
                {isUserHistory.map((subs) => (
                  <TableRow key={subs._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {dayjs(subs.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell align="left">{subs.interval}</TableCell>
                    <TableCell align="left">NGN {subs.amount}</TableCell>
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
