import { useState } from 'react';
import Errors from './errors';
import HistoryEmpty from './historyEmpty';
import search from '../../../assets/search.svg';
import arrowDown from '../../../assets/arrowDown.svg';
import arrowUp from '../../../assets/arrowUp.svg';

const historyDays = [
  { id: '1', date: 'Today - Thursday, 19 September 2022' },
  { id: '2', date: 'Yesterday - Wednesday, 18 September 2022' },
  { id: '3', date: 'Last week' },
  { id: '4', date: 'Last month' },
];

function History() {
  const [openId, setOpenId] = useState(null);
  if (historyDays?.length) {
    return (
      <div className="flex flex-col pt-16 md:ml-[62px] md:mr-[9rem] sm:mx-[70px] mx-6">
        <div className="flex items-center sm:justify-between justify-end">
          <h1 className="text-[#393939] sm:text-[32px] text-[24px] font-bold font-['DM_Sans'] leading-10">History</h1>
          <div className="sm:flex-[.95] flex-[.7] w-full relative">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search"
              className=" w-full px-5 py-3 outline-none rounded-lg bg-[#F6F6F6] border-0 hidden sm:block tex-[20px]"
            />
            <button
              type="submit"
              className="absolute top-0 right-0 w-[70px] h-full flex justify-center items-center cursor-pointer"
            >
              <img src={search} alt="search icon" />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start md:ml-[7rem] mt-16">
          <button className="text-[#EC1B1B] sm:text-base text-[14px] font-medium font-['DM_Sans'] leading-5 mb-7 outline-none ">
            Clear history
          </button>
          <div className="w-full">
            {historyDays.map((days) => (
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
      </div>
    );
  }
  return <HistoryEmpty />;
}

export default History;
