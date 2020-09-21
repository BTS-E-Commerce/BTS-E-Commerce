import React, { useEffect, useState } from 'react';

import { getAllCategories } from '../api/categories';

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
        {categories.map((category) => (
          <span>
            <li>{category.id}</li>
            <li>{category.name}</li>
          </span>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
