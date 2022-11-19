import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import toast, { Toaster } from 'react-hot-toast';
import styles from './step2.module.css';
import Logo from '../../../../assets/signup-logo.png';
import Image2 from '../../../../assets/Correction 1.png';
import Image1 from '../../../../assets/error 1.png';
import google from '../../../../assets/google.png';
import apple from '../../../../assets/apple.png';
import facebook from '../../../../assets/facebook.png';
import { useLocalStorage, getStorageData } from '../../../../hooks/useLocalStorage';

const index = () => {
  const [newUserName, setNewUserName] = useLocalStorage('newUserName');
  const [newUserFullName, setNewUserFullName] = useLocalStorage('newUserFullName', '');
  const [newUserPassword, setNewUserPassword] = useLocalStorage('newUserPassword', '');
  const [newUserConfirmPassword, setNewUserConfirmPassword] = useLocalStorage('newUserConfirmPassword', '');

  const [newRegisteredUser, setNewRegisteredUser] = useLocalStorage('userCreated', false);

  const error = (message) => toast.error(message);
  const success = (message) => toast.success(message);

  let navigate = useNavigate();
  const handlePrev = () => {
    navigate('/signup');
  };

  /* 
    handleSignUp => signs up the user if they do not exist in the database.
    The function checks for invalid fields as well as empty fields and returns an erro
    when the conditions are not according to the rule.
    -------------------------
    After a successful attempt at creating the new user => the function navigates to the sign in page.
    This is done using a setTimeout after user account creation
  */
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(newRegisteredUser);
    if (newUserName === getStorageData('existingUserName')) {
      error('Username exists!!');
    } else if (
      (newUserName !== '') &
      (newUserFullName !== '') &
      (newUserPassword !== '') &
      (newUserConfirmPassword === newUserPassword)
    ) {
      success("Account Created Succesfully!\nYou'll be redirected to the login in 5 seconds...");
      setNewRegisteredUser(true);
      setTimeout(() => navigate('/signin'), 5000);
    } else {
      error('Error creating account\nPlease try again!');
    }
  };
  const isTabletorMobile = useMediaQuery({
    query: '(min-width: 850px)',
  });
  return (
    <div className={styles._gs2mainsignup}>
      <div className={styles._gs2signup}>
        <div className={styles._gs2signupcol1}>
          {isTabletorMobile && (
            <div className={styles._gs2signuplogo}>
              <img src={Logo} alt="Grammar Checker Logo" />
            </div>
          )}
          <div className={styles._gs2signupcontent}>
            <div className={styles._authback}>
              <svg onClick={handlePrev} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="48"
                  d="M328 112L184 256l144 144"
                />
              </svg>
            </div>
            {isTabletorMobile && (
              <p className={styles._gssignuptophead}>
                STEP <span>2</span> OUT OF <span>2</span>
              </p>
            )}
            <h2>You&rsquo;re almost there!</h2>
            <p className={styles._subtitle}>Start your learning journey today, you can skip this process for later.</p>
            <form className={styles._gs2signupform} onSubmit={handleSignUp}>
              <div className={styles._gs2signupinput}>
                <span>Username</span>
                <input
                  type="text"
                  onChange={(e) => setNewUserName(e.target.value)}
                  pattern="[A-Za-z_-]{1,32}"
                  placeholder="meisieshalom"
                  required
                  id="signupUserName"
                />
              </div>
              <div className={styles._gs2signupinput}>
                <span>Full Name</span>
                <input
                  type="text"
                  required
                  placeholder="Shalom Taiwo"
                  onChange={(e) => setNewUserFullName(e.target.value)}
                  id="signupFullName"
                />
              </div>
              <div className={styles._gs2signupinput}>
                <span>Create a password</span>
                <input
                  type="password"
                  required
                  onChange={(e) => setNewUserConfirmPassword(e.target.value)}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                  id="signupCreatePassword"
                />
              </div>
              <div className={styles._gs2signupinput}>
                <span>Confirm password</span>
                <input
                  type="password"
                  required
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                  id="signupConfirmPassword"
                />
                <span className={styles._gs2signupvalidate}>Passwords must be the same</span>
              </div>
              <div className={styles._gs2signupcontinue}>
                <button type="submit">Create Account</button>
                <div className={styles._gs2signupsignin}>
                  <p>
                    Have an account? <a href="/signin">Login</a>
                  </p>
                </div>
              </div>
              <div className={styles._gs2socialsignupcol}>
                <p>Alternatively, you can sign up with:</p>
                <div className={styles._gs2socialsignups}>
                  <button className={styles._google}>
                    <img src={google} alt="google authentication" />
                  </button>
                  <button className={styles._facebook}>
                    <img src={facebook} alt="facebook authentication" />
                  </button>
                  <button className={styles._apple}>
                    <img src={apple} alt="apple authentication" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={styles._gs2signupcol2}>
          <div className={styles._gs2mainsignupcol2body}>
            <div className={styles._gs2mainsignupcol2images}>
              <img src={Image1} alt="column1" />
              <img src={Image2} alt="column1" />
            </div>
            {isTabletorMobile && (
              <div className={styles._gs2mainsignupcol2content}>
                <h3>Learn, Unlearn & Relearn</h3>
                <p>
                  Our A.I can adapt to an individual&rsquo;s learning style and pace, ensuring that they get the most
                  out of the app.
                </p>
              </div>
            )}
          </div>
          <div className={styles._gs2mainsignupcol2footer}>
            <div className={styles._gs2signupslider}>
              <div className={styles._dots}>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default index;
