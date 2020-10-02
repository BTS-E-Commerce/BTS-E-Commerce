import React, { useState } from 'react';

import './Products.css';

const NewProductForm = ({ products, setProducts, categories, createProduct }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [inventory, setInventory] = useState(0);
  const [price, setPrice] = useState(0);
  const [sale, setSale] = useState(false);
  const [category, setCategory] = useState({ id: 1, name: 'none' });
  // const [categories, setCategories] = useState([]);

  console.log(categories);

  async function handleSubmit(event) {
    event.preventDefault();

    createProduct({ product: { name, description, imageUrl, inventory, price, sale }, categories: [category] });
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };
  const handleInventoryChange = (event) => {
    setInventory(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleSaleChange = (event) => {
    setSale(event.target.value);
  };
  const handleCategoryChange = (event) => {
    const [chosenCategory] = categories.filter((productCategory) => productCategory.name == event.target.value);
    setCategory(chosenCategory);
  };

  //Categories should come from DB, not be hard coded in like this example.
  return (
    <div id='newProductForm'>
      <h1>Create New Product</h1>
      <form className='newProductForm' onSubmit={handleSubmit}>
        <label htmlFor='nameForm'>Name:</label>
        <input
          className='nameForm'
          type='text'
          name='name'
          value={name}
          onChange={handleNameChange}
        />
        <label htmlFor='descriptionForm'>Description:</label>
        <textarea
          className='descriptionForm'
          type='text'
          name='description'
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
        <label htmlFor='image-urlForm'>Image URL:</label>
        <input
          className='image-urlForm'
          type='text'
          name='image-url'
          value={imageUrl}
          onChange={handleImageUrlChange}
        />
        <label htmlFor='inventoryForm'>Inventory:</label>
        <input
          className='inventoryForm'
          type='number'
          name='inventory'
          value={inventory}
          onChange={handleInventoryChange}
        />
        <label htmlFor='priceForm'>Price:</label>
        <input
          className='priceForm'
          type='number'
          name='price'
          value={price}
          onChange={handlePriceChange}
        />

        <div className='salesContainer'>
          <label htmlFor='salesForm'>On Sale:</label>
          <input
            id='salesForm'
            type='checkbox'
            name='Sale'
            value={sale}
            onChange={handleSaleChange}
          />
        </div>
        {categories === undefined ? '' :
          <div className='categoriesContainer'>
            <label htmlFor='categoriesForm'>Choose a Category:</label>
            <select className='categoriesForm' name='categories' value={category === undefined ? '' : category.name} onChange={handleCategoryChange}>
              {categories.map(category => (
                <option
                  key={category.id}
                  data-id={category.id}
                  value={category.name} >
                  {(category.name[0]).toUpperCase()}
                  {(category.name).slice(1)}
                </option>
              ))}
            </select>
          </div>
        }


        <input type='submit' value='Submit'></input>
      </form>
    </div>
  );
};

export default NewProductForm;
