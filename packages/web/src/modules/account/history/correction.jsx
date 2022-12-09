import { useNavigate } from 'react-router-dom';
import back from '../../../assets/arrow-left.svg';
import trash from '../../../assets/trash.svg';
import { useState } from 'react';
import HistoryModal from './modal';
import HistoryEmpty from './historyEmpty';

function Correction() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [history, setHistory] = useState([]);

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
  const getTime = (time) => {
    return new Date(time).toLocaleTimeString();
  };
  if (history) {
    return (
      <>
        <div className="flex flex-col pt-16 md:ml-[62px] md:mr-[9rem] sm:mx-[70px] mx-6">
          <div className="flex items-center  justify-start gap-10">
            <button onClick={() => navigate(-1)} className="outline-none">
              <img src={back} alt="" />
            </button>
            <h1 className="text-[#393939] text-[32px] font-bold font-['DM_Sans'] leading-10">History</h1>
          </div>

          {history.map((data) => {
            return (
              <div key={data.botResponseId._id} className=" md:ml-[5rem] mt-12">
                <div className="flex justify-between items-center">
                  <p className="text-[#5A5A5A] sm:text-base text-[12px] font-normal leading-5 font-['Inter']">
                    {formattedDate(data.botResponseId.createdAt)}
                  </p>

                  <button onClick={() => setOpenModal(true)}>
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
              </div>
            );
          })}
        </div>
        <HistoryModal open={openModal} onClose={() => setOpenModal(false)} setHistory={() => setHistory([])} />
      </>
    );
  }
  return <HistoryEmpty />;
}

export default Correction;
