import React, { useState } from 'react';
import { createUser } from '../api/index';
import { NavLink } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirm) {
      alert('Passwords do not match!');
    }

    createUser({ username, password });
    setUsername('');
    setPassword('');
    setConfirm('');
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
    <form onSubmit={handleSubmit}>
      <h1>Register Here:</h1>
      <div>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          name='username'
          value={username}
          onChange={handleUsernameChange}
          placeholder=' username'
        />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input
          type='text'
          name='password'
          value={password}
          onChange={handlePasswordChange}
          placeholder=' password'
        />
      </div>
      <div>
        <label htmlFor='confirm'>Confirm Password:</label>
        <input
          type='text'
          name='confirm'
          value={confirm}
          onChange={handleConfirmChange}
          placeholder=' confirm password'
        />
      </div>
      <button type='submit'>Register</button>
    </form>
  );
};

export default Register;
