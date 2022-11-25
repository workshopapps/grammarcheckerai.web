import React from 'react';
import useTheme from '../../../hooks/useTheme';
import logoImg from '../../../assets/images/logo.webp';
import botImg from '../../../assets/images/bot.webp';
import micImg from '../../../assets/images/mic.svg';
import trashImg from '../../../assets/images/trash.svg';
import sendImg from '../../../assets/images/send.svg';
import pauseImg from '../../../assets/images/pause.svg';
import styles from './index.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioRecorder } from '@sarafhbk/react-audio-recorder';
import { convertSecToMin } from '../../../lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import ChatContainer from './chat-container';
import useSendAudioFile from '../../../hooks/account/useSendAudio';
import SeletedLanguage from '../../../components/SelectedLanguage';

function Conversation() {
  const context = useTheme();
  const navigate = useNavigate();
  const sendAudio = useSendAudioFile();
  const { audioResult, timer, startRecording, stopRecording, pauseRecording, status, resumeRecording } =
    useAudioRecorder();
  const [chats, setChats] = React.useState([]);

  const submitAudioHandler = async () => {
    let f = new File([audioResult], 'test.wav', { lastModified: new Date().getTime(), type: 'audio/wav' });
    console.log(audioResult.type);

    // const reader = new window.FileReader();
    // reader.readAsDataURL(audioBlob);
    // reader.onloadend = () => {
    //   let base64 = reader.result + '';
    //   base64 = base64.split(',')[1];
    //   const ab = new ArrayBuffer(base64.length);
    //   const buff = new Buffer.from(base64, 'base64');
    //   const view = new Uint8Array(ab);
    //   for (let i = 0; i < buff.length; ++i) {
    //     view[i] = buff[i];
    //   }
    //   const context = new AudioContext();
    //   context.decodeAudioData(ab, (buffer) => {
    //   const wavFile = toWav(buffer);
    //   const blob = new window.Blob([ new DataView(wavFile) ], {
    //     type: 'audio/wav'
    //   });
    //   const anchor = document.createElement('a');
    //   document.body.appendChild(anchor);
    //   anchor.style = 'display: none';
    //   const url = window.URL.createObjectURL(blob);
    //   anchor.href = url;
    //   anchor.download = 'audio.wav';
    //   anchor.click();
    //   window.URL.revokeObjectURL(url);
    // }
    sendAudio.mutateAsync({
      file: f,
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
      transition={{ duration: 0.3 }}
      className={`min-h-screen space-y-6 flex pb-10 flex-col ${styles._convo} ${
        context.theme === 'dark' ? styles.convo_theme : null
      } `}
    >
      <div className="flex flex-row content-between py-6 px-4 w-full max-w-7xl mx-auto items-center justify-between">
        {/*  eslint-disable-next-line jsx-a11y/media-has-caption */}
        {/* <audio controls src={audioResult} /> */}
        <div className="w-36">
          <Link to="/home">
            <img src={logoImg} alt="" className="max-w-full" />
          </Link>
        </div>
        <SeletedLanguage />
      </div>
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col justify-center px-4">
        <div className="text-center space-y-14">
          {chats.length === 0 ? (
            <>
              <div className="mx-auto w-36 flex items-center justify-center">
                <img src={botImg} alt="" className="max-w-full" />
              </div>
              <div className="space-y-4">
                <h2
                  className={`text-xl ${
                    context.theme === 'dark' ? 'text-[#ffffff]' : 'text-[#262626]'
                  }  leading-relaxed sm:text-5xl`}
                >
                  What would you like to say today?
                </h2>
                <p
                  className={` ${
                    context.theme === 'dark' ? 'text-[#ffffff]' : 'text-slate-600'
                  } text-md sm:text-[19px]`}
                >
                  Each conversation bring you closer to fluency.
                </p>
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
