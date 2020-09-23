//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByName,
  getProductsBySale,
  updateProduct,
  deleteProduct,
} = require('../index');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~
//* Initializes the starting/default products. This may pull from some sort of api??
async function initializeProducts() {
  try {
    await createProduct(
      {
        name: 'Baked Mac N Cheese',
        description: 'Grammys special Thanksgiving Baked Mac N Cheese',
        image:
          'https://www.recipetineats.com/wp-content/uploads/2018/05/Baked-Mac-and-Cheese_2.jpg',
        inventory: '10',
        basePrice: '7',
        currentPrice: '5',
        sale: true,
        date: '09/15/20',
      },
      [
        { id: 2, name: 'oven' },
        { id: 1, name: 'baked' },
        { id: 4, name: 'cheesy' },
      ]
    );

    await createProduct(
      {
        name: 'Mac N Cheese Breadsticks',
        description:
          "It's not an official movie night at Grammys without the Mac Sticks!",
        image:
          'https://img.buzzfeed.com/video-api-prod/assets/5643fc670b714aefadf31991ed2f0f2f/BFV11184_MacnCheeseBreadsticks-Thumb1080SQ.jpg?resize=300:*&output-format=webp&output-quality=auto',
        inventory: '20',
        basePrice: '5',
        currentPrice: '3',
        sale: true,
        date: '09/17/20',
      },
      [
        { id: 7, name: 'special' },
        { id: 5, name: 'cheddar' },
        { id: 2, name: 'oven' },
      ]
    );

    await createProduct(
      {
        name: 'Vegan Mac N Cheese',
        description: 'Grammys special Mac for Auntie Sarah',
        image:
          'https://img.buzzfeed.com/video-api-prod/assets/d9fd07cb667d47288c03a873c76a3445/FB_1.jpg?resize=300:*&output-format=webp&output-quality=auto',
        inventory: '5',
        basePrice: '10',
        currentPrice: '10',
        sale: false,
        date: '09/10/2020',
      },
      [
        { id: 8, name: 'cheese' },
        { id: 6, name: 'vegan' },
        { id: 5, name: 'cheddar' },
      ]
    );
    console.log('Finished making products...');
  } catch (error) {
    console.log('Error creating initial products...');
    throw error;
  }
}

//# Tests the functions for the products table.
async function testProductFunctions() {
  try {
    console.log('Products Table Testing:');

    console.log('Testing getAllProducts...');
    const products = await getAllProducts();
    console.log('Successfully tested getAllProducts:', products);

    console.log('Testing getProductsById using product:', products[1].id);
    const productById = await getProductById(products[1].id);
    console.log('Successfully tested getProdctsById:', productById);

    console.log('Testing getProductByName using product:', products[2].id);
    const productByName = await getProductByName({
      name: 'Vegan Mac N Cheese',
    });
    console.log('Successfully tested getProductByName:', productByName);

    console.log('Testing getProductsBySale...');
    const productsBySale = await getProductsBySale();
    console.log('Successfully tested getProductsBySale:', productsBySale);

    console.log('Testing updateProduct using product:', products[2].id);
    const updatedProduct = await updateProduct(products[2].id, {
      name: 'Mac Bites',
      description: "Grammy's deep-fried Mac N Cheese balls",
      image:
        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F1463689679%2Ffried-mac-and-cheese-bites-420x420.jpg%3Fitok%3DMY0nk5At',
      inventory: '15',
      basePrice: '10',
      currentPrice: '5',
      sale: true,
      date: '09/18/2020',
      categories: ['bites', 'cheddar ', 'fried'],
    });
    console.log('Successfully tested updateProduct:', updatedProduct);

    console.log('Testing deleteProduct using product:', products[0].name);
    const deletedProduct = await deleteProduct(products[0].id);
    console.log('Successfully', deletedProduct);

    console.log('Products Table Testing Completed!');
  } catch (error) {
    console.log('Error running tests on products...');
    throw error;
  }
}
//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
  initializeProducts,
  testProductFunctions,
};
