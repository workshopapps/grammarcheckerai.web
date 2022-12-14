import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import { MdOutlinePause } from 'react-icons/md';
import { IoPlayOutline } from 'react-icons/io5';
import { convertSecToMin } from '../../lib/utils';
import audioImg from '../../assets/audio.svg';
import React from 'react';
import { BeatLoader } from 'react-spinners';

const Audio = ({ audio, variant, counter, isLoading }) => {
  const audioRef = React.useRef();
  const [playing, setPlaying] = useState(false);

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
    <>
      <div className="flex w-full px-3 max-w-[300px] bg-white ml-auto py-2 shadow-sm  rounded-md border items-center relative space-x-2">
        <IconButton
          sx={{
            mx: 1,
            color: variant ? '#fff' : '#393939',
            bgcolor: variant ? '#5D387F' : '#fff',
            '&:hover': {
              bgcolor: variant ? '#5D387F' : '',
              color: variant ? '#fff' : '#393939',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          onClick={playAudio}
        >
          {playing ? <MdOutlinePause size={16} /> : <IoPlayOutline size={16} />}
        </IconButton>
        <div>
          <img src={audioImg} alt="" />
        </div>
        <div>
          {!variant && (
            <p className="text-xs text-black z-20">
              {!isNaN(audioRef.current?.duration) ||
                (audioRef.current?.duration === Infinity && convertSecToMin(Math.floor(audioRef.current?.duration)))}
            </p>
          )}
          {counter && <p className="text-xs text-black z-20">{convertSecToMin(counter)}</p>}
        </div>
        <div>
          <audio src={audio} ref={audioRef} onLoadedMetadata={onLoadedMetadata} onEnded={onEnded} />
        </div>
        {isLoading && (
          <div className="absolute -bottom-6 left-0">
            <BeatLoader size={10} color="#8C54BF" />
          </div>
        )}
      </div>
    </>
  );
};

Audio.propTypes = {
  audio: PropTypes.string,
  variant: PropTypes.bool,
  counter: PropTypes.number,
  isLoading: PropTypes.bool,
};

export default Audio;
