import React from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { IconButton, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import micImg from '../../../assets/images/mic.svg';
import useSendText from '../../../hooks/account/useSendText';
import { BeatLoader } from 'react-spinners';

function ChatInput({ setChats }) {
  const userId = localStorage.getItem('grittyuserid');
  const sendText = useSendText();

  const [text, setText] = React.useState('');

  const handleTextMsg = (ev) => {
    ev.preventDefault();

    if (text.trim()) {
      const reqBody = {
        textInput: text,
        language: 'English',
        userId,
      };

      sendText
        .mutateAsync(reqBody)
        .then((res) => {
          const { botReply, correctedText, createdAt, updatedAt, language } = res.data.data.botResponse;
          setChats((prevState) => [
            ...prevState,
            {
              audio: null,
              botReply,
              correctedText,
              createdAt,
              language,
              transcribedAudioText: text,
              updatedAt,
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
      setText('');
    }
  };
  return (
    <div className="w-full border-t bg-white py-2 ">
      <div className="w-full px-5 max-w-[1000px] relative mx-auto flex space-x-2">
        <div className="absolute -top-8 right-10">{sendText.isLoading && <BeatLoader size={12} color="#8C54BF" />}</div>
        <form className="w-full relative" onSubmit={handleTextMsg}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Talk to chipy bob"
            className="w-full border text-[#5A5A5A] h-full rounded-[10px] px-4 pr-28 active:shadow-sm focus:shadow-sm outline-none"
          />
          <div className="absolute top-4 right-16">
            <button
              className={`rounded-full h-8 w-8 bg-[#5D387F] flex items-center justify-center focus:outline-none focus:ring focus:border-[#5D387F] transition ease-in-out ${
                status === 'recording' ? styles._bot_mic : ''
              }`}
            >
              <img src={micImg} alt="" className="w-3" />
            </button>
          </div>
          <div className="absolute top-3 right-3">
            <Tooltip arrow title="start recording">
              <IconButton type="sumbit" color="secondary" disabled={!text}>
                <AiOutlineSend />
              </IconButton>
            </Tooltip>
          </div>
        </form>

        <div>
          <button className="h-[62px] w-full px-10 min-w-[170px] text-[15px] max-w-[200px] font-bold text-[#5D387F] bg-[#E8DDF2] rounded-[8px]">
            Reset Chat
          </button>
        </div>
      </div>
    </div>
  );
}
ChatInput.propTypes = {
  setChats: PropTypes.func,
};

export default ChatInput;
