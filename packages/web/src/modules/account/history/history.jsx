import { useState, useEffect } from 'react';
import Errors from './errors';
import HistoryModal from './modal';
import HistoryEmpty from './historyEmpty';
import search from '../../../assets/search.svg';
import arrowDown from '../../../assets/arrowDown.svg';
import arrowUp from '../../../assets/arrowUp.svg';

// const historyDays = [
//   { id: '1', date: 'Today - Thursday, 19 September 2022' },
//   { id: '2', date: 'Yesterday - Wednesday, 18 September 2022' },
//   { id: '3', date: 'Last week' },
//   { id: '4', date: 'Last month' },
// ];


const url = "https://grittygrammar.hng.tech/api/v1/chathistory/:6d04fa09-1ccf-42d0-83db-d61cd8af270c"


function History() {
  const [history, setHistory] = useState(null);
  // const [historyDays, setHistoryDays] = useState(null)
  useEffect(() => {

    const fetchData = async () => {
      try{
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        // setHistory(json)
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData();
  }, []);
  

  const [openId, setOpenId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  if (history?.length) {
    return (
      <div className="flex flex-col pt-16 xl:ml-[62px] xl:mr-[9rem] lg:ml-[52px] lg:mx-[4rem] md:mx-[42px] sm:mx-[30px] mx-6">
        <div className="flex items-center sm:justify-between justify-end">
          <h1 className="text-[#393939] sm:text-[32px] text-[24px] font-bold font-['DM_Sans'] leading-10">History</h1>
          <div className="sm:flex-[.95] flex-[.7] w-full relative">
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
            {history?.map((days) => (
              <>
                <div key={days.id} className="flex justify-between items-center mb-6">
                  <p className="text-[#5A5A5A] sm:text-base text-[12px] font-normal leading-5 font-['Inter']">
                    {days.date}
                  </p>
                  <button
                    className="p-[5px]"
                    onClick={() => {
                      setOpenId(days.id === openId ? null : days.id);
                    }}
                  >
                    <img src={openId === days.id ? arrowUp : arrowDown} alt="" className="w-[35px] h-[7px]" />
                  </button>
                </div>
                {openId === days.id && <Errors id={days.id} />}
              </>
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
