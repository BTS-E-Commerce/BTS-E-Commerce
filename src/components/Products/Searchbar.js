import { async } from 'q';
import React, { useState } from 'react';
import { getAllProducts } from '../../api/products';

const Searchbar = ({ products, setProducts }) => {
  const [searchValue, setValue] = useState('');

  const handleSearchChange = (event) => {
    setValue(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const originalProducts = await getAllProducts();
      console.log('originalProducts', originalProducts.products);
      setProducts(originalProducts.products);
    } catch (error) {
      throw error;
    }
    console.log(products);
    const searchedProducts = products.filter((product) =>
      searchProducts(product)
    );
    if (searchedProducts) {
      setProducts(searchedProducts);
    }
  };

  const searchProducts = (product) => {
    const { name, description, categories } = product;
    let searchSuccess = name.includes(searchValue);
    if (searchSuccess) {
      return true;
    }
    if (description) {
      searchSuccess = description.includes(searchValue);
      if (searchSuccess) {
        return true;
      }
    }
  };

  return (
    <div id='searchBarContainer'>
      <fieldset className='searchByValue'>
        <input
          name='searchValue'
          type='text'
          placeholder='Search Our Inventory...'
          value={searchValue}
          onChange={handleSearchChange}
        />
      </fieldset>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Searchbar;
