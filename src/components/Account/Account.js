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
    NavLink
} from 'react-router-dom';

import { OrderHistory } from './OrderHistory/index'

import { Admin, EditUserForm } from './Admin/index'

import { updateUser } from '../../api/index'

import accountImg from '../images/granmacaccount.png'

import './Account.css';

const Account = (props) => {
    const { usersOrders, orders, setOrders, ongoingOrder, setOngoingOrder, currentUser, setCurrentUser, categories, setCategories } = props;
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
        <div id='accountContainer'>
            <img
                className='accountImg'
                src={accountImg}
                alt="A grandma's head with macaroni for eyes."
            />
            <h1>ACCOUNT</h1>
            {currentUser.username !== 'guest'
                ? <h2>Welcome to your account, {currentUser.username}</h2>
                : <div id='accountWelcome'>
                    <h2>Grandma Mac is always happy to sense a new customer!</h2><p>Login or Register to see personalized account information and keep track of your Mac!</p>
                </div>}


            {currentUser.admin === true
                ? <p>You are an admin.</p>
                : ''
            }
            <div id='accountNavBar'>
            </div>
            {currentUser.admin === true
                ? <Admin
                    categories={categories}
                    setCategories={setCategories}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    setOngoingOrder={setOngoingOrder}
                />
                : ''
            }

            {currentUser.username !== 'guest' && currentUser.admin !== true
                ? <div className='accountInformation'>
                    <OrderHistory usersOrders={usersOrders} />
                    <EditUserForm setOngoingOrder={setOngoingOrder} setCurrentUser={setCurrentUser} currentUser={currentUser} />
                </div>
                : ''}

        </div>

    )
}

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
export default Account;