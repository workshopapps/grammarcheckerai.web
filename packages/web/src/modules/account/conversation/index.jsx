import React from 'react';
import logoImg from '../../../assets/images/logo.svg';
import botImg from '../../../assets/images/bot.svg';
import micImg from '../../../assets/images/mic.svg';
import trashImg from '../../../assets/images/trash.svg';
import sendImg from '../../../assets/images/send.svg';
import pauseImg from '../../../assets/images/pause.svg';
import styles from './index.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioRecorder } from '@sarafhbk/react-audio-recorder';
import { convertSecToMin } from '../../../lib/utils';
import { useNavigate } from 'react-router-dom';
// import { Configuration, OpenAIApi } from 'openai';
import ChatContainer from './chat-container';
import useSendAudioFile from '../../../hooks/account/useSendAudio';

function Conversation() {
  const navigate = useNavigate();
  const sendAudio = useSendAudioFile();
  const {
    audioResult,
    timer,
    startRecording,
    stopRecording,
    pauseRecording,
    status,
    resumeRecording,
    // errorMessage,
  } = useAudioRecorder();
  const [chats, setChats] = React.useState([]);

  const submitAudioHandler = async () => {
    sendAudio.mutateAsync({
      file: audioResult,
    });
    setChats((prev) => [
      ...prev,
      {
        type: 'audio',
        file: audioResult,
      },
    ]);
    stopRecording();
  };

  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`min-h-screen space-y-6 flex pb-10 flex-col ${styles._convo}`}
    >
      <div className="flex flex-row content-between py-6 px-4 w-full max-w-7xl mx-auto">
        {/*  eslint-disable-next-line jsx-a11y/media-has-caption */}
        {/* <audio controls src={audioResult} /> */}
        <div className="w-36">
          <img src={logoImg} alt="" className="max-w-full" />
        </div>
      </div>
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col justify-center px-4">
        <div className="text-center space-y-14">
          {chats.length === 0 ? (
            <>
              <div className="mx-auto flex items-center justify-center min-w-fit">
                <img src={botImg} alt="" className="max-w-full" />
              </div>
              <div className="space-y-4">
                <h2 className="sm:text-xl text-[#262626] leading-relaxed text-5xl">
                  What would you like to say today?
                </h2>
                <p className="text-slate-600 sm:text-md text-[19px]">Each conversation bring you closer to fluency.</p>
              </div>
            </>
          ) : (
            <ChatContainer />
          )}
          <div>
            <div className="mx-auto flex items-center justify-center">
              <button
                onClick={() => {
                  status === 'idle' ? startRecording() : status === 'paused' ? resumeRecording() : pauseRecording();
                }}
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
            </div>
            <div className="pt-14 h-28">
              <AnimatePresence mode="wait">
                <motion.div key={status} e initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {status === 'idle' ? (
                    <>
                      {chats.length === 0 ? (
                        <p className="text-[#262626]">Tap the Microphone to begin</p>
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
                    <div>
                      <p>{convertSecToMin(timer)}</p>
                      <div className="flex items-center justify-center space-x-6 pt-5">
                        <button
                          className="h-6 w-6 rounded-full flex justify-center items-center"
                          onClick={() => stopRecording()}
                        >
                          <img src={trashImg} alt="" className="w-full" />
                        </button>
                        <button
                          className="h-6 w-6 rounded-full flex justify-center items-center"
                          onClick={() => (status === 'paused' ? resumeRecording() : pauseRecording())}
                        >
                          <img src={pauseImg} alt="" className="w-full" />
                        </button>
                        <button
                          className="h-6 w-6 rounded-full flex justify-center items-center"
                          onClick={submitAudioHandler}
                        >
                          <img src={sendImg} alt="" className="w-full" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Conversation;
