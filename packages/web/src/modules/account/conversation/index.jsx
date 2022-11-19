import React, { useState } from 'react';
import logoImg from '../../../assets/images/logo.svg';
import botImg from '../../../assets/images/bot.svg';
import micImg from '../../../assets/images/mic.svg';
import styles from './index.module.css';
import { motion } from 'framer-motion';

function Conversation() {
  const [record, setRecord] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className={`min-h-screen SPACE-Y-6 flex flex-col ${styles._convo}`}
    >
      <div className="flex flex-row content-between py-6 w-full max-w-7xl mx-auto">
        <div className="w-36">
          <img src={logoImg} alt="" className="max-w-full" />
        </div>
      </div>
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col justify-center">
        <div className="text-center space-y-14">
          <div className="mx-auto flex items-center justify-center min-w-fit">
            <img src={botImg} alt="" className="max-w-full" />
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl text-[#262626]">What would you like to say today?</h2>
            <p className="text-[#262626] text-[19px] opacity-80">Each conversation bring you closer to fluency.</p>
          </div>
          <div>
            <div className="mx-auto flex items-center justify-center">
              <button
                onClick={() => setRecord(!record)}
                className={`rounded-full h-20 w-20 bg-[#5D387F] flex items-center justify-center focus:outline-none focus:ring focus:border-[#5D387F] transition ease-in-out ${
                  record ? styles._bot_mic : ''
                }`}
              >
                <img src={micImg} alt="" className="max-w-full" />
                <span style={{ '--i': 0 }}></span>
                <span style={{ '--i': 1 }}></span>
                <span style={{ '--i': 2 }}></span>
                <span style={{ '--i': 3 }}></span>
              </button>
            </div>
            <div className="pt-8">
              <p className="text-[#262626]">Tap the Microphone to begin</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Conversation;
