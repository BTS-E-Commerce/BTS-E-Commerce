import React from 'react';
import { ProductCard, NewProductForm, Searchbar } from './Products/index';
import { CategoryList } from './Account/Admin/index';
import { deleteProduct, createProduct } from '../api/index';

import './App.css';

const Content = ({ products, setProducts, addProductToCart }) => {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   getAllProducts()
  //     .then((result) => {
  //       setProducts(result.products);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const onProductDelete = (id) =>
    async function () {
      await deleteProduct(id);
      setProducts(products.filter((product) => id !== product.id));
    };

  const onProductCreate = async function (newProduct) {
    const { product } = await createProduct(newProduct, [
      { id: 1, name: 'baked' },
    ]);
    setProducts([...products, product]);
  };

  return (
    <div id='content'>
      <NewProductForm createProduct={onProductCreate} />
      <Searchbar products={products} setProducts={setProducts} />
      {products.map((product) => (
        <ProductCard
          onDelete={onProductDelete(product.id)}
          key={product.id}
          product={product}
          onAddToOrder={addProductToCart(product.id, product.currentPrice)}
        />
      ))}
      <CategoryList />
    </div>
  );
};

export default Content;
