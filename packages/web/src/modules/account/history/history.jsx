import { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
// Mui
import {
  Button,
  Dialog,
  Slide,
  DialogActions,
  DialogContent,
  DialogContentText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import Errors from './errors';
import HistoryEmpty from './historyEmpty';
import search from '../../../assets/search.svg';
import { FaChevronDown } from 'react-icons/fa';
// import Correction from './correction';
import useGetChatHistory from '../../../hooks/account/useGetHistory';
import { BeatLoader } from 'react-spinners';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function History() {
  const [open, setOpen] = useState(false);
  const chatHistory = useGetChatHistory();

  const success = (msg) => toast.success(msg);
  const error = (msg) => toast.error(msg);

  console.log(chatHistory?.value);

  // const deleteHistory = () => {
  //   axios
  //     .delete(URL, { headers: { Authorization: `Bearer ${token}` } })
  //     .then((res) => {
  //       setHistory(res);
  //     })
  //     .then(() => {
  //       setTimeout(() => {
  //         success('History deleted successfully.');
  //       }, 2000);
  //       console.log('History deleted');
  //     })
  //     .catch((e) => {
  //       setTimeout(() => {
  //         error('An error occured', e.message);
  //       }, 2000);
  //       console.log(e);
  //     });
  // };
  const handleClose = () => {
    setOpen(false);
  };
  const formattedDate = (date) => {
    return new Date(date).toDateString();
  };

  if (chatHistory?.value && chatHistory?.value?.conversationHistory?.length) {
    return (
      <div className="flex flex-col h-full min-h-fitPage w-full pt-16 mx-0">
        <div className="flex items-center max-w-5xl mx-auto w-full justify-between">
          <h1 className="text-[#393939] sm:text-[32px] text-[24px] font-bold font-['DM_Sans'] leading-10">History</h1>
          <div className="sm:flex-[.95] flex-[.7] w-full relative max-w-sm">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search"
              className=" w-full px-5 py-3 outline-none rounded-lg bg-[#F6F6F6] border-0  hidden sm:block tex-[20px]"
            />
            <button
              type="submit"
              className="absolute top-0 right-0 w-[70px] h-full flex justify-center items-center cursor-pointer"
            >
              <img src={search} alt="search icon" />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start xl:ml-[7rem] lg:ml-[3rem] mt-16">
          <button
            className="text-[#EC1B1B] sm:text-base text-[14px] font-medium font-['DM_Sans'] leading-5 mb-7 outline-none"
            onClick={() => setOpen(true)}
          >
            Clear history
          </button>
          <div className="w-full">
            {chatHistory?.value?.conversationHistory?.slice(0, 3).map((data) => (
              <div key={data.botResponseId._id} className="flex justify-between items-center mb-3">
                <Accordion
                  className="w-full max-w-2xl"
                  sx={{ border: '1px solid #D7D7D7', borderRadius: '40px', boxShadow: 'none', background: '#F7F7F7' }}
                >
                  <AccordionSummary sx={{ fontSize: 14, fontWeight: 'light' }} expandIcon={<FaChevronDown />}>
                    <p className="text-[#5A5A5A] text-sm sm:text-md py-1">
                      {formattedDate(data.botResponseId.createdAt)}
                    </p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Errors errors={data.botResponseId} />
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to delete all conversation?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteHistory();
                handleClose();
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Toaster />
      </div>
    );
  }
  if (chatHistory?.value && chatHistory?.value?.conversationHistory?.length === 0) {
    <HistoryEmpty />;
  }
  return (
    <div className="w-full h-[200px] flex items-center justify-center">
      <BeatLoader size={16} color="#8C54BF" />
    </div>
  );
}

export default History;
