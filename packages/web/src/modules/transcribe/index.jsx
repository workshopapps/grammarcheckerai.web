import React, { useRef, useState } from 'react';
import ErrorIcon from '../../assets/error.svg';
import { PropTypes } from 'prop-types';
import SentAudio from '../../components/SentAudio/index';
import ChatContainer from '../account/conversation/chat-container';
import toast, { Toaster } from 'react-hot-toast';
import useSendAudio from '../../hooks/account/useSendAudio';
import dayjs from 'dayjs';
import { IconButton, Tooltip } from '@mui/material';
import { MdSend } from 'react-icons/md';
import { BeatLoader } from 'react-spinners';

const dummyBotMessages = [
  {
    id: 1,
    botMsg: 'Hello there, click the icon on the top right to get a quick transcription',
    userAudio: null,
  },
];

const Transcribe = () => {
  const [messages, setMessages] = useState(dummyBotMessages);
  const error = (message) => toast.error(message);
  const success = (message) => toast.success(message);
  const sendAudio = useSendAudio();
  const [isError, setIsError] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);
  const [audio, setAudio] = useState();
  const [playAudio, setPlayAudio] = useState();
  const hiddenFileInput = useRef(null);
  const userId = localStorage.getItem('grittyuserid');

  const handleUploadClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFileClick = async (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      setUploadingAudio(true);

      if (file.type !== 'audio/mpeg') {
        error(`Please upload an audio file instead of a ${file.type} file`);
        return;
      }

      setTimeout(() => setUploadingAudio(false), 1000);

      setIsAudio(true);
      setAudio(event.target.files[0]);
      setPlayAudio(URL.createObjectURL(event.target.files[0]));
      setMessages([
        ...messages,
        {
          id: Math.random(),
          botMsg: null,
          userAudio: URL.createObjectURL(event.target.files[0]),
        },
      ]);
      console.log('audio', URL.createObjectURL(event.target.files[0]));
    }
  };
  const [chats, setChats] = React.useState([]);

  const submitAudioHandler = () => {
    const soln = new FormData();
    soln.append('file', audio);
    soln.append('userId', userId);
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
        success(res.data.message);
      })
      .catch((err) => {
        error(err?.response?.data?.message);
      });
  };

  return (
    <div className="flex w-full flex-col h-full">
      <div className="px-3 flex-1 md:px-10 relative mt-5">
        <div>
          <div className="grid place-items-center md:hidden">
            <h1>Quick Transcribe</h1>
          </div>

          <div className={`${isError ? 'fixed bg-white brightness-50 w-full' : ''}`}>
            {messages.map((data, index) => (
              <React.Fragment key={index}>
                <div className="pb-20 md:pb-10 px-2 mt-5 relative">
                  {data.botMsg !== null ? (
                    <div className="ai__msg w-full max-w-xs">
                      <h1 className="text-base font-medium pb-2">Speak Better</h1>
                      <p className="bg-gray-100 px-6 py-3 text-slate-700 font-normal leading-5 rounded">
                        {data.botMsg}
                      </p>
                      <p className="mt-1 text-xs text-left">{dayjs().format('h:mm A')}</p>
                    </div>
                  ) : null}

                  {data.userAudio !== null ? (
                    <div className="user__msg p-0 max-w-xs ml-auto">
                      {uploadingAudio && (
                        <div className="border-2 border-dashed border-green-300 bg-green-100 px-5 py-1 text-sm">
                          <p>Audio file getting imported</p>
                        </div>
                      )}

                      {isAudio && !uploadingAudio ? (
                        <div className="space-y-2">
                          <div className="flex space-x-2 items-center">
                            <SentAudio audio={playAudio} />
                            <div>
                              <Tooltip title="Transcribe audio" arrow>
                                <IconButton onClick={submitAudioHandler} color="primary">
                                  <MdSend />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </div>
                          {sendAudio.isLoading && <BeatLoader size={12} color="#8C54BF" />}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </React.Fragment>
            ))}
          </div>
          <div>
            <ChatContainer chats={chats} />
          </div>

          {isError ? <ErrorOverlay setIsError={setIsError} /> : null}
          <Toaster />
        </div>
      </div>
      <div className="pb-4">
        <button
          onClick={handleUploadClick}
          className="w-full mt-6 bg-[#E8DDF2] border-4 py-6 border-dashed text-md md:text-xl text-[#8C54BF] border-[#8C54BF]"
        >
          Click here to upload an audio
          <input
            ref={hiddenFileInput}
            onChange={handleFileClick}
            className="hidden"
            type="file"
            accept="audio/*"
            name="audio_file"
            id="audio_file"
          />
        </button>
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
