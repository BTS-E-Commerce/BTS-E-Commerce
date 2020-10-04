//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React from 'react';

import { UsersList, CategoryList } from './index';
import { deleteCategory } from '../../../api';

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
    <div>
      <h1>Admin Actions</h1>
      <UsersList
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setOngoingOrder={setOngoingOrder}
      />
      <CategoryList categories={categories} setCategories={setCategories} />
    </div>
  );
};
//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
export default Admin;
