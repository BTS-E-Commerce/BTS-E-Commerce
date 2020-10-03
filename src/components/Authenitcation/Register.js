import React, { useState } from 'react';
import { createUser } from '../../api/index';
import './Auth.css';

const Register = ({ currentUser, setCurrentUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirm) {
      alert('Passwords do not match!');
    }

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

    // has to be a better way to redirect
    // window.location.href = '/home';
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
            type='text'
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
            type='text'
            name='confirm'
            value={confirm}
            onChange={handleConfirmChange}
          />
        </div>
        <button className='auth-button' type='submit'>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
