import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import chirpy from '../../assets/chirpy.svg';
import { BsPatchCheckFill } from 'react-icons/bs';

function Chat({ isBot, isCorrection, correct, isCorrectionHeader, createdAt = '11:20 AM', text, isLastReply }) {
  return (
    <div
      className={`flex max-w-xs xs:max-w-sm sm:max-w-md w-full  text-left align-text-bottom space-x-1 ${
        isBot ? 'mr-auto' : 'ml-auto '
      } ${isLastReply ? 'pl-0' : 'pl-[10px]'}`}
    >
      <div className="order-1 w-full">
        <div
          className={`p-4 py-3 relative rounded-[10px] border border-[#E8DDF2] space-y-2 ${
            isBot ? 'rounded-tl-none bg-[#E8DDF2] text-slate-700' : 'rounded-br-none  bg-white'
          }`}
        >
          {isCorrectionHeader && <p className="font-bold text-[#393939] text-sm">Correction</p>}
          <p className={`text-[15px] text-[#393939] ${isCorrection ? '' : ''}`}>{text}</p>

          {correct && (
            <div className="absolute top-1 -left-7">
              <BsPatchCheckFill color="#2FB087" />
            </div>
          )}
        </div>
        {!isCorrection && (
          <p className={`text-xs mb-2 text-slate-800 pt-1 relative ${isBot ? 'text-left' : 'text-right'}`}>
            {correct && <span className="absolute bottom-0 left-0 text-[#2FB087]">No correction</span>}
            {dayjs(createdAt).format('h:mm A')}
          </p>
        )}
      </div>

      {isLastReply && (
        <div className={`-mt-0 ${isBot ? 'w-12 sm:w-18 pr-0 sm:pr-2' : 'order-1 w-6 sm:w-8'}`}>
          {isBot ? <img src={chirpy} alt="" className="w-full" /> : null}
        </div>
      )}
    </div>
  );
}

Chat.propTypes = {
  isBot: PropTypes.bool,
  isCorrection: PropTypes.bool,
  isCorrectionHeader: PropTypes.bool,
  text: PropTypes.string,
  createdAt: PropTypes.string,
  isLastReply: PropTypes.bool,
  correct: PropTypes.bool,
};
export default Chat;
