import React from 'react';
import { NavLink } from 'react-router-dom';
import { getAllUsers } from '../api/users';

import logo from './images/GrandmasMac.png';

import './Header.css';

const Header = ({ currentUser, setCurrentUser, setOngoingOrder }) => {
  const logOutUser = (event) => {
    event.preventDefault();
    localStorage.clear();
    setCurrentUser({ id: 1, username: 'guest', admin: false });
    setOngoingOrder({});
  };

  async function testStuff(event) {
    event.preventDefault();
    console.log('click is working on test button');

    const logAllUsers = await getAllUsers();
    console.log(logAllUsers);
  }

  return (
    <div id='Header'>
      {currentUser.id === 1 ? (
        <>
          <NavLink className='homeNav' to='/'>
            <img src={logo} alt="Grandma's Mac Logo" />
          </NavLink>
          <div className='navContainer'>
            <div className='leftOfNavbar'>
              <h2> Welcome! </h2>
            </div>
            <div className='navBar'>
              <NavLink className='homeNav' to='/home'>
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
            </div>
            <div className='rightOfNavbar'>
              <button onClick={logOutUser}>Log Out</button>
              {/* <button onClick={testStuff}>TEST JWT</button> */}
            </div>
          </div>
        </>
      ) : (
        <>
          <NavLink className='homeNav' to='/'>
            <img src={logo} alt="Grandma's Mac Logo" />
          </NavLink>
          <div className='navContainer'>
            <div className='leftOfNavbar'>
              <h2>
                Current User:
                <NavLink className='accountNav' to='/account'>
                  {currentUser.username}
                </NavLink>
              </h2>
            </div>
            <div className='navBar'>
              <NavLink className='homeNav' to='/'>
                HOME
              </NavLink>
              <NavLink className='accountNav' to='/account'>
                ACCOUNT
              </NavLink>
              <NavLink className='cartNav' to='/cart'>
                MY CART
              </NavLink>
            </div>
            <div className='rightOfNavbar'>
              <button onClick={logOutUser}>Log Out</button>
              {/* <button onClick={testStuff}>TEST JWT</button> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
