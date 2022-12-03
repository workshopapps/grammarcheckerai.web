import React, { useState, useEffect } from 'react';
import { Recorder } from 'react-voice-recorder';
import useSendAudioFile from '../../../hooks/account/useSendAudio';
import styles from './index.module.css';
import micImg from '../../../assets/images/mic.svg';
import trashImg from '../../../assets/images/trash.svg';
import sendImg from '../../../assets/images/send.svg';
import pauseImg from '../../../assets/images/pause.svg';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../../components/Loader';
import PropTypes from 'prop-types';
import useMediaRecorder from '@wmik/use-media-recorder';

export default function CustomRecorder() {
  let { error, status, mediaBlob, stopRecording, getMediaStream, startRecording } = useMediaRecorder({
    recordScreen: false,
    blobOptions: { type: 'audio/wav' },
    mediaStreamConstraints: { audio: true, video: false },
  });
  const sendAudio = useSendAudioFile();

  function sendRecording() {
    stopRecording();
    // if (mediaBlob && mediaBlob !== '') {
    console.log('blob', mediaBlob);
    const soln = new FormData();
    soln.append('file', mediaBlob);
    soln.append('language', 'english');
    console.log('-------------', soln.get('file'));
    sendAudio
      .mutateAsync(soln)
      .then((res) => {
        console.log(res);
      })
      .catch(console.log);
  }
  return (
    <article className="min-h-screen h-50 w-full">
      <h1>Screen recorder</h1>
      {error ? `${status} ${error.message}` : status}
      <section>
        <button type="button" onClick={startRecording} disabled={status === 'recording'}>
          Start recording
        </button>
        <button type="button" onClick={sendRecording} disabled={status !== 'recording'}>
          Stop recording
        </button>
      </section>
    </article>
  );
}
