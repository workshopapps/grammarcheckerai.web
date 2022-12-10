import ProfileScreenButton from '../Button/profileButton/ProfileScreenButton';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';

export default function LogOutModal({ handleClose, open }) {
  const onSignOut = () => {
    localStorage.clear();
    window.location.replace('/signin');
    location.reload();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className="w-[90%] sm:w-[500px] flex flex-col items-center bg-white my-auto rounded-lg p-5 py-8 absolute"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <h3 className="text-xl">Are you sure you want to log out?</h3>
        <div className="w-full flex flex-col sm:flex-row lg:flex-row justify-center gap-5 mt-10">
          <ProfileScreenButton size="small" onClick={onSignOut}>
            Yes, log me out.
          </ProfileScreenButton>
          <ProfileScreenButton size="small" onClick={handleClose} variant="danger">
            Cancel
          </ProfileScreenButton>
        </div>
      </div>
    </Modal>
  );
}

LogOutModal.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};
