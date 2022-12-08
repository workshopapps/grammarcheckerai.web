import ProfileScreenButton from '../Button/profileButton/ProfileScreenButton';
import PropTypes from 'prop-types';

export default function LogOutModal({modal, toggleModal}) {
  const onSignOut = () => {
    localStorage.clear();
    window.location.replace('/signin');
    location.reload();
  };

  return (
    <div className={modal ? 'absolute top-0 left-0 bg-black/70 h-[100vh] w-full flex justify-center z-[999]' : 'hidden'}>
        <div className='w-[70%] md:w-[50%] flex flex-col items-center bg-white rounded m-auto p-5'>
            <h3 className='text-xl'>Are you sure you want to log out?</h3>
            <div className='w-full flex flex-col sm:flex-row lg:flex-row justify-center gap-5 mt-10'>
                <ProfileScreenButton onClick={onSignOut}>Yes, log me out.</ProfileScreenButton>
                <ProfileScreenButton onClick={() => toggleModal()} variant="danger">Cancel</ProfileScreenButton>
            </div>
        </div>
    </div>
  )
};

LogOutModal.propTypes = {
  modal: PropTypes.bool,
  toggleModal: PropTypes.func,
};
