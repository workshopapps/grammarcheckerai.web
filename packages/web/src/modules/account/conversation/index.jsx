import React, { useEffect, useRef } from 'react';
import useTheme from '../../../hooks/useTheme';
import logoImg from '../../../assets/images/logo.webp';
import styles from './index.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import ChatContainer from './chat-container';
import SeletedLanguage from '../../../components/SelectedLanguage';
import CustomRecorder from './chat';
import RiveBot from '../../../components/RiveBot';

function Conversation() {
  const context = useTheme();
  const navigate = useNavigate();
  const [chats, setChats] = React.useState([]);
  const chatRef = useRef(null);

  useEffect(() => {
    handleScroll();
  }, [chats]);

  const handleScroll = () => {
    setTimeout(() => {
      chatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen space-y-4 flex flex-col ${styles._convo} ${
        context.theme === 'dark' ? styles.convo_theme : null
      } `}
    >
      <div className="flex flex-row content-between py-4 px-4 w-full max-w-7xl mx-auto items-center justify-between">
        {/*  eslint-disable-next-line jsx-a11y/media-has-caption */}
        {/* <audio controls src={audioResult} /> */}
        <div className="w-36">
          <Link to="/home">
            <img src={logoImg} alt="" className="max-w-full" />
          </Link>
        </div>
        <SeletedLanguage />
      </div>
      <div className="lg:flex-1 w-full max-w-7xl mx-auto flex flex-col my-0 justify-center px-4 scroll-smooth">
        <div className="max-h-5/6 text-center">
          {chats.length === 0 ? (
            <>
              <div className="mx-auto w-36 h-28 flex items-center justify-center">
                {/* <img src={botImg} alt="" className="max-w-full" /> */}
                <RiveBot size="large" />
              </div>
              <div className="mt-2">
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
                  } text-md sm:text-[19px] mt-2`}
                >
                  Each conversation bring you closer to fluency.
                </p>
              </div>
            </>
          ) : (
            <ChatContainer chats={chats} />
          )}
          <div>
            <div className="mx-auto flex items-center flex-col justify-center mt-12 xl:mt-8" ref={chatRef}>
              <CustomRecorder setChats={setChats} />
            </div>
            <div className="pt-4">
              <AnimatePresence mode="wait">
                <motion.div key={status} e initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {status === 'idle' ? (
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
                  ) : null}
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
