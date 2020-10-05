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

import './Account.css';

const Account = ({ usersOrders, orders, setOrders, ongoingOrder, setOngoingOrder, currentUser, setCurrentUser, categories, setCategories }) => {
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
            <h1>AccountInfo</h1>
            <h2>Welcome to your account, {currentUser.username}</h2>
            {currentUser.admin === false
                ? ''
                : <p>You are an admin.</p>
            }
            <div id='accountNavBar'>
            </div>
            {currentUser.admin === false
                ? ''
                :
                <Admin
                    categories={categories}
                    setCategories={setCategories}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    setOngoingOrder={setOngoingOrder}
                />
            }

            {currentUser.username !== 'guest'
                ? <div className='account-information'>
                    <OrderHistory usersOrders={usersOrders} />
                    {currentUser.admin === false
                        ? <EditUserForm setOngoingOrder={setOngoingOrder} setCurrentUser={setCurrentUser} currentUser={currentUser} />
                        : ''}

                </div>
                : 'Register or Sign in to see your order history.'}

        </div>

    )
}

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
export default Account;