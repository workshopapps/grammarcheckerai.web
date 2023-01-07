import { useState, useEffect } from 'react';
import ProfileScreenButton from '../../components/Button/profileButton/ProfileScreenButton';
import { useNavigate } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
import { ENDPOINTS } from '../../lib/constants';
import { motion } from 'framer-motion';

const reasonsArray = [
  {
    id: 1,
    text: 'I found a better solution',
  },
  {
    id: 2,
    text: 'I no longer need Speak Better',
  },
  {
    id: 3,
    text: 'I have concerns about security compliance',
  },
  {
    id: 4,
    text: 'I need better transcript accuracy',
  },
  {
    id: 5,
    text: 'I have a concern about privacy',
  },
  {
    id: 6,
    text: 'I need better features',
  },
  {
    id: 7,
    text: 'others',
  },
];

export default function ConfirmDeleteAccount() {
  const [reasons, setReasons] = useState([]);
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const history = useNavigate();
  const success = (message) => toast.success(message);
  const error = (message) => toast.error(message);
  const endpoint = ENDPOINTS.API_BASE_URL;
  const url = endpoint + 'user/';
  const data = JSON.parse(localStorage.getItem('isUserDetails'));
  const token = localStorage.getItem('grittyusertoken');

  const headersList = {
    Authorization: `Bearer ${token}`,
  };

  const deleteUser = async () => {
    let bodyContent = {
      email: data.email,
      password: password,
    };
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(bodyContent),
        headers: { ...headersList, 'Content-Type': 'application/json; charset=utf-8' },
      });
      const data = await response.json();
      if (data.message === 'you are not authorized to delete this account') {
        error('incorrect password!');
      } else if (data.message === 'you have successfully deleted your account') {
        console.log(data);
        success('account deleted!');
        localStorage.clear();
        window.location.replace('/signin');
        location.reload();
        setTimeout(() => location.reload(), 2000);
      } else {
        error('try again');
      }
    } catch (err) {
      console.log(err);
      //error('error updating data.');
    }
  };

  const addReason = (item) => {
    if (reasons.includes(item)) {
      setReasons(reasons.filter((r) => r.id !== item.id));
    } else {
      setReasons([...reasons, item]);
    }
  };
  useEffect(() => {
    if (Object.keys(reasons).length === 0) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
    //console.log(reasons);
  }, [reasons]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-full flex flex-col w-[90%] md:w-[70%] lg:w-[70%] m-auto py-5 sm:pt-16"
    >
      <BsChevronLeft className="absolute top-5 sm:hidden" size={28} onClick={() => history(-1)} />
      <div className="flex flex-col">
        <h1 className="text-xl sm:text-2xl text-[#393939] sm:text-center text-center font-bold">Delete Account</h1>
        <p className="text-sm sm:text-lg mt-5 opacity-50">
          Step 2/2: Please share the reasons why you no longer want to continue with Speak Better so we can improve our
          services further. You can make multiple selections.
        </p>
      </div>

      <ul className="mt-10 flex flex-wrap gap-2 sm:gap-6">
        {reasonsArray.map((item) => (
          <button
            onClick={() => addReason(item)}
            className={
              !reasons.includes(item)
                ? 'cursor-pointer px-4 py-2 rounded-3xl bg-[#eeeeee] text-sm sm:text-base hover:bg-[#5d387f]/50'
                : 'cursor-pointer px-4 py-2 rounded-3xl text-sm sm:text-base bg-[#5d387f] text-white'
            }
            key={item.id}
          >
            {item.text}
          </button>
        ))}
      </ul>

      <form className="mt-5">
        <label className="flex flex-col">
          <span className="text-base sm:text-lg">password:</span>
          <input type="password" value={password} className="_input" onChange={(e) => setPassword(e.target.value)} />
        </label>
      </form>

      <div className="_btnContainer">
        <ProfileScreenButton className="hidden sm:block" onClick={() => history(-1)} variant="secondary">
          Cancel
        </ProfileScreenButton>
        <ProfileScreenButton onClick={deleteUser} disabled={btnDisabled}>
          Submit
        </ProfileScreenButton>
      </div>
      <Toaster />
    </motion.div>
  );
}
