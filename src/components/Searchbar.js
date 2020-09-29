import React, { useState } from 'react';
import { CategoryList } from './index';

const Searchbar = ({ products, setProducts }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    products.filter((product) => filterProducts(product));
  };

  const filterProducts = (product) => {
    if (product.name == name) {
      setProducts(product);
    } else if (product.description == description) {
      setProducts(product);
    } else {
      return (
        <div class='alert'>
          <span
            class='closebtn'
            onclick="this.parentElement.style.display='none';"
          >
            &times;
          </span>
          <p>
            <strong>Sad Mac's!</strong> Looks like Grandma hasn't tried that
            recipe yet, try back later!
          </p>
        </div>
      );
    }
  };
  return (
    <div id='searchBarContainer'>
      <fieldset class='searchByName'>
        <input
          name='name'
          type='text'
          placeholder='Search By Name'
          value={name}
          onChange={handleNameChange}
        />
      </fieldset>
      <fieldset class='searchByDescription'>
        <input
          name='name'
          type='text'
          placeholder='Search By Description'
          value={description}
          onChange={handleDescriptionChange}
        />
      </fieldset>
      <CategoryList />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Searchbar;
