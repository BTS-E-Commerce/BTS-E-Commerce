import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ currentUser }) => {
  // Log out button needs to clear the current User and clear all local storage

  return (
    <div>
      {currentUser.username === 'guest' ? (
        <>
          <h1>GRANDMA'S MAC</h1>
          <NavLink to='/'>HOME</NavLink>
          <NavLink to='/account'>ACCOUNT</NavLink>
          <NavLink to='/register'>REGISTER</NavLink>
          <NavLink to='/login'>LOGIN </NavLink>
          <NavLink to='/cart'>MY CART </NavLink>
          <button>Log Out</button>
        </>
      ) : (
        <>
          <h1>GRANDMA'S MAC</h1>
          <NavLink to='/'>HOME</NavLink>
          <NavLink to='/account'>ACCOUNT</NavLink>
          <NavLink to='/cart'>MY CART </NavLink>
          <button>Log Out</button>
        </>
      )}
    </div>
  );
};

export default Header;
