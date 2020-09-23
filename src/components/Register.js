import React, { useState } from 'react';
import { createUser } from '../api/users';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    createUser({ username, password });
    setUsername('');
    setPassword('');
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
          placeholder='username'
        />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input
          type='text'
          name='password'
          value={password}
          onChange={handlePasswordChange}
          placeholder='password'
        />
      </div>
      <button type='submit'>Register</button>
    </form>
  );
};

export default Register;
