//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
  NavLink,
} from 'react-router-dom';

import { OrderHistory } from './OrderHistory/index';

import { Admin, EditUserForm } from './Admin/index';

import { updateUser } from '../../api/index';

import accountImg from '../images/granmacaccount.png';

import './Account.css';

const Account = (props) => {
  const {
    usersOrders,
    orders,
    setOrders,
    ongoingOrder,
    setOngoingOrder,
    currentUser,
    setCurrentUser,
    categories,
    setCategories,
  } = props;
  console.log(props);
  //~~~~~~~~~~~~~~~~~~~
  //~~~~~~ STATE ~~~~~~
  //~~~~~~~~~~~~~~~~~~~

  //~~~~~~~~~~~~~~~~~~~
  //~~~~~ EFFECTS ~~~~~
  //~~~~~~~~~~~~~~~~~~~

  //~~~~~~~~~~~~~~~~~~~
  //~~~~ FUNCTIONS ~~~~
  //~~~~~~~~~~~~~~~~~~~

  //~~~~~~~~~~~~~~~~~~~
  //~~~~~~ JSX ~~~~~~~~
  //~~~~~~~~~~~~~~~~~~~
  return (
    <div className='accountContainer'>
      {currentUser.username !== 'guest' ? (
        ''
      ) : (
        <div id='accountWelcome'>
          <img
            className='accountImg'
            src={accountImg}
            alt="A grandma's head with macaroni for eyes."
          />
          <h2>Grandma Mac is always happy to sense a new customer!</h2>
          <p>
            <NavLink to='/login'>Login</NavLink> or{' '}
            <NavLink to='/register'>Register</NavLink> to see personalized
            account information and keep track of your Mac!
          </p>
        </div>
      )}
      <div id='accountNavBar'></div>
      {currentUser.admin === true ? (
        <div className='adminContainer'>
          <h2>Welcome to your account, {currentUser.username}</h2>
          <Admin
            categories={categories}
            setCategories={setCategories}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setOngoingOrder={setOngoingOrder}
          />
        </div>
      ) : (
        ''
      )}

      {currentUser.username !== 'guest' && currentUser.admin !== true ? (
        <div className='accountInformation'>
          <h2>Welcome to your account, {currentUser.username}</h2>
          <div class='userContent'>
            <OrderHistory usersOrders={usersOrders} />
            <EditUserForm
              setOngoingOrder={setOngoingOrder}
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
export default Account;
