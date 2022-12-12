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
import Skeleton from '@mui/material/Skeleton';
import useCancelPremium from '../../hooks/auth/useCancelPremium';
import toast, { Toaster } from 'react-hot-toast';
import LoadingButton from '@mui/lab/LoadingButton';
import Popover from '@mui/material/Popover';
import { Button } from '@mui/material';

const Subscription = () => {
  const navigate = useNavigate();
  const userSubscription = useGetUserSubscription(JSON.parse(localStorage.getItem('isUserDetails')).email);
  const [loading, setLoading] = React.useState(false);
  const premiumCancel = useCancelPremium();
  const [anchorEl, setAnchorEl] = React.useState(null);

  // React.useEffect(() => {
  //   console.log(userSubscription?.value);
  // }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handlePremium = () => {
    navigate('/premium');
  };
  const checkForArray = (data) => (Array.isArray(data) ? data : [data]);

  const handleProCancellation = () => {
    // console.log(userSubscription?.value);
    setLoading(true);
    if (userSubscription?.value && userSubscription?.value.length !== 0) {
      userSubscription?.value?.map((item) => {
        if (item.status === 'success') {
          premiumCancel
            .mutateAsync({
              email: item?.email,
              txref: item?.txref,
            })
            .then(() => {
              setLoading(false);
              toast.success('Subscription Cancelled Succesfully');
              userSubscription.refetch();
              // console.log('response', res);
              // console.log('new', userSubscription);
            });
        }
      });
    }
  };

  return (
    <div className={styles._subsPage}>
      <div className={styles._subsMain}>
        <h2>Subscription History</h2>
        <p>Manage Subscription information here</p>
      </div>

      {userSubscription.data && userSubscription?.value.length !== 0 ? (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="left">Plan</TableCell>
                  <TableCell align="left">Amount</TableCell>
                  <TableCell align="left">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checkForArray(userSubscription?.value).map((subs) => (
                  <TableRow key={subs?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {subs?.createdAt ? dayjs(subs?.createdAt).format('DD/MM/YYYY') : <Skeleton animation="wave" />}
                    </TableCell>
                    <TableCell align="left">{subs?.interval || <Skeleton animation="wave" />}</TableCell>
                    <TableCell align="left">
                      {`${subs?.currency} ${subs?.amount.$numberDecimal}` || <Skeleton animation="wave" />}
                    </TableCell>
                    <TableCell align="left">
                      {subs.status === 'success' ? (
                        <div className={styles._sbCancel}>
                          <LoadingButton loading={loading} variant="contained" color="secondary" onClick={handleClick}>
                            Cancel
                          </LoadingButton>
                          <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'center',
                            }}
                            transformOrigin={{
                              vertical: 'bottom',
                              horizontal: 'center',
                            }}
                          >
                            <div style={{ padding: '25px 10px' }}>
                              <h3>Are you sure you want to cancel?</h3>
                              <div className={styles._isUserCancel}>
                                <Button variant="outlined" color="secondary" onClick={handleClose}>
                                  No
                                </Button>
                                <LoadingButton
                                  loading={loading}
                                  variant="contained"
                                  color="error"
                                  onClick={handleProCancellation}
                                >
                                  Yes
                                </LoadingButton>
                              </div>
                            </div>
                          </Popover>
                        </div>
                      ) : (
                        <div>
                          <p>{subs?.status}</p>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <div className={styles._sbCancel}>
            <LoadingButton loading={loading} variant="outlined" color="secondary" onClick={handleProCancellation}>
              Cancel Subscription
            </LoadingButton>
          </div> */}
        </div>
      ) : (
        <div className={styles.empty_state}>
          <MdPayments />
          <h3 className="">No Subscriptions</h3>
          <p>There have been no Subscription in this section yet</p>
          <button onClick={handlePremium}>Upgrade Now</button>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Subscription;
