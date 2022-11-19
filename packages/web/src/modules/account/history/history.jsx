import { useState } from 'react';
import Errors from './errors';
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
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col pt-16 md:ml-[62px] md:mr-[9rem] sm:mx-[70px] mx-6">
      <div className="flex items-center sm:justify-between justify-end">
        <h1 className="text-[#393939] text-[32px] font-bold font-['DM_Sans'] leading-10">History</h1>
        <div className="sm:flex-[.95] flex-[.5] w-full relative">
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
        <p className="text-[#EC1B1B] sm:text-base text-[14px] font-medium font-['DM_Sans'] leading-5 mb-7">
          Clear history
        </p>
        <div className="w-full">
          {historyDays.map((days) => (
            <>
              <div key={days.id} className="flex justify-between items-center mb-6">
                <p className="text-[#5A5A5A] sm:text-base text-[12px] font-normal leading-5 font-['Inter']">
                  {days.date}
                </p>
                <button
                  onClick={() => {
                    setOpenId(days.id);
                    setOpen(!open);
                  }}
                >
                  <img src={openId === days.id && open ? arrowUp : arrowDown} alt="" className="w-[35px] h-[7px]" />
                </button>
              </div>
              {openId === days.id && open && <Errors id={days.id} />}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;
