import React, { useState } from 'react';
import styles from '../register/RegisterUser.module.scss';

const RegisterUser = () => {
    const [user, setUser] = useState(null);
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    const register = () => {

    };

  return (
    <div className={styles.register}>
      <form>

        <label htmlFor="username">Username</label>
        <input type="text" id='username' placeholder='Username' 
            onChange={(e) => setUser({...user, username: e.target.value})}
        />

        <label htmlFor="password">Password</label>
        <input type="password" id='password' placeholder='Password' 
            onChange={(e) => setUser({...user, password: e.target.value})}
        />

        <button onClick={register}>Register</button>
    </form>
    </div>
  )
}

export default RegisterUser;
