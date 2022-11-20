/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const FileUploader = ({ placeholder }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const hiddenFileInput = React.useRef(null);

  const handleClick = (evt) => {
    evt.preventDefault();
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    event.preventDefault();
    const fileUploaded = event.target.files[0];
    setFile(fileUploaded);
    const fileName = fileUploaded.name;
    setFileName(fileUploaded.name);
  };
  return (
    <>
      <button onClick={handleClick} className="flex border border-gray-300 p-3 bg-white rounded-md justify-between">
        <h6 className="text-sm text-dark-200">{placeholder}</h6>
        <img src="images/upload.svg" alt="upload icon" />
      </button>
      <input type="file" style={{ display: 'none' }} ref={hiddenFileInput} onChange={handleChange} />
      <p>{fileName}</p>
    </>
  );
};
export default FileUploader;
