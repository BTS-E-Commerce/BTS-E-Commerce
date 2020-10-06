//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

import React, { useState } from 'react';
import { checkUserByUsername, loginUser } from '../../api/users';
import { NavLink, useHistory } from 'react-router-dom';
import './Auth.css';

const Login = ({ setCurrentUser }) => {
  //~~~~~~~~~~~~~~~~~~~
  //~~~~~~ STATE ~~~~~~
  //~~~~~~~~~~~~~~~~~~~

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    if (!username || !password) {
      alert('Please enter a valid username or password');
      return;
    }
    try {
      const userUsername = await checkUserByUsername({ username });
      console.log(userUsername);

      // whis is this if statement not working
      if (userUsername === undefined) {
        alert('Username does not exist');
        return;
      }
    const user = await loginUser({ username, password });

    if (!user.hasOwnProperty('user')) {
      alert(`Name: ${user.name} \n` + `Message: ${user.message}`);
      return;
    }

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
      history.push('/store');
    } catch (error) {
      throw error;
    }
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
            <h1 className='auth-header'>Welcome Back!</h1>
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
                required
              />
            </div>
            <div className='auth-box auth-box-last'>
              <label htmlFor='password' className='auth-label'>
                Password:
              </label>
              <input
                className='auth-input'
                type='password'
                name='password'
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className='accountCheck'>
              <h2 className='memberCheck'>Not A Mac Member Yet?</h2>
              <NavLink to='/register'>REGISTER</NavLink>
            </div>
            <button className='auth-button' type='submit'>
              Login
            </button>
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
