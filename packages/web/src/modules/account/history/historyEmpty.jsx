import empty from '../../../assets/empty.svg';

function HistoryEmpty() {
  return (
    <div className="flex justify-center items-center flex-col sm:px-0 px-4 h-[300px]">
      <img
        src={empty}
        alt="empty icon"
        className="sm:w-[180px] sm:h-[180px] w-[120px] h-[120px] flex justify-center items-center"
      />
      <h4 className="text-[#393939] font-[''DM_Sans'] text-center mb-2 mt-2 sm:text-[32px] text-[24px] font-bold">
        Your conversation history is empty
      </h4>
      <p className="text-[#5A5A5A] sm:text-base text-sm font-normal font-['Inter'] text-center leading-5">
        Hold a conversation with our chatbot to get started
      </p>
    </div>
  );
}

export default HistoryEmpty;
