import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
const signUpSchema = yup.object().shape({
    newUserFirstName: yup.string()
        .min(2, 'Too Short!')
        .max(60, 'Too Long!') 
        .required('First Name is required.'),

    newUserLastName: yup.string()
        .min(2, 'Too Short!')
        .max(60, 'Too Long!')
        .required('Last Name is required.'),

    newUserName: yup.string()
        .min(2, 'Too Short!')
        .max(60, 'Too Long!')
        .required('Last Name is required.'),

    newUserEmail: yup.string()
        .email('Please enter a valid email address.')
        .required('Email is required.'),

    newUserPassword: yup.string()
        .min(6, 'Password must be 6 characters or more.')
        .matches(passwordRules, {
            message: 'Must have at least 1 uppercase and a number.'
        })
        .required('Please enter a password.'),

    newUserConfirmPassword: yup.string()
        .oneOf([yup.ref('newUserPassword'), null], 'Passwords must match.')
        .required('Please confirm password.'),
});
export {
    signUpSchema
};