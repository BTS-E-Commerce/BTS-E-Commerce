import React, { useEffect, useState } from 'react';

import { getAllCategories } from '../../../api/index';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories()
      .then((response) => {
        setCategories(response.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        <select>
          {categories.map((category) => (
            <option key={category.id}>{category.name}</option>
          ))}
        </select>
      </ul>
    </div>
  );
};

export default CategoryList;
