import PropTypes from 'prop-types';
import deleteIcon from '../../../assets/delete.svg';
import { Modal } from '@mui/material';
import axios from 'axios';
import toast, {Toaster } from 'react-hot-toast';
function HistoryModal({ open, onClose, setHistory }) {

  const success = (msg) => toast.success(msg);
  const error = (msg) => toast.error(msg);
  const token = localStorage.getItem('grittyusertoken');
  const URL = `https://api.speakbetter.hng.tech/v1/chatHistory`;

    const deleteHistory = async () => {
      try {
        const res = await axios.delete(URL, {headers: {'Authorization': `Bearer ${token}`}});
        setHistory(res);
        success('History deleted successfully!');
      } catch (e) {
        console.log('An error occured', e);
      }
    };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <div
        className="modal bg-white sm:rounded-[16px] max-w-[540px] w-full sm:h-[394px] h-screen sm:min-h-[unset] absolute min-h-screen flex flex-col justify-center items-center"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <div className="md:px-6 sm:px-3 px-3 sm:py-6">
          <div className="flex justify-center items-center my-6">
            <img src={deleteIcon} alt="deleteIcon" />
          </div>
          <h3 className="font-['Inter'] text-[#393939] font-normal text-center sm:text-xl text-[16px]">
            Are you sure you want to delete all conversation?
          </h3>
          <button
            className="flex bg-[#EC1B1B] my-6 justify-center items-center py-3 outline-none w-full rounded-xl text-white sm:text-base text-[15px]"
            onClick={deleteHistory}
          >
            Delete
          </button>
          <button
            className="flex bg-transparent my-6 border-[1px]  justify-center py-3 items-center outline-none w-full rounded-lg text-[ #393939] sm:text-base text-[15px] border-[#00000060]"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
        <Toaster/>
      </div>
      
    </Modal>
  );
}

HistoryModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  setHistory: PropTypes.func,
};

export default HistoryModal;
