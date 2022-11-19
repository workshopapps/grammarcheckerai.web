/* eslint-disable jsx-a11y/click-events-have-key-events */
import ErrorIcon from '../../assets/error.svg';
import ImportIcon from '../../assets/import.svg';
import { PropTypes } from 'prop-types';
import SentAudio from '../../components/SentAudio/index';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';

const dummyBotMessages = [
  {
    id: 1,
    botMsg: 'Hello there, click the icon on the top right to get a quick transcription',
    userAudio: null,
  },
];

const Transcribe = () => {
  const [messages, setMessages] = useState(dummyBotMessages);

  const [isError, setIsError] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);
  const [audio, setAudio] = useState();

  const hiddenFileInput = useRef(null);

  const handleUploadClick = () => {
    hiddenFileInput.current.click();
  };

  const fakeWaiting = (time) => {
    return new Promise((resolve) => {
      return setTimeout(() => {
        resolve();
      }, time);
    });
  };

  const handleFileClick = async (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      setUploadingAudio(true);

      if (file.type !== 'audio/mpeg') {
        toast.error(`Please upload an audio file instead of a ${file.type} file`);
        return;
      }

      await fakeWaiting(3000);
      setTimeout(() => setUploadingAudio(false), 1000);

      setIsAudio(true);
      setAudio(URL.createObjectURL(event.target.files[0]));
      setMessages([
        ...messages,
        {
          id: Math.random(),
          botMsg: null,
          userAudio: URL.createObjectURL(event.target.files[0]),
        },
      ]);

      console.log('audio', URL.createObjectURL(event.target.files[0]));
      console.log('messgaes', messages);
    }
  };

  return (
    <div>
      {/* <button
        onClick={() => {
          setIsError(!isError);
        }}
      >
        Toggle Error Overlay
      </button> */}

      <div className="px-3 md:px-10 relative">
        <div role="presentation" onClick={handleUploadClick} className="py-3 flex justify-end cursor-pointer">
          <img src={ImportIcon} alt="import audio" />
          <input
            ref={hiddenFileInput}
            onChange={handleFileClick}
            className="hidden"
            type="file"
            name="audio_file"
            id="audio_file"
          />
        </div>

        <div className="grid place-items-center md:hidden">
          <h1>Quick Transcribe</h1>
        </div>

        <div className={`${isError ? 'fixed bg-white brightness-50 w-full' : ''}`}>
          {messages.map((data, index) => (
            <React.Fragment key={index}>
              <div className="pb-20 md:pb-16 px-2 mt-5 relative">
                {data.botMsg !== null ? (
                  <div className="ai__msg w-52">
                    <h1 className="text-base font-medium ">Gritty Grammar</h1>
                    <p className="bg-gray-100 font-normal leading-5 p-2 rounded">{data.botMsg}</p>
                    <p className="mt-1 text-xs text-left">{new Date().toLocaleTimeString()}</p>
                  </div>
                ) : null}

                {data.userAudio !== null ? (
                  <div className="user__msg p-0 absolute mt-0 right-0 bottom-0">
                    {uploadingAudio && (
                      <div className="border-2 border-dashed border-green-300 bg-green-100 px-5 py-1 text-sm">
                        <p>Audio file getting imported</p>
                      </div>
                    )}

                    {isAudio && !uploadingAudio ? <SentAudio audio={audio} /> : null}
                  </div>
                ) : null}
              </div>
            </React.Fragment>
          ))}
        </div>

        {isError ? <ErrorOverlay setIsError={setIsError} /> : null}
      </div>
    </div>
  );
};

const ErrorOverlay = ({ setIsError }) => {
  return (
    <div className=" fixed h-screen grid place-items-center top-0 w-screen">
      <div className="grid place-items-center">
        <img src={ErrorIcon} alt="error_icon" />

        <div className="grid place-items-center mt-5">
          <h1>Error!!!</h1>
          <p className=" w-9/12 text-center leading-4">Ensure you have a stable internet connection.</p>

          <button onClick={() => setIsError(false)} className="mt-5 bg-blue-800 text-white py-1 px-3 rounded">
            Okay,got it
          </button>
        </div>
      </div>
    </div>
  );
};

ErrorOverlay.propTypes = {
  setIsError: PropTypes.func.isRequired,
};
export default Transcribe;
