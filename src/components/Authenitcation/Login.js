//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

import React, { useState } from 'react';
import { loginUser } from '../../api/users';
import { NavLink, Redirect } from 'react-router-dom';
import './Auth.css';

const Login = ({ currentUser, setCurrentUser }) => {
  //~~~~~~~~~~~~~~~~~~~
  //~~~~~~ STATE ~~~~~~
  //~~~~~~~~~~~~~~~~~~~

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (!username || !password) {
      alert('Please enter a valid username or password');
      return;
    }

    const user = await loginUser({ username, password });
    console.log(user);

    localStorage.clear();
    setCurrentUser({
      id: user.user.id,
      username: user.user.username,
      admin: user.user.admin,
    });

    localStorage.setItem('id', user.user.id);
    localStorage.setItem('username', user.user.username);
    localStorage.setItem('token', user.token);

    setUsername('');
    setPassword('');
  }

  //~~~~~~~~~~~~~~~~~~~
  //~~~~ FUNCTIONS ~~~~
  //~~~~~~~~~~~~~~~~~~~

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  //~~~~~~~~~~~~~~~~~~~
  //~~~~~~ JSX ~~~~~~~~
  //~~~~~~~~~~~~~~~~~~~

  return (
    <div id='login'>
      {currentUser.id === 1 ? (
        <>
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
            <button className='auth-button' type='submit'>
              Login
            </button>
            <NavLink to='/register'>REGISTER</NavLink>
          </form>
        </>
      ) : (
        <>
          <Redirect to='/home' />
        </>
      )}
    </div>
  );
};

export default Login;
