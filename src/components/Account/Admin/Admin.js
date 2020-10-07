//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { UsersList, CategoryList } from './index';
import { deleteCategory } from '../../../api';

import './Admin.css';

const Admin = (props) => {
  const {
    categories,
    setCategories,
    currentUser,
    setCurrentUser,
    setOngoingOrder,
  } = props;
  console.log(props);
  const [usersStatus, setUsersStatus] = useState(false);
  const [categoriesStatus, setCategoriesStatus] = useState(false);
  //~~~~~~~~~~~~~~~~~~~
  //~~~~~~ STATE ~~~~~~
  //~~~~~~~~~~~~~~~~~~~

  //~~~~~~~~~~~~~~~~~~~
  //~~~~~ EFFECTS ~~~~~
  //~~~~~~~~~~~~~~~~~~~

  //~~~~~~~~~~~~~~~~~~~
  //~~~~ FUNCTIONS ~~~~
  //~~~~~~~~~~~~~~~~~~~
  const showUsers = () => {
    setCategoriesStatus(false);
    setUsersStatus(!usersStatus);
  };
  const showCategories = () => {
    setUsersStatus(false);
    setCategoriesStatus(!categoriesStatus);
  };
  //~~~~~~~~~~~~~~~~~~~
  //~~~~~~ JSX ~~~~~~~~
  //~~~~~~~~~~~~~~~~~~~
  return (
    <div id='adminActionsContainer'>
      <h1>Admin Actions</h1>
      <div id='adminActionsNav'>
        <button onClick={showUsers}>Users</button>
        <button onClick={showCategories}>Categories</button>
        <button>
          <NavLink to='/404'>Test 404</NavLink>
        </button>
      </div>
      <div id='adminActions'>
        {usersStatus === true && categoriesStatus === false ? (
          <UsersList
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setOngoingOrder={setOngoingOrder}
          />
        ) : (
          ''
        )}
        {categoriesStatus === true && usersStatus === false ? (
          <CategoryList categories={categories} setCategories={setCategories} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
export default Admin;
