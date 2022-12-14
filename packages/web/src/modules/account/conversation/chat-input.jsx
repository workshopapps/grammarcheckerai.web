import React from 'react';
import { AiOutlineSend, AiOutlineCheck } from 'react-icons/ai';
import { IconButton, Tooltip, Popper } from '@mui/material';
import PropTypes from 'prop-types';
import micImg from '../../../assets/images/mic.svg';
import useSendText from '../../../hooks/account/useSendText';
import { BeatLoader } from 'react-spinners';
import styles from './index.module.css';
import { convertSecToMin } from '../../../lib/utils';
import audioImg from '../../../assets/audio.svg';
import Audio from '../../../components/Audio';

function ChatInput({
  setChats,
  status,
  startRecording,
  stopRecording,
  submitAudioHandler,
  clearMediaBlob,
  mediaBlob,
  counter,
}) {
  const userId = localStorage.getItem('grittyuserid');
  const [variant, setVariant] = React.useState('none');
  const sendText = useSendText();
  const [text, setText] = React.useState('');

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = status === 'recording' ? 'simple-popper' : undefined;

  const handleTextMsg = (ev) => {
    ev.preventDefault();
    if (text.trim() && variant === 'text') {
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
          // console.log(err);
        });
      setText('');
      setVariant('none');
      return;
    }

    if (status === 'stopped' && variant === 'audio') {
      submitAudioHandler();
      setVariant('none');
    }
  };

  const onMicHandler = (ev) => {
    handleClick(ev);
    if (status === 'idle' || status === 'stopped') {
      clearMediaBlob();
      setText('');
      setVariant('audio');
      startRecording();
      return;
    }
    if (status === 'recording') {
      stopRecording();
      setVariant('audio');
    }
  };

  return (
    <div className="w-full border-t bg-white py-3 relative">
      {status === 'recording' && (
        <div className="w-full h-[300px] absolute bottom-0 left-0 block z-10 opacity-70 bg-gradient-to-t from-white" />
      )}
      <div className="w-full px-5 max-w-[1000px] relative mx-auto flex space-x-2">
        <div className="absolute -top-8 right-10">{sendText.isLoading && <BeatLoader size={12} color="#8C54BF" />}</div>
        <form className="w-full relative" onSubmit={handleTextMsg}>
          {variant === 'audio' && status === 'stopped' && mediaBlob ? (
            <div className="absolute top-2 left-3">
              <Audio variant counter={counter} audio={URL.createObjectURL(mediaBlob)} />
            </div>
          ) : null}
          <input
            value={text}
            onChange={(e) => {
              setVariant('text');
              setText(e.target.value);
            }}
            placeholder="Talk to chipy bob"
            className="w-full border text-[#5A5A5A] h-full rounded-[10px] px-4 pr-28 active:shadow-sm focus:shadow-sm outline-none"
          />
          <div className="absolute top-4 right-16 z-20">
            <Tooltip arrow title={status !== 'recording' ? 'Start recording' : null}>
              <button
                type="button"
                onClick={onMicHandler}
                className={`rounded-full h-8 w-8 bg-[#5D387F] flex items-center justify-center focus:outline-none focus:ring focus:border-[#5D387F] transition ease-in-out ${
                  status === 'recording' ? styles._bot_mc : ''
                }`}
              >
                {status === 'recording' ? (
                  <div className="z-50 ">
                    <AiOutlineCheck size={20} color="#fff" />
                  </div>
                ) : (
                  <img src={micImg} alt="" className="w-3" />
                )}
                <span style={{ '--i': 0 }}></span>
                <span style={{ '--i': 1 }}></span>
                <span style={{ '--i': 2 }}></span>
                <span style={{ '--i': 3 }}></span>
              </button>
            </Tooltip>
            <Popper id={id} open={open} anchorEl={anchorEl}>
              <div className="pb-3">
                <div className="bg-white text-slate-700 border shadow-sm py-3 rounded-md px-2 flex space-x-3 justify-between">
                  <div className="animate-pulse">
                    <img src={audioImg} alt="" />
                  </div>
                  <p className="text-sm">{convertSecToMin(counter)}</p>
                </div>
              </div>
            </Popper>
          </div>
          <div className="absolute top-3 right-3">
            <Tooltip arrow title="Send">
              <IconButton type="sumbit" color="secondary" disabled={!text && !mediaBlob}>
                <AiOutlineSend />
              </IconButton>
            </Tooltip>
          </div>
        </form>

        <div>
          <button className="h-[65px] w-full px-8 min-w-[160px] ring-[#5D387F76] focus:ring-2 transition-all duration-200 text-[15px] max-w-[200px] font-bold text-[#5D387F] bg-[#E8DDF2] rounded-[8px]">
            Reset Chat
          </button>
        </div>
      </div>
    </div>
  );
}
ChatInput.propTypes = {
  setChats: PropTypes.func,
  startRecording: PropTypes.func,
  stopRecording: PropTypes.func,
  status: PropTypes.string,
  submitAudioHandler: PropTypes.func,
  clearMediaBlob: PropTypes.func,
  mediaBlob: PropTypes.object,
  counter: PropTypes.number,
};

export default ChatInput;
