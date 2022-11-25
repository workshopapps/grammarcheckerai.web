import React from 'react';
import useTheme from '../../../hooks/useTheme';
import logoImg from '../../../assets/images/logo.webp';
import botImg from '../../../assets/images/bot.webp';
import styles from './index.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import ChatContainer from './chat-container';
import useSendAudioFile from '../../../hooks/account/useSendAudio';
import SeletedLanguage from '../../../components/SelectedLanguage';
import CustomRecorder from './chat';

// import lamejs from 'lamejs';

function Conversation() {
  const context = useTheme();
  const navigate = useNavigate();
  const sendAudio = useSendAudioFile();
  const [chats, setChats] = React.useState([]);

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
              <CustomRecorder />
            </div>
            <div className="pt-14 h-28">
              <AnimatePresence mode="wait">
                <motion.div key={status} e initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {
                    status === 'idle' ? (
                      <>
                        {chats.length === 0 ? (
                          <p className="text-[#262626]"></p>
                        ) : (
                          <button
                            className="px-7 rounded-xl py-2 border border-[#5D387F]"
                            onClick={() => navigate('/signin')}
                          >
                            Exit
                          </button>
                        )}
                      </>
                    ) : null
                    // <div>
                    //   <div className="flex items-center justify-center space-x-6 pt-5">
                    //     <button
                    //       className="h-6 w-6 rounded-full flex justify-center items-center"
                    //       onClick={() => stopRecording()}
                    //     >
                    //       <img src={trashImg} alt="" className="w-full" />
                    //     </button>
                    //     <button
                    //       className="h-6 w-6 rounded-full flex justify-center items-center"
                    //       onClick={() => (status === 'paused' ? resumeRecording() : pauseRecording())}
                    //     >
                    //       <img src={pauseImg} alt="" className="w-full" />
                    //     </button>
                    //     <button
                    //       className="h-6 w-6 rounded-full flex justify-center items-center"
                    //       onClick={submitAudioHandler}
                    //     >
                    //       <img src={sendImg} alt="" className="w-full" />
                    //     </button>
                    //   </div>
                    // </div>
                  }
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
