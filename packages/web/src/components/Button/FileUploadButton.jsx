import { useRef } from 'react';
import { PropTypes } from 'prop-types';
import toast from 'react-hot-toast';

const FileUploadButton = ({ audio, setAudio, setIsAudio }) => {
  const hiddenFileInput = useRef(null);

  new Date().toISOString();
  const handleUploadClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFileClick = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];

      if (file.type !== 'audio/mpeg') {
        toast.error(`Please upload an audio file instead of a ${file.type} file`);
        return;
      }

      setIsAudio(true);
      setAudio(URL.createObjectURL(event.target.files[0]));

      console.log('audio', audio);
    }
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

FileUploadButton.propTypes = {
  isAudio: PropTypes.bool,
  setIsAudio: PropTypes.func,
  setAudio: PropTypes.func,
  audio: PropTypes.string,
};

export default FileUploadButton;
