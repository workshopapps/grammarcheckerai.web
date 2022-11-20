import { useState, useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';
import ProfileScreenButton from '../../components/Button/profileButton/ProfileScreenButton';

export default function DeleteAccount() {
    const [email, setEmail] = useState('');
    const [btnActive, setBtnActive] = useState(true);
    const [formErrors, setFormErrors] =useState({});
    const history = useNavigate();
    const navigate = useNavigate();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(email));
        navigate('/me/profile/deleteaccount-step2');
    }

    useEffect(() => {

        if(regex.test(email)) {
            setBtnActive(false);
        } else {
            setBtnActive(true)
        }
    },[email])

    const validate = (value) => {
        const errors = {};

        if(!value) {
            errors.email= "Please provide a valid email address";
        } else if(!regex.test(value)) {
            errors.email = "This is not a valid email format!"
        }
        return errors;
    }


  return (
    <div className='h-[100vh] w-[90%] md:w-[70%] lg:w-[70%] m-auto mt-24'>
        <div className='flex flex-col'>
            <h1 className='text-2xl text-[#393939] text-center md:text-start lg:text-start font-bold'>Delete Account</h1>
            <p className=' sm:text-base text-lg mt-2 opacity-50'>Step 1/2: Verify your account information.</p>
        </div>

        <div className='md:border-[1px] lg:border-[1px] mt-10 border-[#d7d7d7] rounded-lg px-5'>
            <div className='flex flex-col md:flex-row justify-between sm:text-base text-lg px-2 sm:py-2 py-5 border-b-[1px] border-[#d7d7d7]'>
                <span className='font-bold text-[#9c9c9c]'>Email</span>
                <p className='font-bold text-[#393939]'>riri@gmail.com</p>
            </div>
            <div className='flex sm:flex-col sm:mt-2 mt-0 flex-row sm:border-b-[1px] border-none border-[#d7d7d7] justify-between sm:text-base text-lg px-2 sm:py-2 py-5'>
                <span className='font-bold text-[#9c9c9c]'>I`ve been with Gritty Grammar for</span>
                <p className='font-bold text-[#393939]'>11 months</p>
            </div>

        </div>
            <form className='mt-10'>
                <label className='flex flex-col'>
                    <span className='font-bold sm:text-base text-lg text-[#393939] mb-2'>Notify me when account has been deleted</span>
                    <input
                        className={formErrors.email ? '_input border-[#c51717]' : '_input border-[#d2d2d2]'} 
                        type="email" 
                        name="email" 
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder='Enter email address'

                        />
                     <p className="mt-2 text-[#c51717] text-lg">
                        {formErrors.email}
                    </p>
                </label>

                <div className="_btnContainer">
                    <ProfileScreenButton onClick={() => history(-1)} variant="secondary">{'Cancel'}</ProfileScreenButton>
                    <ProfileScreenButton disabled={btnActive} onClick={handleSubmit}>{'Continue'}</ProfileScreenButton>
                </div>
            </form>
    </div>
  )
}
