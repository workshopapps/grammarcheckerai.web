import { PropTypes } from 'prop-types';
import { useState, useEffect } from 'react';
import { Stack, IconButton, Slider } from '@mui/material';
import { MdOutlinePause } from 'react-icons/md';
import { IoPlayOutline } from 'react-icons/io5';
import { convertSecToMin } from '../../lib/utils';
import audioImg from '../../assets/audio.svg';
import React from 'react';

const SentAudio = ({ audio }) => {
  const audioRef = React.useRef(new Audio(audio));

  const [playing, setPlaying] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter(
        audioRef.current?.duration && audioRef.current?.currentTime
          ? (audioRef.current?.currentTime / audioRef.current?.duration) * 100
          : 0,
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log(audio, 'audio');
    if (audio) {
      audioRef.current?.pause();
      setPlaying(false);
    }

    if (audio) {
      audioRef.current.onended = () => {
        setPlaying(false);
      };
    }
  }, [audio]);

  const playAudio = () => {
    if (playing === false) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="flex w-full px-3 max-w-[300px] text-white ml-auto py-2 shadow-sm  rounded-md border z-10 items-center relative space-x-2">
      <IconButton sx={{ mx: 1 }} onClick={playAudio}>
        {playing ? <MdOutlinePause size={16} color="#393939" /> : <IoPlayOutline size={16} color="#393939" />}
      </IconButton>
      <div>
        <img src={audioImg} alt="" />
      </div>
      <div>
        <p className="text-xs text-black z-20">{convertSecToMin(audioRef.current?.duration)}</p>
      </div>
    </div>
  );
};

SentAudio.propTypes = {
  audio: PropTypes.string,
};

export default SentAudio;
