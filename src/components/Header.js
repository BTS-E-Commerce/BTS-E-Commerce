import React from 'react';
import { NavLink } from 'react-router-dom';

import './App.css';

const Header = ({ currentUser }) => {
  // Log out button needs to clear the current User and clear all local storage

  return (
    <div id='Header'>
      {currentUser.username === 'guest' ? (
        <>
          <h1>GRANDMA'S MAC</h1>
          <NavLink className='homeNav' to='/'>
            HOME
          </NavLink>
          <NavLink className='accountNav' to='/account'>
            ACCOUNT
          </NavLink>
          <NavLink className='registerNav' to='/register'>
            REGISTER
          </NavLink>
          <NavLink className='loginNav' to='/login'>
            LOGIN{' '}
          </NavLink>
          <NavLink className='cartNav' to='/cart'>
            MY CART{' '}
          </NavLink>
          <button>Log Out</button>
        </>
      ) : (
        <>
          <h1>GRANDMA'S MAC</h1>
          <NavLink className='homeNav' to='/'>
            HOME
          </NavLink>
          <NavLink className='accountNav' to='/account'>
            ACCOUNT
          </NavLink>
          <NavLink className='cartNav' to='/cart'>
            MY CART{' '}
          </NavLink>
          <button>Log Out</button>
        </>
      )}
    </div>
  );
};

export default Header;
