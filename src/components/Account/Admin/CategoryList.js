//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useState } from 'react';
import { createCategory, deleteCategory, getAllProducts } from '../../../api';
import { CategoryCard } from './index';

import './Admin.css';

const CategoryList = ({ categories, setCategories }) => {
  //~~~~~~~~~~~~~~~~~~~
  //~~~~~ EFFECTS ~~~~~
  //~~~~~~~~~~~~~~~~~~~
  const [newCategory, setNewCategory] = useState();

  //~~~~~~~~~~~~~~~~~~~
  //~~~~ FUNCTIONS ~~~~
  //~~~~~~~~~~~~~~~~~~~
  async function handleSubmit(event) {
    event.preventDefault();
    if (!newCategory || newCategory === undefined) {
      alert('please enter a valid category');
      return;
    }

    const category = await createCategory(newCategory);

    setCategories([...categories, category]);
    setNewCategory('');
  }

  const handleNewCategory = (event) => {
    console.log(event.target.value);
    setNewCategory(event.target.value);
  };

  const onDelete = (id) =>
    async function () {
      await deleteCategory(id);
      setCategories(categories.filter((category) => id !== category.id));
      // window.location.reload();
      // await getAllProducts();
      // const newProducts = products.filter((product) => )
    };

  //~~~~~~~~~~~~~~~~~~~
  //~~~~~~ JSX ~~~~~~~~
  //~~~~~~~~~~~~~~~~~~~
  return (
    <div id='categoriesListContainer'>
      <form id='adminNewCategory' onSubmit={handleSubmit}>
        <label htmlFor='add-category'>New Category:</label>
        <input
          type='text'
          name='add-category'
          value={newCategory}
          onChange={handleNewCategory}
        />
        <button>Add New Category</button>
      </form>
      <ul id='categoriesContainer'>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onDelete={onDelete(category.id)}
          />
        ))}
      </ul>
    </div>
  );
};

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

export default CategoryList;
