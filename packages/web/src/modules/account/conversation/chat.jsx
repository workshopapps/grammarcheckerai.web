import React, { useState, useEffect } from 'react';
import { Recorder } from 'react-voice-recorder';
import useSendAudioFile from '../../../hooks/account/useSendAudio';
import styles from './index.module.css';
import micImg from '../../../assets/images/mic1.svg';
import trashImg from '../../../assets/images/trash.svg';
import sendImg from '../../../assets/images/send.svg';
import pauseImg from '../../../assets/images/pause.svg';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../../components/Loader';
import PropTypes from 'prop-types';

export default function CustomRecorder({ setChats }) {
  const sendAudio = useSendAudioFile();
  const [isRecording, setRecording] = React.useState(false);
  const [second, setSecond] = useState("00")
  const [minute, setMinute] = useState("00")
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    let intervalId;

    if (isRecording){
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        let computedSecond = 
        String(secondCounter).length === 1 ?
        `0${secondCounter}` :
        secondCounter;

        let computedMinute =
        String(minuteCounter).length === 1 ?
        `0${minuteCounter}`:
        minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
}, [isRecording, counter])

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
    // console.log(data, 'data');
    // console.log(
    //   new Blob([data.url], {
    //     type: 'audio/mp3',
    //   }),
    //   'blob from data.url',
    // );
    // console.log(
    //   new Blob([data.blob], {
    //     type: 'audio/mp3',
    //   }),
    //   'blob fron data.blob',
    // );
    setState((prevState) => ({ ...prevState, audioDetails: data }));

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
    // console.log(file, 'file');
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
        <button
          className={` items-center justify-center ${styles.mic}`}
          onClick={() => recorderHandler()}
        >
          {<img src={micImg} alt="" style={{ opacity: 1 }} />}
          {/* <Recorder
            record={false}
            title={'New recording'}
            audioURL={state.audioDetails.url}
            showUIAudio={isRecording}
            handleAudioStop={(data) => handleAudioStop(data)}
            handleAudioUpload={(data) => handleAudioUpload(data)}
            handleReset={() => handleReset()}
          /> */}
        </button>

        <span style={{ '--i': 0 }}></span>
        <span style={{ '--i': 1 }}></span>
        <span style={{ '--i': 2 }}></span>
        <span style={{ '--i': 3 }}></span>
      </button>
      <Toaster />

      <div>
        <div className="flex justify-center items-center mt-8">
          <span>{minute}</span>
          <span>:</span>
          <span>{second}</span>
        </div>

        <button className="flex justify-between items-center w-48 mt-8" onClick={recorderHandler}>
              <button onClick={() => handleReset()}><img src={trashImg} alt="" /></button>
              <button onClick={(data) => handleAudioStop(data)}><img src={pauseImg} alt="" /></button>
              <button onClick={(data) => handleAudioUpload(data)}><img src={sendImg} alt="" /></button>
        </button>
      </div>
      
      {/* <p>{`${recorderHandler ? "" : "Tap the Microphone to begin"}`}</p> */}
      {/* ? "" : <p className="mt-6">Tap the Microphone to begin</p> */}
    </>
  );
}

CustomRecorder.propTypes = {
  setChats: PropTypes.func,
};