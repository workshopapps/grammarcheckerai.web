import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import { MdOutlinePause } from 'react-icons/md';
import { IoPlayOutline } from 'react-icons/io5';
import { convertSecToMin } from '../../lib/utils';
import audioImg from '../../assets/audio.svg';
import React from 'react';

const SentAudio = ({ audio }) => {
  const audioRef = React.useRef();

  const [playing, setPlaying] = useState(false);
  const [counter, setCounter] = useState(0);

  const playAudio = () => {
    if (playing === false) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  const onLoadedMetadata = (anything) => {
    // setAudioDuration(Math.round(audioElem.current?.duration));
    console.log(Math.round(audioRef.current?.duration));
  };

  const onEnded = () => setPlaying(false);

  return (
    <div className="flex w-full px-3 max-w-[300px] text-white ml-auto py-2 shadow-sm  rounded-md border items-center relative space-x-2">
      <IconButton sx={{ mx: 1 }} onClick={playAudio}>
        {playing ? <MdOutlinePause size={16} color="#393939" /> : <IoPlayOutline size={16} color="#393939" />}
      </IconButton>
      <div>
        <img src={audioImg} alt="" />
      </div>
      <div>
        <p className="text-xs text-black z-20">
          {/* {console.log(audioRef.current?.duration)} */}
          {!isNaN(audioRef.current?.duration) ||
            (audioRef.current?.duration === Infinity && convertSecToMin(Math.floor(audioRef.current?.duration)))}
        </p>
      </div>
      <div>
        <audio
          src={audio}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={onEnded}
          // onTimeUpdate={onTimeUpdate}
          // onPause={onPause}
        />
      </div>
    </div>
  );
};

SentAudio.propTypes = {
  audio: PropTypes.string,
};

export default SentAudio;
