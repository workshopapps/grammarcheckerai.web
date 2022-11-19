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
import { Configuration, OpenAIApi } from 'openai';
import ChatContainer from './chat-container';

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

function Conversation() {
  const {
    // audioResult,
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
    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      temperature: 0,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      prompt: 'Correct this to standard English:\n\nShe no went to the market.',
    });

    console.log(response);
  };

  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      layout
      className={`min-h-screen space-y-6 flex pb-10 flex-col ${styles._convo}`}
    >
      <div className="flex flex-row content-between py-6 px-4 w-full max-w-7xl mx-auto">
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
                <h2 className="text-xl text-[#262626] leading-relaxed sm:text-5xl">
                  What would you like to say today?
                </h2>
                <p className="text-slate-600 text-md sm:text-[19px]">Each conversation bring you closer to fluency.</p>
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
                    <p className="text-[#262626]">Tap the Microphone to begin</p>
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
