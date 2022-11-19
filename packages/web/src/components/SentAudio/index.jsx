import SpeechIcon from '../../assets/speech_line.svg';
import { PropTypes } from 'prop-types';
import { useState, useEffect } from 'react';

let a;
const SentAudio = ({ audio }) => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
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

  const playAudioWithSpacebar = (e) => {
    if (e.keyCode === 32) {
      if (playing === false) {
        a.play();
        setPlaying(true);
      } else {
        a.pause();
      }
    }
  };

  return (
    <div
      onClick={playAudio}
      role="presentation"
      onKeyDown={playAudioWithSpacebar}
      className="flex justify-end cursor-pointer"
    >
      <div className=" w-9/12">
        <img src={SpeechIcon} alt="Uploaded Audio" />
        <p className="mt-1 text-xs text-right">{new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

SentAudio.propTypes = {
  audio: PropTypes.string,
};

export default SentAudio;
