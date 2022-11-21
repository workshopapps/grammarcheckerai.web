import React from 'react';
import PropTypes from 'prop-types';
import deleteIcon from '../../../assets/delete.svg';

function HistoryModal({ open, onClose, setHistory }) {
  if (!open) return null;
  return (
    <div className="overlay bg-[#33333340] fixed w-full h-full top-0 left-0 right-0 bottom-0">
      <div className="modal bg-white sm:rounded-[16px] max-w-[540px] w-full sm:h-[394px] h-screen sm:min-h-[unset] min-h-screen fixed sm:top-[50%] sm:left-[50%] flex flex-col justify-center items-center sm:translate-x-[-50%] sm:translate-y-[-50%]">
        <div className="md:px-6 sm:px-3 px-3 sm:py-6">
          <div className="flex justify-center items-center my-6">
            <img src={deleteIcon} alt="deleteIcon" />
          </div>
          <h3 className="font-['Inter'] text-[#393939] font-normal text-center sm:text-2xl text-[16px]">
            Are you sure you want to delete all conversation?
          </h3>
          <button
            className="flex bg-[#EC1B1B] my-8 justify-center items-center py-3 outline-none w-full rounded-xl text-white sm:text-base text-[15px]"
            onClick={setHistory}
          >
            Delete
          </button>
          <button
            className="flex bg-transparent my-8 border-[1px]  justify-center py-3 items-center outline-none w-full rounded-lg text-[ #393939] sm:text-base text-[15px] border-[#00000060]"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

HistoryModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  setHistory: PropTypes.func,
};

export default HistoryModal;
