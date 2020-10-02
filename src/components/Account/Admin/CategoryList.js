//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useEffect, useState } from 'react';

const CategoryList = ({ categories, setCategories }) => {
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
      <h1>Categories</h1>
      <button>Add New Category</button>
      <ul>
        {categories.map((category) => (
          <li>
            {(category.name[0]).toUpperCase()}
            {(category.name).slice(1)}
            <button>Edit Category</button>
            <button>Delete Category</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;


//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~