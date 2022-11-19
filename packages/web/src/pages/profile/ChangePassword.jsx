import { useState, useEffect } from 'react'
import ProfileScreenButton from '../../components/Button/ProfileScreenButton'
import successimg from '../../assets/success.svg';



export default function ChangePassword() {
    const initialValues = {password: "", newPassword: "", confirmNewPassword: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        Object.keys(formErrors).length === 0 && setFormValues({password: "", newPassword: "", confirmNewPassword: ""});
    },[formErrors])

    const validate = (values) => {
        const errors = {};
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        if(!values.password) {
            errors.password= "Please enter your old password";
        }
        if(!values.newPassword) {
            errors.newPassword= "Please enter a new password";
        }
        if(!values.confirmNewPassword) {
            errors.confirmNewPassword= "Please enter your new password again";
        }
        if(!regex.test(values.newPassword)) {
            errors.newPassword = "new password must be between 6 to 20 characters,contain at least one numeric digit, one uppercase and one lowercase letter"
        }
        if(values.newPassword != values.confirmNewPassword) {
            errors.confirmNewPassword= "passwords do not match";
        }
        return errors;
    }
    
  return (
    <div className='h-[100vh] w-[90%] md:w-[70%] m-auto'>
        <h1 className='text-2xl text-[#393939] text-center md:text-start font-bold'>Change your password</h1>

        <form onSubmit={handleSubmit} className='mt-10 flex flex-col gap-5'>
            <label className='flex flex-col'>
                <span className='font-bold text-base md:text-lg text-[#393939] mb-2'>Old password</span>
                <input 
                    className={formErrors.password ? '_input border-[#c51717]' : '_input border-[#d2d2d2]'} 
                    type="password"
                    name="password" 
                    id="password" 
                    placeholder='Enter your old password'
                    value={formValues.password} 
                    onChange={handleChange}
                    />
                    <p className="mt-2 text-[#c51717] text-lg">
                     {formErrors.password}
                    </p>
            </label>
            <label className='flex flex-col'>
                <span className='font-bold text-base md:text-lg text-[#393939] mb-2'>New password</span>
                <input 
                    className={formErrors.newPassword ? '_input border-[#c51717]' : '_input border-[#d2d2d2]'} 
                    type="password" 
                    name="newPassword" 
                    id="newPassword" 
                    placeholder='Enter new password'
                    value={formValues.newPassword}
                    onChange={handleChange} 
                    />
                    <p className="mt-2 text-[#c51717] text-lg">
                     {formErrors.newPassword}
                    </p>
            </label>
            <label className='flex flex-col'>
                <span className='font-bold text-base md:text-lg text-[#393939] mb-2'>Confirm new password</span>
                <input 
                    className={formErrors.confirmNewPassword ? '_input border-[#c51717]' : '_input border-[#d2d2d2]'} 
                    type="password" 
                    name="confirmNewPassword" 
                    id="confirmNewPassword" 
                    placeholder='Enter new password again'
                    value={formValues.confirmNewPassword}
                    onChange={handleChange} 
                    />
                <p className="mt-2 text-[#c51717] text-lg">
                     {formErrors.confirmNewPassword}
                </p>
            </label>

            <div className="_btnContainer">
                <ProfileScreenButton variant="secondary">{'Cancel'}</ProfileScreenButton>
                <ProfileScreenButton onClick={handleSubmit}>{'Reset'}</ProfileScreenButton>
            </div>
        </form>

        {Object.keys(formErrors).length === 0 && isSubmit ? <div className='mt-5 text-[#393939] bg-[#f5f5f5] px-4 rounded flex justify-center gap-3 py-2 text-center w-[40%] m-auto'><img src={successimg} alt='success'/>Password changed successfully</div> : null}
    </div>
  )
}
