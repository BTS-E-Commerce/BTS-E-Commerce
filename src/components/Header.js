import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  // Need to coditionally render some of these components based off the currentUser
  // Example: Do not Render Register/Login buttons if there is a currentUser that is not a guest

  // Log out button needs to clear the current User and clear all local storage
  return (
    <div>
      <h1>GRANDMA'S MAC</h1>
      <NavLink to='/'>HOME</NavLink>
      <NavLink to='/account'>ACCOUNT</NavLink>
      <NavLink to='/register'>REGISTER</NavLink>
      <NavLink to='/login'>LOGIN </NavLink>
      <NavLink to='/cart'>MY CART </NavLink>
      <button>Log Out</button>
    </div>
  );
};

export default Header;
