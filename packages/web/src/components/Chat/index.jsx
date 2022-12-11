import React from 'react';
import PropTypes from 'prop-types';
import userImg from '../../assets/images/user.svg';
import dayjs from 'dayjs';
import RiveBot from '../RiveBot';
import chirpy from '../../assets/chirpy.svg';

function Chat({ isBot, isCorrection, createdAt = '11:20 AM', text, isLastReply, noRive }) {
  return (
    <div
      className={`flex max-w-lg w-full text-left align-text-bottom space-x-1 ${isBot ? 'mr-auto' : 'ml-auto '} ${
        isLastReply ? 'pl-0' : 'pl-14'
      }`}
    >
      <div className="order-1 w-full">
        <div
          className={`p-4 rounded-lg bg-white shadow-sm border border-[#5D387F31] space-y-2 ${
            isBot ? 'rounded-bl-none' : 'rounded-br-none'
          }`}
        >
          {isCorrection && <p className="font-bold text-lg">Correction</p>}
          <p className={`text-[15px] ${isCorrection ? 'text-[#279371]' : 'text-slate-700'}`}>{text}</p>
        </div>
        <p className={`text-xs mb-2 text-slate-800 pt-1 ${isBot ? 'text-right' : 'text-left'}`}>
          {dayjs(createdAt).format('h:mm A')}
        </p>
      </div>

      {isLastReply && (
        <div className={`mt-auto ${isBot ? 'ml-auto w-8 sm:w-12' : 'order-1 w-6 sm:w-8'}`}>
          {isBot ? (
            noRive ? (
              <img src={chirpy} alt="" className="w-full" />
            ) : (
              <RiveBot size="small" />
            )
          ) : (
            <img src={userImg} alt="" className="max-w-full" />
          )}
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
