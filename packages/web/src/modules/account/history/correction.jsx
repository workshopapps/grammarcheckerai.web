import { useState, useEffect, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';

import back from '../../../assets/arrow-left.svg';
import trash from '../../../assets/trash.svg';
import HistoryModal from './modal';
import HistoryEmpty from './historyEmpty';
import React from 'react';
import axios from 'axios';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Correction() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('grittyusertoken');
  const URL = `https://api.speakbetter.hng.tech/v1/chatHistory`;
  
  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await axios.get(URL, {headers: {'Authorization': `Bearer ${token}`}});
        const historyData = res.data.conversationHistory;
        setHistory(historyData);
      } catch (e) {
        console.log('An error occured', e);
      }
    };
    getHistory();
  }, []);

  // const deleteIndividualHistory = (e) => {
  //   const delId = e.currentTarget.attributes['del-id'].value;
  //   const mapped = history.filter((element) => {
  //     return element.botResponseId._id !== delId;
  //   })
  //  console.log(mapped, 'hiiiiistory')
  // };

  const handleClose = () => {
    setOpen(false)
  }
  const formattedDate = (date) => {
    return new Date(date).toDateString();
  };
  const getTime = (time) => {
    return new Date(time).toLocaleTimeString();
  };
  if (history) {
    return (
      <>
        <div className="flex flex-col w-full h-full pt-16 pb-10 mx-6">
          <div className="flex items-center  justify-start gap-10">
            <button onClick={() => navigate(-1)} className="outline-none">
              <img src={back} alt="" />
            </button>
            <h1 className="text-[#393939] text-[32px] font-bold font-['DM_Sans'] leading-10">History</h1>
          </div>

          {history.map((data) => {
            return (
              <div key={data.botResponseId._id} className=" md:ml-[5rem] mt-12 max-w-2xl">
                <div className="flex justify-between items-center">
                  <p className="text-[#5A5A5A] sm:text-base text-[12px] font-normal leading-5 font-['Inter']">
                    {formattedDate(data.botResponseId.createdAt)}
                  </p>

                  <button onClick={() => { setOpen(true) }}>
                    <img src={trash} alt="" />
                  </button>
                </div>
                <div className="mt-5">
                  <h6 className="text-[#5A5A5A] font-normal font-['Inter'] sm:text-base text-sm leading-5">
                    Your Transcript
                  </h6>
                  <div className="bg-[#F6F6F6] rounded-lg  pb-3 px-4 mt-1">
                    <p className="text-[#393939] sm:font-base font-normal font-['Inter'] leading-5 text-sm py-6">
                      {data.botResponseId.transcribedAudioText}
                    </p>
                  </div>
                  <span className="flex justify-end items-end text-[#5A5A5A] text-[12px] font-normal font-['Inter']">
                    {getTime(data.botResponseId.createdAt)}
                  </span>
                </div>
                <div>
                  <h6 className="text-[#5A5A5A] font-normal font-['Inter'] sm:text-base text-sm leading-5">
                    Correction
                  </h6>
                  <div className="bg-[#F6F6F6] rounded-lg  pb-3 px-4 mt-1">
                    <p className="text-[#393939] sm:font-base font-normal font-['Inter'] leading-5 text-sm py-6">
                      {data.botResponseId.correctedText}
                    </p>
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
                      Delete history?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                      variant='contained'
                      color='error'
                      del-id={data.botResponseId._id}
                      // onClick={(event) => {
                      //   const idx = history.indexOf(event.currentTarget.attributes['del-id'].value);
                      //   idx > -1 && setHistory(history.splice(idx, 1)); handleClose()
                      // }}>
                      onClick={(event) => {
                        setHistory(history.filter(element => element.botResponseId._id !== event.currentTarget.attributes['del-id'].value));
                        handleClose()
                      }}> 
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            );
          })}
        </div>

        {/* <HistoryModal open={openModal} onClose={() => setOpenModal(false)} confirmText='Delete history?' /> */}
      </>
    );
  }
  return <HistoryEmpty />;
}

export default Correction;
