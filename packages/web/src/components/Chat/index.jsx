import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import chirpy from '../../assets/chirpy.svg';

function Chat({ isBot, isCorrection, createdAt = '11:20 AM', text, isLastReply }) {
  return (
    <div
      className={`flex max-w-xs xs:max-w-sm sm:max-w-lg w-full text-left align-text-bottom space-x-1 ${
        isBot ? 'mr-auto' : 'ml-auto '
      } ${isLastReply ? 'pl-0' : 'pl-[48px]'}`}
    >
      <div className="order-1 w-full">
        <div
          className={`p-4 py-3 rounded-[10px] border border-[#E8DDF2] space-y-2 ${
            isBot ? 'rounded-tl-none bg-white text-slate-700' : 'rounded-br-none text-white bg-[#5D387F]'
          }`}
        >
          {isCorrection && <p className="font-bold text-lg">Correction</p>}
          <p className={`text-[15px] ${isCorrection ? 'text-[#279371]' : ''}`}>{text}</p>
        </div>
        {!isCorrection && (
          <p className={`text-xs mb-2 text-slate-800 pt-1 text-right relative`}>
            {!isCorrection && !isBot && <span className="absolute bottom-0 left-0">Transcript</span>}
            {dayjs(createdAt).format('h:mm A')}
          </p>
        )}
      </div>

      {isLastReply && (
        <div className={`-mt-0 ${isBot ? 'w-12 sm:w-18 pr-2' : 'order-1 w-6 sm:w-8'}`}>
          {isBot ? <img src={chirpy} alt="" className="w-full" /> : null}
        </div>
      )}
    </div>
  );
}

Chat.propTypes = {
  isBot: PropTypes.bool,
  isCorrection: PropTypes.bool,
  text: PropTypes.string,
  createdAt: PropTypes.string,
  isLastReply: PropTypes.bool,
  noRive: PropTypes.bool,
};
export default Chat;
