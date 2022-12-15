import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';
import ProfileScreenButton from '../../components/Button/profileButton/ProfileScreenButton';
import { motion } from 'framer-motion';

export default function DeleteAccount() {
  const data = JSON.parse(localStorage.getItem('userData'));
  const [email, setEmail] = useState('');
  const [btnActive, setBtnActive] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const history = useNavigate();
  const navigate = useNavigate();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(email));
    navigate('/me/profile/deleteaccount-step2');
  };

  useEffect(() => {
    if (regex.test(email)) {
      setBtnActive(false);
    } else {
      setBtnActive(true);
    }
  }, [email]);

  const validate = (value) => {
    const errors = {};

    if (!value) {
      errors.email = 'Please provide a valid email address';
    } else if (!regex.test(value)) {
      errors.email = 'This is not a valid email format!';
    }
    return errors;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-full w-[90%] md:w-[80%] lg:w-[70%] m-auto pt-5 sm:pt-16"
    >
      <BsChevronLeft className="absolute top-5 sm:hidden" size={28} onClick={() => history(-1)} />
      <div className="flex flex-col">
        <h1 className="text-xl sm:text-2xl text-[#393939] text-center md:text-start lg:text-start font-bold">
          Delete Account
        </h1>
        <p className="text-sm sm:text-lg mt-5 opacity-50">Step 1/2: Verify your account information.</p>
      </div>

      <div className="sm:border-[1px] mt-10 border-[#d7d7d7] rounded-lg px-5">
        <div className="flex flex-col sm:flex-row justify-between sm:text-lg text-base px-2 py-2 border-b-[1px] border-[#d7d7d7]">
          <span className="text-[#9c9c9c]">Email</span>
          <p className="font-bold text-[#393939]">{data.email}</p>
        </div>
        <div className="flex flex-col sm:flex-row mt-2 sm:mt-0 border-b-[1px] sm:text-lg text-base sm:border-none border-[#d7d7d7] justify-between px-2 py-2">
          <span className="text-[#9c9c9c]">I`ve been with Speak Better since</span>
          <p className="font-bold text-[#393939]">{data.createdAt.slice(0, 10)}</p>
        </div>
      </div>
      <form className="flex flex-col h-[65%] mt-10">
        <label className="flex flex-col">
          <span className="text-base sm:text-lg text-[#393939] mb-2">Notify me when account has been deleted</span>
          <input
            className={formErrors.email ? '_input border-[#c51717]' : '_input border-[#d2d2d2]'}
            type="email"
            name="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
          />
          <p className="mt-2 text-[#c51717] text-lg">{formErrors.email}</p>
        </label>

        <div className="_btnContainer">
          <ProfileScreenButton className="hidden sm:block" onClick={() => history(-1)} variant="secondary">
            Cancel
          </ProfileScreenButton>
          <ProfileScreenButton disabled={btnActive} onClick={handleSubmit}>
            Continue
          </ProfileScreenButton>
        </div>
      </form>
    </motion.div>
  );
}
