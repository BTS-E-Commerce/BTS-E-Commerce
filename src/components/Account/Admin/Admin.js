//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React from 'react';

import { UsersList, CategoryList } from './index';
import { deleteCategory } from '../../../api';

import './Admin.css';

const Admin = ({
  categories,
  setCategories,
  currentUser,
  setCurrentUser,
  setOngoingOrder,
}) => {
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
    <div id='adminActionsContainer'>
      <h1>Admin Actions</h1>
      <div id='adminActions'>
        <UsersList
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setOngoingOrder={setOngoingOrder}
        />
        <CategoryList categories={categories} setCategories={setCategories} />
      </div>
    </div>
  );
};
//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
export default Admin;
