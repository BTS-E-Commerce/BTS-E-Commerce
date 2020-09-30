import React, { useState } from 'react';

const NewProductForm = ({ createProduct }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [inventory, setInventory] = useState(0);
  const [price, setPrice] = useState(0);
  const [sale, setSale] = useState(false);
  // const [categories, setCategories] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    createProduct({ name, description, imageUrl, inventory, price, sale });
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

  //Categories should come from DB, not be hard coded in like this example.
  return (
    <div>
      <h1>Create New Product Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name:</label>
        <input
          id='name'
          type='text'
          name='name'
          value={name}
          onChange={handleNameChange}
        />
        <label htmlFor='description'>Description:</label>
        <input
          id='description'
          type='text'
          name='description'
          value={description}
          onChange={handleDescriptionChange}
        />
        <label htmlFor='image-url'>Image URL:</label>
        <input
          id='image-url'
          type='text'
          name='image-url'
          value={imageUrl}
          onChange={handleImageUrlChange}
        />
        <label htmlFor='inventory'>Inventory:</label>
        <input
          id='inventory'
          type='number'
          name='inventory'
          value={inventory}
          onChange={handleInventoryChange}
        />
        <label htmlFor='price'>Price:</label>
        <input
          id='price'
          type='number'
          name='price'
          value={price}
          onChange={handlePriceChange}
        />
        <label>On Sale:</label>
        <input
          id='sale'
          type='checkbox'
          name='Sale'
          value={sale}
          onChange={handleSaleChange}
        />
        <label htmlFor='categories'>Choose a Category:</label>
        <select id='categories' name='categories'>
          <option value='oven'>Oven</option>
          <option value='baked'>Baked</option>
          <option value='oven'>Cheesy</option>
        </select>
        <input type='submit' value='Submit'></input>
      </form>
    </div>
  );
};

export default NewProductForm;
