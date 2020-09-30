import React from 'react';
import { NavLink } from 'react-router-dom';


import './App.css';

const Header = ({ currentUser, setCurrentUser }) => {
  const logOutUser = (event) => {
    event.preventDefault();
    console.log('this worked');
    localStorage.clear();
    setCurrentUser({ id: 1, username: 'guest' });
  };

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
        </>
      )}
    </div>
  );
};

export default Header;
