import React, { useState } from 'react';
import { loginUser } from '../../api/users';

const Login = ({ currentUser, setCurrentUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (!username || !password) {
      alert('Please enter a valid username or password');
    }

    const user = await loginUser({ username, password });

    localStorage.clear();
    setCurrentUser({ id: user.id, username: user.username });

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
      <h1>Login Here:</h1>
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
      <button type='submit'>Login</button>
    </form>
  );
};

export default Login;
