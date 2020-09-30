//~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS/EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~
export { getAllCategories } from './categories';
export { getAllProducts, createProduct, updateProduct, deleteProduct } from './products';
export { getAllUsers, createUser } from './users';
export { getAllOrders, createOrder, addProductToOrder, updateOrder, updateOrderProduct, deleteOrder } from './orders';

//Maybe this should just be where we import/export all the api functions for use in componets?
