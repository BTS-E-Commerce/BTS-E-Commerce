//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useEffect, useState } from 'react';

import { OrderHistory } from './OrderHistory/index'

import { Admin, EditUserForm } from './Admin/index'

import { updateUser } from '../../api/index'

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
        <div>
            <h1>AccountInfo</h1>
            <h2>Current user is: {currentUser.username}</h2>
            {currentUser.admin === false
                ? ''
                : <p>You are an admin.</p>
            }
            {currentUser.admin === false
                ? ''
                : <Admin
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