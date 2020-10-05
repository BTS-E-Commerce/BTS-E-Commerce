import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/products';

const Searchbar = ({ products, setProducts, categories }) => {
  const [searchValue, setValue] = useState('');
  const [originalProducts, setOriginalProducts] = useState([]);

  console.log(originalProducts);

  useEffect(() => {
    console.log(products);
    setOriginalProducts(products);
  }, []);

  const handleSearchChange = (event) => {
    setValue(event.target.value);
  };

  const handleSearch = () => {
    setProducts(originalProducts);
    if (searchValue === '') {
      //#Should ideally also check for an entry of just spaces.
      return;
    }
    const searchedProducts = originalProducts.filter((product) =>
      searchProducts(product)
    );
    console.log("found products", searchedProducts);
    if (searchedProducts.length !== 0) {
      setProducts(searchedProducts);
    } else {
      alert('Sorry, Grandma Mac could not find any products related to your search.')
    }
  };

  const handleClear = () => {
    setProducts(originalProducts);
    setValue('');
  }

  const searchProducts = (product) => {
    let { name, description } = product;;
    const [category] = product.categories;
    name = name.toLowerCase();
    description = description.toLowerCase();
    category.name = category.name.toLowerCase();
    console.log("Category exists?", category !== undefined);
    console.log("Checking name...")
    let searchSuccess = false;
    if (name) {
      searchSuccess = name.includes(searchValue);
      if (searchSuccess === true) {
        console.log("Found name!")
        return true;
      } else if (description) {
        console.log("Checking description...")
        searchSuccess = description.includes(searchValue);
        if (searchSuccess === true) {
          console.log("Found description!")
          return true;
        }
        //# For some reason it never makes this check. I have no idea why.
      } else if (category.name) {
        console.log("Checking categories...")
        searchSuccess = category.name.includes(searchValue);
        if (searchSuccess) {
          console.log("Found category!")
          return true;
        }
      }
    } else {
      return false;
    }
  };

  return (
    <div id='searchBarContainer'>
      <fieldset className='searchByValue'>
        <input
          id='valueSearchField'
          name='searchValue'
          type='text'
          placeholder='Search Our Inventory...'
          value={searchValue}
          onChange={handleSearchChange}
        />
      </fieldset>
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
};

export default Searchbar;
