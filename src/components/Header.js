import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  //

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
