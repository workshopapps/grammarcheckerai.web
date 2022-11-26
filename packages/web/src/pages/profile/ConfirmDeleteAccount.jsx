import { useState, useEffect } from 'react';
import ProfileScreenButton from '../../components/Button/profileButton/ProfileScreenButton';
import { useNavigate } from 'react-router-dom';

const reasonsArray = [
    {
        id: 1,
        text: 'I found a better solution'
    },
    {
        id: 2,
        text: 'I no longer need Gritty Grammer'
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
    const history = useNavigate();

    const addReason = (text) => {
        if(reasons.includes(text)) {
           setReasons([...reasons])
        } else {
            setReasons([...reasons, text]);
        }
    }
    useEffect(() => {
        console.log(reasons);
    },[reasons])
     
  return (
    <div className='h-[100vh] flex flex-col w-[90%] md:w-[70%] lg:w-[70%] m-auto pt-2 sm:pt-16'>
        <div className='flex flex-col'>
            <h1 className='text-xl sm:text-2xl text-[#393939] sm:text-center text-center font-bold'>Delete Account</h1>
            <p className='text-sm sm:text-lg mt-2 opacity-50'>Step 2/2: Please share the reasons why you no longer want to continue with Gritty Grammer so we can improve our services further. You can make multiple selections.</p>
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

        <div className="_btnContainer">
            <ProfileScreenButton onClick={() => history(-1)} variant="secondary">
                Cancel
            </ProfileScreenButton>
            <ProfileScreenButton disabled={Object.keys(reasons).length === 0 ? true : false} >
                Submit
            </ProfileScreenButton>
        </div>
    </div>
  )
}
