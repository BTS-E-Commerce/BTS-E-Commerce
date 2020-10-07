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

    if (password !== confirm) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const user = await createUser({ username, password });

      localStorage.clear();

      setCurrentUser({
        id: user.newUser.id,
        username: user.newUser.username,
        admin: user.newUser.admin,
        adminCode: user.adminCode
      });

      localStorage.setItem('id', user.newUser.id);
      localStorage.setItem('username', user.newUser.username);
      localStorage.setItem('token', user.token);

      setUsername('');
      setPassword('');
      setConfirm('');
      history.push('/store');
    } catch (error) {
      alert("That username already exists.");
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
            minLength='6'
            maxLength='16'
            required
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
            minLength='6'
            maxLength='16'
            required
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
            required
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
