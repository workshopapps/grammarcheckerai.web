import { useState, useEffect } from 'react';
import ProfileScreenButton from '../../components/Button/profileButton/ProfileScreenButton';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { ENDPOINTS } from '../../lib/constants';

const reasonsArray = [
    {
        id: 1,
        text: 'I found a better solution'
    },
    {
        id: 2,
        text: 'I no longer need Speak Better'
    },
    {
        id: 3,
        text: 'I have concerns about security compliance'
    },
    {
        id: 4,
        text: 'I need better transcript accuracy'
    },
    {
        id: 5,
        text: 'I have a concern about privacy'
    },
    {
        id: 6,
        text: 'I need better features'
    },
    {
        id: 7,
        text: 'others'
    }
]

export default function ConfirmDeleteAccount() {
    const [reasons, setReasons] = useState([]);
    const [password, setPassword] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);
    const history = useNavigate();
    const success = (message) => toast.success(message);
    const error = (message) => toast.error(message);
    const endpoint = ENDPOINTS.API_BASE_HTTPS_URL;
    const url = endpoint + 'user/';
    const data = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem('grittyusertoken');

    const headersList = {
        Authorization: `Bearer ${token}`,
      };

    const deleteUser = async () => {
        let bodyContent = {
          email: data.email,
          password: password
        };
        try {
          const response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(bodyContent),
            headers: { ...headersList, 'Content-Type': 'application/json; charset=utf-8' },
          });
            const data = await response.json();
            if(data.message === "you are not authorized to delete this account") {
                error('incorrect password!')
            } else if (data.message === "you have successfully deleted your account") {
                console.log(data);
                success('account deleted!');
                localStorage.clear();
                window.location.replace('/signin');
                location.reload();
                setTimeout(() => location.reload(), 2000);
            } else {
                error('try again')
            }
        } catch (err) {
          console.log(err);
          //error('error updating data.');
        }
      };

    const addReason = (text) => {
        if(reasons.includes(text)) {
           setReasons([...reasons])
        } else {
            setReasons([...reasons, text]);
        }
    }
    useEffect(() => {
        if (Object.keys(reasons).length === 0) {
            setBtnDisabled(true)
        } else {
            setBtnDisabled(false)
        }
    },[reasons, password])
     
  return (
    <div className='h-full flex flex-col w-[90%] md:w-[70%] lg:w-[70%] m-auto pt-2 sm:pt-16'>
        <div className='flex flex-col'>
            <h1 className='text-xl sm:text-2xl text-[#393939] sm:text-center text-center font-bold'>Delete Account</h1>
            <p className='text-sm sm:text-lg mt-2 opacity-50'>Step 2/2: Please share the reasons why you no longer want to continue with Speak Better so we can improve our services further. You can make multiple selections.</p>
        </div>

        <ul className='mt-10 flex flex-wrap gap-6'>
            {reasonsArray.map((item) => (
                <button 
                    onClick={() => addReason(item.text)}
                    className='cursor-pointer px-4 py-2 rounded-3xl bg-[#eeeeee] text-sm sm:text-base' key={item.id}
                    >
                        {item.text}
                    </button>
            ))}
        </ul>

        <form className='mt-5'>
            <label className='flex flex-col'>
                <span className='text-lg'>password:</span>
                <input type="password" value={password} className='_input' onChange={(e) => setPassword(e.target.value)} />
            </label>
        </form>

        <div className="_btnContainer">
            <ProfileScreenButton onClick={() => history(-1)} variant="secondary">
                Cancel
            </ProfileScreenButton>
            <ProfileScreenButton onClick={deleteUser} disabled={btnDisabled} >
                Submit
            </ProfileScreenButton>
        </div>
        <Toaster />
    </div>
  )
}
