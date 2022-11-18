import { useRef } from 'react';

const FileUploadButton = () => {
  const hiddenFileInput = useRef(null);

  new Date().toISOString();
  const handleUploadClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFileClick = (event) => {
    const file = event.target.files[0];

    console.log('File', file);
  };
  return (
    <>
      <button
        className="border-2 border-dashed border-green-300 bg-green-100 px-5 py-1 text-sm"
        onClick={handleUploadClick}
      >
        Upload Audio
      </button>
      <input
        ref={hiddenFileInput}
        onChange={handleFileClick}
        className="hidden"
        type="file"
        name="audio_file"
        id="audio_file"
      />
    </>
  );
};

export default FileUploadButton;
