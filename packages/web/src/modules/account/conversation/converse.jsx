/* eslint-disable no-undef */
import React, { useState, useRef, useEffect } from 'react';
import ChatContainer from './chat-container';
import SeletedLanguage from '../../../components/SelectedLanguage';
import RiveBot from '../../../components/RiveBot';
import micImg from '../../../assets/images/mic.svg';
import Loader from '../../../components/Loader';
import { useNavigate } from 'react-router-dom';
import useMediaRecorder from '@wmik/use-media-recorder';
import toast from 'react-hot-toast';
import useSendAudioFile from '../../../hooks/account/useSendAudio';
import Premium from '../../premium/popup/index';
import styles from './index.module.css';
import PropTypes from 'prop-types';
import chirpy from '../../../assets/chirpy.svg';
import { IconButton, Tooltip } from '@mui/material';
import { IoSendSharp, IoStopSharp } from 'react-icons/io5';
import { MdReplay } from 'react-icons/md';
import { convertSecToMin } from '../../../lib/utils';
import ChatInput from './chat-input';

function Converse({ noRive = false }) {
  let { status, mediaBlob, stopRecording, startRecording, clearMediaBlob } = useMediaRecorder({
    recordScreen: false,
    // blobOptions: { type: 'audio/*' },
    mediaStreamConstraints: { audio: true, video: false },
  });
  const userData = JSON.parse(localStorage.getItem('isUserDetails'));
  const [userSubscription, setUserSubscription] = React.useState('');
  const [counter, setCounter] = useState(0);
  const sendAudio = useSendAudioFile();
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = React.useState('English');
  const userId = localStorage.getItem('grittyuserid');
  const error = (message) => toast.error(message);

  const [chats, setChats] = React.useState([]);
  const navigate = useNavigate();

  const chatRef = useRef(null);
  const inputRef = useRef(null);

  const useFetch = (url, token) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const oBJ = JSON.parse(result);
        setUserSubscription(oBJ);
      })
      .then(() => {})
      .catch((error) => error(error));
  };

  React.useEffect(() => {
    useFetch('https://api.speakbetter.hng.tech/v1/subscription', localStorage.getItem('grittyusertoken'));
    // console.log(userSubscription.status);
  }, []);

  const handleScroll = () => {
    setTimeout(() => {
      chatRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  useEffect(() => {
    if (chats.length === 0) return;
    handleScroll();
    console.log(chats);
  }, [chats]);

  const handleClosePremium = () => {
    setOpen(false);
  };

  // URL.createObjectURL(mediaBlob)
  const checkForArray = (data) => (Array.isArray(data) ? data : [data]);

  const submitAudioHandler = () => {
    setCounter(0);
    const soln = new FormData();
    soln.append('file', mediaBlob);
    soln.append('language', language);
    if (userId) soln.append('userId', userId);
    sendAudio
      .mutateAsync(soln)
      .then((res) => {
        const { botReply, correctedText, createdAt, transcribedAudioText, updatedAt, language } =
          res.data.data.botResponse;
        setChats((prevState) => [
          ...prevState,
          {
            audio: res?.data?.data?.userResponse?.audioURL,
            botReply,
            correctedText,
            createdAt,
            language,
            transcribedAudioText,
            updatedAt,
          },
        ]);
      })
      .catch((err) => {
        error(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    let intervalId;
    if (status === 'idle') return;
    if (status === 'recording') {
      intervalId = setInterval(() => {
        setCounter((counter) => counter + 1);
      }, 1000);
    }
    if (status === 'stopped') {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [status]);

  useEffect(() => {
    if (counter > 1000000 && userSubscription?.data && userSubscription?.data?.length !== 0) {
      checkForArray(userSubscription?.data).map((item) => {
        if (item.status === 'successful') {
          return;
        }
      });
      return;
    }
    if (counter > 1000000) {
      setOpen(true);
      stopRecording();
      setCounter(0);
    }
  }, [counter]);

  const deleteRecording = () => {
    stopRecording();
    setCounter(0);
  };

  const onMicHandler = () => {
    if (status === 'idle' || status === 'stopped') {
      clearMediaBlob();
      startRecording();
    }
  };

  console.log(status);
  return (
    <>
      {/* <Premium open={open} handleClosePremium={handleClosePremium} /> */}
      <div className="flex-1  w-full h-full max-w-8xl mx-auto flex flex-col pt-3 lg:pt-0">
        <div className="text-center max-h-5/6 space-y-5 relative flex-1 flex flex-col justify-center  lg:space-y-8">
          {chats.length === 0 ? (
            <>
              {!noRive ? (
                <div className="mx-auto w-36 flex items-center justify-center">
                  <RiveBot size="large" />
                </div>
              ) : (
                <div className="flex justify-center items-center pb-6">
                  <img
                    src={chirpy}
                    alt="chirpy bob"
                    className=" sm:w-[200px] sm:h-[200px] w-[100px] h-[100px] flex justify-center items-center "
                  />
                </div>
              )}
              <div className="space-y-4">
                <h2 className={`text-lg text-[#262626]  leading-relaxed sm:text-3xl`}>
                  {userData?.firstName
                    ? `${userData?.firstName}, how are you today?`
                    : 'What would you like to say today?'}
                </h2>
                <p className={` text-slate-600 text-md sm:text-[17px]`}>
                  Each conversation brings you closer to fluency.
                </p>
                {/* <div>
                  <SeletedLanguage language={language} setLanguage={setLanguage} />
                </div> */}
              </div>
            </>
          ) : (
            <ChatContainer chats={chats} isLoading={sendAudio.isLoading} />
          )}
          <div>
            {/* <div className="mx-auto flex items-center justify-center" ref={chatRef}>
              <button
                onClick={onMicHandler}
                className={`rounded-full h-20 w-20 bg-[#5D387F] flex items-center justify-center focus:outline-none focus:ring focus:border-[#5D387F] transition ease-in-out ${
                  status === 'recording' ? styles._bot_mic : ''
                }`}
              >
                <img src={micImg} alt="" className="max-w-full" />
                <span style={{ '--i': 0 }}></span>
                <span style={{ '--i': 1 }}></span>
                <span style={{ '--i': 2 }}></span>
                <span style={{ '--i': 3 }}></span>
              </button>
            </div> */}
            {/* <div className="py-1 h-28">
              <div>
                {status === 'idle'  && !sendAudio.isLoading ? (
                  <>
                    {chats.length === 0 ? (
                      <p className="text-[#262626] text-sm pt-6">Tap the Microphone to begin and stop recording.</p>
                    ) : (
                      <button
                        className="px-7 rounded-xl py-2 border border-[#5D387F]"
                        onClick={() => navigate('/signin')}
                      >
                        Exit
                      </button>
                    )}
                  </>
                ) : (
                  <div className="mb-10">
                    <div className="flex justify-center items-center mt-10">{convertSecToMin(counter)}</div>
                    <div className="flex items-center justify-center space-x-3 py-6">
                      <Tooltip arrow title="Reset">
                        <IconButton color="error" aria-label="add an alarm" onClick={deleteRecording}>
                          <MdReplay size={20} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip arrow title="Stop">
                        <IconButton
                          onClick={stopRecording}
                          disabled={status === 'idle' || (status === 'stopped' && !mediaBlob)}
                          aria-label="add an alarm"
                        >
                          <IoStopSharp size={20} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip arrow title="send recording">
                        <IconButton
                          onClick={submitAudioHandler}
                          color="success"
                          aria-label="add an alarm"
                          disabled={status === 'recording' || status === 'idle' || status === 'paused'}
                        >
                          <IoSendSharp size={20} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                )}
              </div>
            </div> */}
          </div>
        </div>
        <div className="sticky bottom-0 left-0" ref={inputRef}>
          <ChatInput
            setChats={setChats}
            status={status}
            stopRecording={stopRecording}
            startRecording={startRecording}
            submitAudioHandler={submitAudioHandler}
            clearMediaBlob={clearMediaBlob}
            mediaBlob={mediaBlob}
            counter={counter}
          />
        </div>
        <div ref={inputRef}></div>
      </div>
    </>
  );
}

Converse.propTypes = {
  noRive: PropTypes.bool,
};
export default Converse;
