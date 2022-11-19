import FileUploadButton from '../../components/Button/FileUploadButton';
import LoadingDots from '../../components/Loaders/LoadingDots';
import './transcribe.module.css';
import ErrorIcon from '../../assets/error.svg';
import { PropTypes } from 'prop-types';
import SentAudio from '../../components/Audio/SentAudio';
import React, { useState } from 'react';

const Transcribe = () => {
  const dummnyData = [
    {
      id: 1,
      botMsg: 'Hello there, click the icon on the top right to get a quick transcription',
    },
  ];
  const [isError, setIsError] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const [audio, setAudio] = useState();

  return (
    <div>
      {/* <button
        onClick={() => {
          setIsError(!isError);
        }}
      >
        Toggle Error Overlay
      </button> */}

      <div className="p-8 relative  ">
        <div className={`${isError ? 'fixed bg-white brightness-50 w-full' : ''}`}>
          {dummnyData.map((data, index) => (
            <React.Fragment key={index}>
              <div className="b pb-10 px-2 mt-5 relative">
                <div className="ai__msg w-52">
                  <h1 className="text-base font-medium ">Gritty Grammar</h1>
                  <p className="bg-gray-100 font-normal leading-5 p-2">{data.botMsg}</p>
                  <p className="mt-1 text-xs">{new Date().toUTCString()}</p>
                </div>

                <div className="user__msg p-0 absolute mt-10 right-0 bottom-0">
                  {/* <LoadingDots /> */}
                  {isAudio ? (
                    <SentAudio audio={audio} />
                  ) : (
                    <FileUploadButton setIsAudio={setIsAudio} setAudio={setAudio} audio={audio} />
                  )}
                </div>
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
