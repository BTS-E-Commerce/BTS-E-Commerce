import React, { useState } from 'react';

import { updateProduct } from '../../api/index'

const EditProductFrom = ({ product, products, setProducts, categories, createProduct }) => {
    const [name, setName] = useState(product === undefined ? '' : (product.name));
    const [description, setDescription] = useState(product === undefined ? '' : (product.description));
    const [imageUrl, setImageUrl] = useState(product === undefined ? '' : (product.image));
    const [inventory, setInventory] = useState(product === undefined ? '' : product.inventory);
    const [price, setPrice] = useState(product === undefined ? '' : product.currentPrice);
    const [sale, setSale] = useState(product === undefined ? '' : product.sale);
    const [category, setCategory] = useState(product === undefined ? '' : product.categories[0]);

    async function handleSubmit(event) {
        event.preventDefault();

        const { updatedProduct } = await updateProduct(product.id, { name, description, imageUrl, inventory, price, sale, categories: [category] });
        const removeIndex = products.findIndex(removeProduct => removeProduct.id === product.id)
        products.splice(removeIndex, 1, updatedProduct);

        setProducts([...products]);
    }

    //Grab all of these values from the product object when clicked.
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
    return (
        <div>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name:</label>
                <input
                    className='edit-name'
                    type='text'
                    name='name'
                    value={name}
                    onChange={handleNameChange}
                />
                <label htmlFor='description'>Description:</label>
                <input
                    className='edit-description'
                    type='text'
                    name='description'
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <label htmlFor='image-url'>Image URL:</label>
                <input
                    className='edit-image-url'
                    type='text'
                    name='image-url'
                    value={imageUrl}
                    onChange={handleImageUrlChange}
                />
                <label htmlFor='inventory'>Inventory:</label>
                <input
                    className='edit-inventory'
                    type='number'
                    name='inventory'
                    value={inventory}
                    onChange={handleInventoryChange}
                />
                <label htmlFor='price'>Price:</label>
                <input
                    className='edit-price'
                    type='number'
                    name='price'
                    value={price}
                    onChange={handlePriceChange}
                />
                <label>On Sale:</label>
                <input
                    className='edit-sale'
                    type='checkbox'
                    name='Sale'
                    value={sale}
                    onChange={handleSaleChange}
                />
                {categories === undefined ? '' :
                    <div className='categoriesContainerForm'>
                        <label htmlFor='categories'>Choose a Category:</label>
                        <select className='edit-categories' name='categories' value={category === undefined ? '' : category.name} onChange={handleCategoryChange}>
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


    )
}

export default EditProductFrom;