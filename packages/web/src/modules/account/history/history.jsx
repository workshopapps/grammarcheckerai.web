import { useState, useEffect } from 'react';
import axios from 'axios';
import Errors from './errors';
import HistoryModal from './modal';
import HistoryEmpty from './historyEmpty';
import search from '../../../assets/search.svg';
import { FaChevronDown } from 'react-icons/fa';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';

function History() {
  const [history, setHistory] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const userId = localStorage.getItem('grittyuserid');
  const URL = `https://api.speakbetter.hng.tech/v1/chatHistory?userId=${userId}`;

  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await axios.get(URL);
        const historyData = res.data.conversationHistory;
        setHistory(historyData);
      } catch (e) {
        console.log('An error occured', e);
      }
    };
    getHistory();
  }, []);

  const formattedDate = (date) => {
    return new Date(date).toDateString();
  };

  if (history?.length) {
    return (
      <div className="flex flex-col h-full w-full pt-16 mx-0">
        <div className="flex items-center max-w-5xl mx-auto w-full sm:justify-between justify-end">
          <h1 className="text-[#393939] sm:text-[32px] text-[24px] font-bold font-['DM_Sans'] leading-10">History</h1>
          <div className="sm:flex-[.95] flex-[.7] w-full relative max-w-2xl">
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
            onClick={() => setOpenModal(true)}
          >
            Clear history
          </button>
          <div className="w-full">
            {history?.map((data) => (
              <div key={data.botResponseId._id} className="flex justify-between items-center mb-6">
                <Accordion className="w-full max-w-2xl">
                  <AccordionSummary expandIcon={<FaChevronDown />}>
                    <Typography>{formattedDate(data.botResponseId.createdAt)}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Errors errors={data.botResponseId} />
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
        <HistoryModal open={openModal} onClose={() => setOpenModal(false)} setHistory={() => setHistory([])} />
      </div>
    );
  }
  return <HistoryEmpty />;
}

export default History;
