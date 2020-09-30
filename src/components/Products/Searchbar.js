import React, { useState } from 'react';

const Searchbar = ({ products, setProducts }) => {
  const [searchName, setName] = useState('');
  const [searchDescription, setDescription] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const searchedProducts = products.map((product) => filterProducts(product));

    if (searchedProducts) {
      setProducts(searchedProducts);
    }
  };

  const filterProducts = (product) => {
    const { name, description } = product;
    let subString = '';
    let stringPos = 0;
    if (searchName) {
      console.log('searchName', searchName, 'productString', name);
      for (let i = 0; i < name.length; i++) {
        if (name[i] === searchName[stringPos]) {
          subString += name[i];
          console.log('updatedSubString', subString, 'name[i]', name[i]);
          stringPos++;
          if (subString.length == searchName.length) return true;
        } else {
          subString = '';
          stringPos = 0;
        }
      }
      return false;
    } else if (searchDescription) {
      console.log(
        'searchDescription',
        searchDescription,
        'productString',
        description
      );
      for (let i = 0; i < description.length; i++) {
        if (description[i] === searchDescription[stringPos]) {
          subString += description[i];
          console.log(
            'updatedSubString',
            subString,
            'description[i]',
            description[i]
          );
          stringPos++;
          if (subString.length == searchDescription.length) return true;
        } else {
          subString = '';
          stringPos = 0;
        }
      }
      return false;
    }
  };

  return (
    <div id='searchBarContainer'>
      <fieldset className='searchByName'>
        <input
          name='searchName'
          type='text'
          placeholder='Search By Name'
          value={searchName}
          onChange={handleNameChange}
        />
      </fieldset>
      <fieldset className='searchByDescription'>
        <input
          name='searchDescription'
          type='text'
          placeholder='Search By Description'
          value={searchDescription}
          onChange={handleDescriptionChange}
        />
      </fieldset>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Searchbar;
