import React from 'react';
import logoImg from '../../../assets/images/logo.svg';
import botImg from '../../../assets/images/bot.svg';
import micImg from '../../../assets/images/mic.svg';
import styles from './index.module.css';

function Conversation() {
  return (
    <div className={`min-h-screen  flex flex-col ${styles._convo}`}>
      <div className="flex flex-row content-between py-6 w-full max-w-7xl mx-auto">
        <div className="w-36">
          <img src={logoImg} alt="" className="max-w-full" />
        </div>
      </div>
      <div className="flex-1 w-full max-w-7xl mx-auto items-center flex flex-col justify-center">
        <div className="text-center space-y-14">
          <div className="mx-auto flex items-center justify-center">
            <img src={botImg} alt="" className="max-w-full" />
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl text-[#262626]">What would you like to say today?</h2>
            <p className="text-[#262626] text-[19px] opacity-80">Each conversation bring you closer to fluency.</p>
          </div>
          <div>
            <div className="mx-auto flex items-center justify-center">
              <button className="rounded-full h-20 w-20 bg-[#5D387F] flex items-center justify-center focus:outline-none focus:ring focus:border-[#5D387F] transition ease-in-out">
                <img src={micImg} alt="" className="max-w-full" />
              </button>
            </div>
            <div className={styles._pulse}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <section></section>
            <div className="pt-4">
              <p>Tap the Microphone to begin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
