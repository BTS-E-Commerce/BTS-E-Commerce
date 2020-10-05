import React from 'react';
import { NavLink } from 'react-router-dom';
import { getAllUsers } from '../api/users';

import logo from './images/GrandmasMac.png';
import homeImg from './images/granmachome.png';
import storeImg from './images/granmacstore.png';
import accountImg from './images/granmacaccount.png';
import loginImg from './images/grandmalogin.png';
import registerImg from './images/granmacregister.png';
import cartImg from './images/grandmamamacart.png';

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
            <img id='macLogo' src={logo} alt="Grandma's Mac Logo" />
          </NavLink>
          <div className='navContainer'>
            <div className='leftOfNavbar'>
              <h2> Welcome! </h2>
            </div>
            <div className='navBar'>
              <NavLink id='homeNav' to='/home'>
                <img
                  className='navImg'
                  src={homeImg}
                  alt='A home with a heart around macaroni in it.'
                />
                HOME
              </NavLink>
              <NavLink id='storeNav' to='/store'>
                <img
                  className='navImg'
                  src={storeImg}
                  alt='A store with macaroni on it.'
                />
                STORE
              </NavLink>
              <NavLink id='accountNav' to='/account'>
                <img
                  className='navImg'
                  src={accountImg}
                  alt="A grandma's head with macaroni for eyes."
                />
                ACCOUNT
              </NavLink>
              <NavLink id='registerNav' to='/register'>
                <img
                  className='navImg'
                  src={registerImg}
                  alt="A grandma's head with a plus sign eyes."
                />
                REGISTER
              </NavLink>
              <NavLink id='loginNav' to='/login'>
                <img
                  className='navImg'
                  src={loginImg}
                  alt='A grandma walking into a doorway.'
                />
                LOGIN{' '}
              </NavLink>
              <NavLink id='cartNav' to='/cart'>
                <img
                  className='navImg'
                  src={cartImg}
                  alt='A pot of macaroni.'
                />{' '}
                CART{' '}
              </NavLink>
            </div>
            <div className='rightOfNavbar'></div>
          </div>
        </>
      ) : (
        <>
          <NavLink className='homeNav' to='/'>
            <img id='macLogo' src={logo} alt="Grandma's Mac Logo" />
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
                <img
                  className='navImg'
                  src={homeImg}
                  alt='A home with a heart around macaroni in it.'
                />
                HOME
              </NavLink>
              <NavLink className='accountNav' to='/account'>
                <img
                  className='navImg'
                  src={accountImg}
                  alt="A grandma's head with macaroni for eyes."
                />
                ACCOUNT
              </NavLink>
              <NavLink id='cartNav' to='/cart'>
                <img
                  className='navImg'
                  src={cartImg}
                  alt='A pot of macaroni.'
                />{' '}
                CART{' '}
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
