import React from 'react';
import { ProductCard, NewProductForm, Searchbar } from './Products/index';

import { CategoryList } from './Account/Admin/index';
import { deleteProduct, createProduct } from '../api/index';

// import './App.css';

const Content = ({ products, setProducts, addProductToCart, categories }) => {
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
    console.log(newProduct);
    let { price } = newProduct.product;
    newProduct.product.price = price * 100;

    const { product } = await createProduct(newProduct);
    setProducts([...products, product]);
  };

  return (
    <div id='content'>
      <NewProductForm products={products} setProducts={setProducts} categories={categories} createProduct={onProductCreate} />
      <Searchbar products={products} setProducts={setProducts} />
      {products.map((product) => (
        <ProductCard
          categories={categories}
          products={products}
          setProducts={setProducts}
          onDelete={onProductDelete(product.id)}
          key={product.id}
          product={product}
          onAddToOrder={addProductToCart(
            product.id,
            product.currentPrice,
            product.inventory
          )}
        />
      ))}
      <CategoryList />
    </div>
  );
};

export default Content;
