import React, { useState } from 'react';
import { createUser } from '../../api/index';
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import './Auth.css';

const Register = ({ setCurrentUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  let history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    console.log('register clicked');

    if (!username || !password || !confirm) {
      alert('Please make sure all fields are filled out');
    }

    if (password !== confirm) {
      alert('Passwords do not match!');
      return;
    }

    // window.location.reload();

    try {
      const user = await createUser({ username, password });
      console.log(user);
      console.log(user.newUser.id, user.newUser.username);
      console.log(user.token);

      localStorage.clear();

      setCurrentUser({
        id: user.newUser.id,
        username: user.newUser.username,
        admin: user.newUser.admin,
      });

      localStorage.setItem('id', user.newUser.id);
      localStorage.setItem('username', user.newUser.username);
      localStorage.setItem('token', user.token);

      setUsername('');
      setPassword('');
      setConfirm('');
      history.push('/store');
    } catch (error) {
      console.error(error);
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmChange = (event) => {
    setConfirm(event.target.value);
  };

  return (
    <div id='register'>
      <form onSubmit={handleSubmit} className='auth-form'>
        <h1 className='auth-header'>Welcome</h1>
        <div className='auth-box'>
          <label htmlFor='username' className='auth-label'>
            Username:
          </label>
          <input
            className='auth-input'
            type='text'
            name='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className='auth-box'>
          <label htmlFor='password' className='auth-label'>
            Password:
          </label>
          <input
            className='auth-input'
            type='password'
            name='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className='auth-box'>
          <label htmlFor='confirm' className='auth-label'>
            Confirm Password:
          </label>
          <input
            className='auth-input'
            type='password'
            name='confirm'
            value={confirm}
            onChange={handleConfirmChange}
          />
        </div>
        <button className='auth-button' type='submit'>
          Register
        </button>
        <div className='accountCheck'>
          <h2 className='memberCheck'>Already A Mac Member?</h2>
          <NavLink to='/login'>LOGIN</NavLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
