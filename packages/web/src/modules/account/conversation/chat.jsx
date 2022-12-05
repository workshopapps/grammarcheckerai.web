import React, { useState, useEffect } from 'react';
import { Recorder } from 'react-voice-recorder';
import useSendAudioFile from '../../../hooks/account/useSendAudio';
import styles from './index.module.css';
import micImg from '../../../assets/images/mic.svg';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../../components/Loader';
import PropTypes from 'prop-types';

export default function CustomRecorder({ setChats }) {
  const sendAudio = useSendAudioFile();
  const [isRecording, setRecording] = React.useState(false);
  const [state, setState] = React.useState({
    audioURL: null,
    audioDetails: {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    },
  });

  const error = (message) => toast.error(message);

  const handleAudioStop = (data) => {
    setState((prevState) => ({ ...prevState, audioDetails: data }));
    console.log(data, 'data');
    const soln = new FormData();
    soln.append('file', data.blob);
    sendAudio
      .mutateAsync(soln)
      .then((res) => {
        const { botReply, correctedText, createdAt, transcribedAudioText, updatedAt, language } =
          res.data.data.botResponse;
        setChats((prevState) => [
          ...prevState,
          {
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
        error(err?.response?.data?.message ?? 'Error');
        console.log(err);
      });
  };

  const handleAudioUpload = () => {
    console.log('file', 'file');
  };

  const handleReset = () => {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    };
    setState((prevState) => ({ ...prevState, audioDetails: reset }));
  };

  const recorderHandler = () => setRecording((prev) => !prev);

  return (
    <>
      {sendAudio.isLoading && <Loader />}
      <button
        className={`rounded-full  relative h-20 w-20 bg-[#5D387F] flex items-center justify-center focus:outline-none focus:ring focus:border-[#5D387F] transition ease-in-out ${
          isRecording ? styles._bot_mic : ''
        } `}
      >
        <button className={`inset-0 items-center justify-center ${styles.mic}`} onClick={() => recorderHandler()}>
          {<img className="" src={micImg} alt="" style={{ opacity: 1 }} />}
            <Recorder
              record={false}
              title={'New recording'}
              audioURL={state.audioDetails.url}
              handleAudioStop={(data) => handleAudioStop(data)}
              handleAudioUpload={(data) => handleAudioUpload(data)}
              handleReset={() => handleReset()}
            />
          
        </button>

        <span style={{ '--i': 0 }}></span>
        <span style={{ '--i': 1 }}></span>
        <span style={{ '--i': 2 }}></span>
        <span style={{ '--i': 3 }}></span>
      </button>
      <Toaster />
    </>
  );
}

CustomRecorder.propTypes = {
  setChats: PropTypes.func,
};
