import { PropTypes } from 'prop-types';
import { useState, useEffect } from 'react';
import { Stack, IconButton, Slider } from '@mui/material';
import { MdOutlinePause } from 'react-icons/md';
import { IoMdPlay } from 'react-icons/io';
import { convertSecToMin } from '../../lib/utils';
let a;

const SentAudio = ({ audio }) => {
  const [playing, setPlaying] = useState(false);
  const [counter, setCounter] = useState(0);
  console.log(audio, 'audion');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter(a?.duration && a?.currentTime ? (a?.currentTime / a?.duration) * 100 : 0);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log(audio, 'audio');
    console.log(a, 'a');
    if (a) {
      a.pause();
      a = null;
      setPlaying(false);
    }

    if (audio) {
      a = new Audio(audio);
      a.onended = () => {
        setPlaying(false);
      };
    }
  }, [audio]);

  const playAudio = () => {
    if (playing === false) {
      a.play();
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="flex w-full px-3 py-3 shadow-sm  rounded-md border z-10 items-center relative space-x-2">
      <IconButton sx={{ mx: 1 }} color="primary" onClick={playAudio}>
        {playing ? <MdOutlinePause className="text-[#8C54BF]" /> : <IoMdPlay className="text-[#8C54BF]" />}
      </IconButton>
      <div className="absolute right-1 bottom-1 z-20">
        <p className="text-xs text-slate-600 z-20">{convertSecToMin(a?.duration)}</p>
      </div>
      <Slider
        size="small"
        defaultValue={0}
        value={counter}
        aria-label="Small"
        valueLabelDisplay="auto"
        className="text-[#8C54BF]"
      />
    </div>
  );
};

SentAudio.propTypes = {
  audio: PropTypes.string,
};

export default SentAudio;
