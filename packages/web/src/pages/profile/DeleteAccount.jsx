import { useState, useEffect } from 'react'
import ProfileScreenButton from '../../components/Button/ProfileScreenButton';

export default function DeleteAccount() {
    const [email, setEmail] = useState('');
    const [formErrors, setFormErrors] =useState({});
    //const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(email));
        //setIsSubmit(true);
        console.log(formErrors);
    }

    const validate = (value) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if(!value) {
            errors.email= "Please provide a valid email address";
        } else if(!regex.test(value)) {
            errors.email = "This is not a valid email format!"
        }
        return errors;
    }

    useEffect(() => {
        Object.keys(formErrors).length === 0 && setEmail('');
    },[formErrors])

  return (
    <div className='h-[100vh] w-[90%] md:w-[70%] m-auto'>
        <div className='flex flex-col'>
            <h1 className='text-2xl text-[#393939] text-center md:text-start font-bold'>Delete Account</h1>
            <p className=' text-base md:text-lg mt-2 opacity-50'>Step 1/2: Verify your account information.</p>
        </div>

        <div className='md:border-[1px] mt-10 border-[#d7d7d7] rounded-lg px-5'>
            <div className='flex flex-col md:flex-row justify-between text-base md:text-lg px-2 py-2 md:py-5 border-b-[1px] border-[#d7d7d7]'>
                <span className='font-bold text-[#9c9c9c]'>Email</span>
                <p className='font-bold text-[#393939]'>faithbello444@gmail.com</p>
            </div>
            <div className='flex flex-col mt-2 md:mt-0 md:flex-row border-b-[1px] md:border-none border-[#d7d7d7] justify-between text-base md:text-lg px-2 py-2 md:py-5'>
                <span className='font-bold text-[#9c9c9c]'>I`ve been with Gritty Grammar for</span>
                <p className='font-bold text-[#393939]'>11 months</p>
            </div>

        </div>
            <form className='mt-10'>
                <label className='flex flex-col'>
                    <span className='font-bold text-base md:text-lg text-[#393939] mb-2'>Notify me when account has been deleted</span>
                    <input
                        className={formErrors.email ? '_input border-[#c51717]' : '_input border-[#d2d2d2]'} 
                        type="email" 
                        name="email" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder='Enter email address'

                        />
                     <p className="mt-2 text-[#c51717] text-lg">
                        {formErrors.email}
                    </p>
                </label>

                <div className="_btnContainer">
                    <ProfileScreenButton variant="secondary">{'Cancel'}</ProfileScreenButton>
                    <ProfileScreenButton onClick={handleSubmit}>{'Continue'}</ProfileScreenButton>
                </div>
            </form>
    </div>
  )
}
