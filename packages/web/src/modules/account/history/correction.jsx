import { useNavigate } from 'react-router-dom';
import back from '../../../assets/arrow-left.svg';
import trash from '../../../assets/trash.svg';

function Correction() {
  const history = useNavigate();
  return (
    <div className="flex flex-col pt-16 md:ml-[62px] md:mr-[9rem] sm:mx-[70px] mx-6">
      <div className="flex items-center  justify-start gap-10">
        <button onClick={() => history(-1)} className="outline-none">
          <img src={back} alt="" />
        </button>
        <h1 className="text-[#393939] text-[32px] font-bold font-['DM_Sans'] leading-10">History</h1>
      </div>
      <div className=" md:ml-[5rem] mt-12">
        <div className="flex justify-between items-center">
          <p className="text-[#5A5A5A] sm:text-base text-[12px] font-normal leading-5 font-['Inter']">
            Today - Thursday, 19 September 2022
          </p>
          <img src={trash} alt="" />
        </div>
        <div className="mt-5">
          <h6 className="text-[#5A5A5A] font-normal font-['Inter'] sm:text-base text-sm leading-5">Your Transcript</h6>
          <div className="bg-[#F6F6F6] rounded-lg  pb-3 px-4 mt-1">
            <p className="text-[#393939] sm:font-base font-normal font-['Inter'] leading-5 text-sm py-6">
              The weather today am cold. I am freeze and I do not knowing how to make myself warmed. I plan on move to
              another continent that is not cold.
            </p>
          </div>
          <span className="flex justify-end items-end text-[#5A5A5A] text-[12px] font-normal font-['Inter']">
            12:04pm
          </span>
        </div>
        <div>
          <h6 className="text-[#5A5A5A] font-normal font-['Inter'] sm:text-base text-sm leading-5">Correction</h6>
          <div className="bg-[#F6F6F6] rounded-lg  pb-3 px-4 mt-1">
            <p className="text-[#393939] sm:font-base font-normal font-['Inter'] leading-5 text-sm py-6">
              The weather today is cold. I am freezing and I do not know how to make myself warm. I plan on moving to
              another continent that is not cold.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Correction;
