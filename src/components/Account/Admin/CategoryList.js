//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useState } from 'react';
import { createCategory, deleteCategory } from '../../../api';

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

  async function onCategoryDeleteEvent(event) {
    event.preventDefault();
    console.log('delete category clicked');
    const categoryId = event.target.value;
    await deleteCategory(categoryId);
    console.log('before: ', categories);
    console.log('categoryId: ', categoryId);
    setCategories(
      categories.filter((category) => categoryId != console.log(category.id))
    );

    console.log('after: ', categories);
  }

  //~~~~~~~~~~~~~~~~~~~
  //~~~~~~ JSX ~~~~~~~~
  //~~~~~~~~~~~~~~~~~~~
  return (
    <div>
      <h1>Categories</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='add-category'>New Category:</label>
        <input
          type='text'
          name='add-category'
          value={newCategory}
          onChange={handleNewCategory}
        />
        <button>Add New Category</button>
      </form>

      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name[0].toUpperCase()}
            {category.name.slice(1)}
            {/* <button>Edit Category</button> */}
            <button value={category.id} onClick={onCategoryDeleteEvent}>
              Delete Category
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

export default CategoryList;
