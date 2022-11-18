// import FileUploadButton from '../../components/Button/FileUploadButton';
import React from 'react';
import LoadingDots from '../../components/Loaders/LoadingDots';
import './transcribe.module.css';

const Transcribe = () => {
  return (
    <div>
      <div className="border-2 border-red-600  p-8">
        <div className="">
          {[0, 1, 2, 3, 4, 5].map((e, index) => (
            <React.Fragment key={index}>
              <div className="b pb-10 px-2 mt-5 relative">
                <div className="ai__msg w-52">
                  <h1 className="text-base font-medium ">Gritty Grammar</h1>
                  <p className="bg-gray-100 font-normal leading-5 p-2">
                    Hello there, click the icon on the top right to get a quick transcription
                  </p>
                  <p className="mt-1 text-xs">{new Date().toUTCString()}</p>
                </div>

                <div className="user__msg p-0 absolute mt-10 right-0 bottom-0">
                  {/* <FileUploadButton /> */}

                  <LoadingDots />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transcribe;
