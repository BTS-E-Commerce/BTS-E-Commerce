import React from 'react';
import { NavLink } from 'react-router-dom';
import { getAllUsers } from '../api/users';

// import './App.css';

const Header = ({ currentUser, setCurrentUser }) => {
  const logOutUser = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    setCurrentUser({ id: 1, username: 'guest' });
  };

  async function testStuff(event) {
    event.preventDefault();
    console.log('click is working on test button');

    const logAllUsers = await getAllUsers();
    console.log(logAllUsers);
  }

  return (
    <div id='Header'>
      {currentUser.username === 'guest' ? (
        <>
          <h1>GRANDMA'S MAC</h1>
          <h2>Current User: {currentUser.username}</h2>
          <NavLink to='/'>HOME</NavLink>
          <NavLink to='/account'>ACCOUNT</NavLink>
          <NavLink to='/register'>REGISTER</NavLink>
          <NavLink to='/login'>LOGIN </NavLink>
          <NavLink to='/cart'>MY CART </NavLink>
        </>
      ) : (
        <>
          <h1>GRANDMA'S MAC</h1>
          <h2>Current User: {currentUser.username}</h2>
          <NavLink to='/'>HOME</NavLink>
          <NavLink to='/account'>ACCOUNT</NavLink>
          <NavLink to='/cart'>MY CART </NavLink>
          <button onClick={logOutUser}>Log Out</button>
          <button onClick={testStuff}>TEST JWT</button>
        </>
      )}
    </div>
  );
};

export default Header;
