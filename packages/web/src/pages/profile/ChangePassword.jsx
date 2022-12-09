import { useState, useEffect } from 'react'
import ProfileScreenButton from '../../components/Button/profileButton/ProfileScreenButton'
import { useNavigate } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
import { ENDPOINTS } from '../../lib/constants';



export default function ChangePassword() {
    const initialValues = {newPassword: "", confirmNewPassword: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [btnActive, setBtnActive] = useState(true);
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    const history = useNavigate();
    const navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem("userData"));
    const endpoint = ENDPOINTS.API_BASE_HTTPS_URL;
    const url = endpoint + 'user/profile/';
    const token = localStorage.getItem("grittyusertoken");
    const error = (message) => toast.error(message);
    const success = (message) => toast.success(message);

    const headersList = {
        "Authorization": `Bearer ${token}`
    }

    const updateUserData = async () => {
        let bodyContent = {
            "email": data.email,
            "firstName": data.firstName,
            "lastName": data.lastName,
            "language": data.language,
            "username": data.username,
            "password": formValues.newPassword,
            "confirm_password": formValues.confirmNewPassword,
        }
        try {
            const response = await fetch(url + "update", {
            method: "POST",
            body: JSON.stringify(bodyContent),
            headers: {...headersList, "Content-Type": "application/json; charset=utf-8"}
            });
            const data = await response.json();
            console.log(data);
            success('password updated!');
            setTimeout(() => navigate('/me/profile'), 3000);
      
        } catch (err) {
            console.log(err);
            error('error updating password.')
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserData();
    };

    useEffect(() => {
        setFormErrors(validate(formValues));
        if(regex.test(formValues.confirmNewPassword)) {
            setBtnActive(false);
        } else {
            setBtnActive(true)
        }
    },[formValues.confirmNewPassword, formValues])

    

    const validate = (values) => {
        const errors = {};
        
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
    <div className='h-full w-[90%] md:w-[70%] lg:w-[70%] m-auto pt-5 sm:pt-16'>
         <BsChevronLeft className='absolute top-5 sm:hidden' size={28} onClick={() => history(-1)} />
        <h1 className='text-xl sm:text-2xl text-[#393939] text-center md:text-start font-bold'>Change your password</h1>

        <form onSubmit={handleSubmit} className='mt-10 h-[90%] flex flex-col gap-5'>
            
            <label className='flex flex-col'>
                <span className='font-bold text-base md:text-lg lg:text-lg text-[#393939] mb-2'>New password</span>
                <input 
                    className={formErrors.newPassword ? '_input border-[#c51717]' : '_input border-[#d2d2d2]'} 
                    type="password" 
                    name="newPassword" 
                    id="newPassword" 
                    placeholder='Enter new password'
                    value={formValues.newPassword}
                    onChange={handleChange} 
                    />
                    <p className="mt-2 text-[#c51717] text-xs">
                     {formErrors.newPassword}
                    </p>
            </label>
            <label className='flex flex-col'>
                <span className='font-bold text-base md:text-lg lg:text-lg text-[#393939] mb-2'>Confirm new password</span>
                <input 
                    className={formErrors.confirmNewPassword ? '_input border-[#c51717]' : '_input border-[#d2d2d2]'} 
                    type="password" 
                    name="confirmNewPassword" 
                    id="confirmNewPassword" 
                    placeholder='Enter new password again'
                    value={formValues.confirmNewPassword}
                    onChange={handleChange} 
                    />
                <p className="mt-2 text-[#c51717] text-xs">
                     {formErrors.confirmNewPassword}
                </p>
            </label>

            <div className="_btnContainer">
                <ProfileScreenButton className="hidden sm:block" onClick={() => history(-1)} variant="secondary">Cancel</ProfileScreenButton>
                <ProfileScreenButton disabled={btnActive} onClick={handleSubmit}>Reset</ProfileScreenButton>
            </div>
        </form>
        <Toaster />
       
    </div>
  )
}
