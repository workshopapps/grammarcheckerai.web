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
import { motion } from 'framer-motion';
// import Correction from './correction';
import useGetChatHistory from '../../../hooks/account/useGetHistory';
import { BeatLoader } from 'react-spinners';
import useDeleteHistory from '../../../hooks/account/useDeletHistory';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function History() {
  const [open, setOpen] = useState(false);
  const chatHistory = useGetChatHistory();
  const deleteHistory = useDeleteHistory();

  const success = (msg) => toast.success(msg);
  const error = (msg) => toast.error(msg);

  const deleteHistoryHandler = () => {
    deleteHistory.mutateAsync({}).then((res) => {
      chatHistory.refetch();
      handleClose();
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const formattedDate = (date) => {
    return new Date(date).toDateString();
  };

  if (chatHistory?.value && chatHistory?.value?.conversationHistory?.length !== 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col h-full min-h-fitPage w-full pt-16 pb-7 mx-0"
      >
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
            {chatHistory?.value?.conversationHistory
              ?.reverse()
              .slice(0, 8)
              .map((data) => (
                <div key={data.botResponseId._id} className="flex justify-between items-center mb-3">
                  <Accordion
                    className="w-full max-w-2xl"
                    sx={{ border: '1px solid #D7D7D7', borderRadius: '40px', boxShadow: 'none', background: '#F7F7F7' }}
                  >
                    <AccordionSummary expandIcon={<FaChevronDown />}>
                      <p className="text-[#5A5A5A] text-sm sm:text-md py-1">
                        {formattedDate(data.botResponseId.createdAt)}
                      </p>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Errors
                        data={{
                          audio: data?.userResponseId?.audioURL,
                          botReply: data?.botResponseId?.botReply,
                          correctedText: data?.botResponseId?.correctedText,
                          createdAt: data?.botResponseId?.createdAt,
                          language: data?.botResponseId?.createdAt,
                          transcribedAudioText:
                            data?.botResponseId?.transcribedAudioText ?? data?.userResponseId?.textInput,
                          updatedAt: data?.botResponseId?.updatedAt,
                        }}
                      />
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
                deleteHistoryHandler();
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Toaster />
      </motion.div>
    );
  }
  if (chatHistory?.value && chatHistory?.value?.conversationHistory?.length === 0) {
    return <HistoryEmpty />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 4 }}
      transition={{ duration: 0.4 }}
      className="w-full h-[200px] flex items-center justify-center"
    >
      <BeatLoader size={16} color="#8C54BF" />
    </motion.div>
  );
}

export default History;
