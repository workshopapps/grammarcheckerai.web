import React from 'react';
import PropTypes from 'prop-types';
import userImg from '../../assets/images/user.svg';
import dayjs from 'dayjs';
import RiveBot from '../RiveBot';
import chirpy from '../../assets/chirpy.svg';

function Chat({ isBot, isCorrection, createdAt = '11:20 AM', text, isLastReply, noRive }) {
  let userText = ''
  let botCorrection = ''
  if (!isCorrection && !isBot ) {
    userText = text
  }
  if (isCorrection) {
    botCorrection = text
  }

  function highlight(newText, oldText){ 
  let text = ''
  newText.split('').forEach(function(val, i){
    if (val != oldText.charAt(i))
      text += "<span className='text-red-100'>"+ val +"</span>";  
    else
      text += val;            
  });
    return <p dangerouslySetInnerHTML={{ __html: text}} />;
}
  //console.log(userText, botCorrection)
  return (
    <div
      className={`flex max-w-xs xs:max-w-sm sm:max-w-lg w-full text-left align-text-bottom space-x-1 ${
        isBot ? 'mr-auto' : 'ml-auto '
      } ${isLastReply ? 'pl-0' : 'pl-14'}`}
    >
      <div className="order-1 w-full">
        <div
          className={`p-4 rounded-lg shadow-sm border border-[#5D387F31] space-y-2 ${
            isBot ? 'rounded-bl-none bg-purple-100' : 'rounded-br-none bg-purple-500'
          }`}
        >
          {isCorrection && <p className="font-bold text-lg">Correction</p>}
          <p
            className={`text-[15px] ${isCorrection ? 'text-[#279371]' : 'text-white'} ${
              isBot && !isCorrection ? 'text-slate-700' : 'text-white'
            }`}
          >
            {text}
            {highlight(botCorrection, userText)}
            {console.log(highlight(botCorrection, userText))}
          </p>
        </div>
        <p className={`text-xs mb-2 text-slate-800 pt-1 ${isBot ? 'text-right' : 'text-left'}`}>
          {dayjs(createdAt).format('h:mm A')}
        </p>
      </div>

      {isLastReply && (
        <div className={`mt-auto ${isBot ? 'w-12 sm:w-12' : 'order-1 w-6 sm:w-8'}`}>
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
