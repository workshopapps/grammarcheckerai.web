import { useState, useEffect } from 'react';
import ProfileScreenButton from '../../components/Button/ProfileScreenButton';

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
    <div className='h-[100vh] w-[90%] md:w-[70%] m-auto'>
        <div className='flex flex-col'>
            <h1 className='text-2xl text-[#393939] text-center md:text-start font-bold'>Delete Account</h1>
            <p className='text-base md:text-lg mt-2 opacity-50'>Step 2/2: Please share the reasons why you no longer want to continue with Gritty Grammer so we can improve our services further. You can make multiple selections.</p>
        </div>

        <ul className='mt-10 flex flex-wrap gap-6'>
            {reasonsArray.map((item) => (
                <button 
                    onClick={() => addReason(item.text)}
                    className='cursor-pointer px-4 py-3 rounded-3xl bg-[#eeeeee] text-base md:text-lg' key={item.id}
                    >
                        {item.text}
                    </button>
            ))}
        </ul>

        <div className="_btnContainer">
            <ProfileScreenButton variant="secondary">
                {'Cancel'}
            </ProfileScreenButton>
            <ProfileScreenButton disabled={Object.keys(reasons).length === 0 ? true : false} >
                {'Submit'}
            </ProfileScreenButton>
        </div>
    </div>
  )
}
