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
      [{ id: 2, name: 'oven' }]
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
      [{ id: 7, name: 'special' }]
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
      [{ id: 7, name: 'special' }]
    );

    await createProduct(
      {
        name: 'Breakfast Mac And Cheese',
        description:
          'Extra cheesy mac and cheese, with bacon bits thrown in and soft baked eggs on top for good measure',
        image:
          'https://img.huffingtonpost.com/asset/5a83285321000039006011a2.png?ops=scalefit_960_noupscale&format=webp',
        inventory: '20',
        basePrice: '15',
        currentPrice: '15',
        sale: false,
        date: '09/27/2020',
      },
      [{ id: 6, name: 'crunchy' }]
    );

    await createProduct(
      {
        name: 'Lobster Mac N Cheese',
        description: 'The Sea in the Cheese!',
        image:
          'https://img.huffingtonpost.com/asset/55a7fc101200002b00135271.jpeg?ops=scalefit_960_noupscale&format=webp',
        inventory: '3',
        basePrice: '25',
        currentPrice: '15',
        sale: true,
        date: '09/30/2020',
      },
      [{ id: 7, name: 'special' }]
    );

    await createProduct(
      {
        name: 'Fire-Grilled Sour Mac N Cheese',
        description:
          'Steamed thick acorn noodles with kola nut and oregano on a bed of steamed cabbage, cooked wild leek and mangos. Served with pepperjack, stout, rye bread, tangerine pie and fried eggs.',
        image:
          'https://midwestfoodieblog.com/wp-content/uploads/2020/02/FINAL-mexican-mac-and-cheese-1-3.jpg',
        inventory: '100',
        basePrice: '1500',
        currentPrice: '1500',
        sale: true,
      },
      [{ id: 2, name: 'baked' }]
    );

    await createProduct(
      {
        name: 'Grilled Fennel & Lime Mac',
        description:
          'Boiled lizard with vanilla, pili nuts and caramel with a salad of diced parsnip, fiddlehead and avocados.',
        image:
          'https://joyfoodsunshine.com/wp-content/uploads/2019/04/best-easy-homemade-mac-and-cheese-recipe-1-500x500.jpg',
        inventory: '100',
        basePrice: '2000',
        currentPrice: '2000',
        sale: true,
      },
      [{ id: 2, name: 'baked' }]
    );

    await createProduct(
      {
        name: 'Cooked Light Macaroni Crocodile',
        description:
          "The throbbing pain from their wound was enough to disorient them. Hazy, confused and weak in their knees they felt as if they could collapse under their own weight at any moment. It was exhausting and the pain took its toll on them. Tired, but unable to sleep and unable to stop it. The road ahead was a tough one and right now they weren't sure whether they were willing to walk it, let alone whether they were able.",
        image:
          'https://www.spendwithpennies.com/wp-content/uploads/2020/02/Cauliflower-Mac-and-Cheese-SpendWithPennies-8.jpg',
        inventory: '50',
        basePrice: '1000',
        currentPrice: '1000',
        sale: false,
      },
      [{ id: 5, name: 'cheesy' }]
    );

    await createProduct(
      {
        name: 'Sautéed Cinnamon Baked Mac',
        description:
          'Fried small flat rice noodles with chives, rosemary and cumin on a bed of sliced winter purslane, sliced sea kale and wolfberries. Served with manioc soup, fried eggs, red wine, focaccia and brined cream cheese.',
        image:
          'https://www.thechunkychef.com/wp-content/uploads/2018/02/Ultimate-Creamy-Baked-Mac-and-Cheese-feat-1-440x500.jpg',
        inventory: '10',
        basePrice: '700',
        currentPrice: '700',
        sale: false,
      },
      [{ id: 2, name: 'baked' }]
    );

    await createProduct(
      {
        name: 'Pecan and Walnut Molten Macaroni Cake',
        description:
          'Werecat tripe with orange peel and sumac on a bed of cooked beetroot, sauteed kumara and plums. Served with gabon nut pie and potato bread with jam.',
        image:
          'https://www.seasonsandsuppers.ca/wp-content/uploads/2013/01/mac-cheese-3.jpg',
        inventory: '40',
        basePrice: '1700',
        currentPrice: '1700',
        sale: false,
      },
      [{ id: 7, name: 'special' }]
    );

    await createProduct(
      {
        name: "Grandma's Special Onion and Mac Fritters",
        description:
          'If you encounter Grandma Mac at night do not approach her! While normally of temperate disposition, at night the moonlight causes such pain that its violent tendencies become exacerbated.',
        image:
          'https://www.wholesomeyum.com/wp-content/uploads/2017/06/www.wholesomeyum.com-cauliflower-mac-and-cheese-recipe-low-carb-keto-gluten-free-img_3715-1.jpg',
        inventory: '40',
        basePrice: '2500',
        currentPrice: '2500',
        sale: false,
      },
      [{ id: 6, name: 'cheddar' }]
    );

    await createProduct(
      {
        name: 'Almond Bombe: Grandma Style',
        description:
          'Tasty burgers made from lea bacon and minced lamb, served in a roll.',
        image:
          'https://www.wholesomeyum.com/wp-content/uploads/2017/06/www.wholesomeyum.com-cauliflower-mac-and-cheese-recipe-low-carb-keto-gluten-free-img_3715-1.jpg',
        inventory: '40',
        basePrice: '2300',
        currentPrice: '2300',
        sale: false,
      },
      [{ id: 5, name: 'cheesy' }]
    );

    await createProduct(
      {
        name: 'Cured Macaroni & Garlic Flatbread',
        description:
          'Steamed brown rice with bay leaves, tinda, marjoram, horse gram and gabon nut with a side of sliced chinese artichoke and mulberries. Served with soft boiled eggs, cloves and vanilla soup and aged gouda.',
        image:
          'https://www.thechunkychef.com/wp-content/uploads/2018/02/Ultimate-Creamy-Baked-Mac-and-Cheese-feat-1-440x500.jpg',
        inventory: '40',
        basePrice: '1600',
        currentPrice: '1600',
        sale: false,
      },
      [{ id: 3, name: 'oven' }]
    );

    await createProduct(
      {
        name: 'Mango Mac Mooncake',
        description:
          'Soft moans and grunts escaped their mouth. Tired and frustrated they wanted it all to be over and done with. Perhaps against their better judgment they swallowed the pain and continued onward, but taking at least some care to prevent making it worse.',
        image:
          'https://joyfoodsunshine.com/wp-content/uploads/2019/04/best-easy-homemade-mac-and-cheese-recipe-1-500x500.jpg',
        inventory: '40',
        basePrice: '1200',
        currentPrice: '1200',
        sale: false,
      },
      [{ id: 3, name: 'oven' }]
    );

    await createProduct(
      {
        name: 'Cheese and pancetta fusilli',
        description:
          'Fresh egg pasta in a sauce made from fresh cheese and smoked pancetta!',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSLJkJjksTRPftYeZyOjpurpdvxq0cvnQprng&usqp=CAU',
        inventory: '20',
        basePrice: '5000',
        currentPrice: '3000',
        sale: true,
      },
      [{ id: 10, name: 'boiled' }]
    );

    await createProduct(
      {
        name: 'Broccoli and bacon pasta',
        description:
          'Fresh egg pasta in a sauce made from fresh broccoli and lea bacon!',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSPjQ9JkHyiQO-mcqVjkDhFhhoWAspy-h__Bw&usqp=CAU',
        inventory: '50',
        basePrice: '10000',
        currentPrice: '7000',
        sale: true,
      },
      [{ id: 5, name: 'cheesy' }]
    );

    await createProduct(
      {
        name: 'Leek and spinach pasta',
        description:
          'Fresh egg pasta in a sauce made from baby leek and fresh spinach',
        image:
          'https://www.simplyrecipes.com/wp-content/uploads/2016/03/green-goddess-mac-cheese-horiz-a-1200.jpg',
        inventory: '15',
        basePrice: '15000',
        currentPrice: '15000',
        sale: false,
      },
      [{ id: 7, name: 'vegan' }]
    );

    await createProduct(
      {
        name: ' Cheese and chilli toastie',
        description:
          'Hot slices of bread filled with creamy cheese and red chilli Mac',
        image:
          'https://www.foodpeoplewant.com/wp-content/uploads/2009/11/Green-Chile-Mac-Cheese-1024x768.jpg',
        inventory: '20',
        basePrice: '6000',
        currentPrice: '3000',
        sale: true,
      },
      [{ id: 6, name: 'cheddar' }]
    );

    await createProduct(
      {
        name: ' Shepherd’s Mac Fusion!',
        description:
          "Grandma’s exclusive combination of her own Mac and Auntie M’s homestyle Shepherd's Pie!",
        image:
          'https://parade.com/wp-content/uploads/2018/02/cottage-pie-FEAT.jpg',
        inventory: '10',
        basePrice: '240000',
        currentPrice: '19000',
        sale: true,
      },
      [{ id: 8, name: 'special' }]
    );

    await createProduct(
      {
        name: 'Pasta and cheese pizza',
        description:
          'Deep pan pizza topped with campanelle pasta and vintage cheese',
        image:
          'https://www.hormel.com/getattachment/d5a2142f-da2a-432d-8a90-627099b3f827',
        inventory: '8',
        basePrice: '2000',
        currentPrice: '2000',
        sale: false,
      },
      [{ id: 3, name: 'oven' }]
    );

    await createProduct(
      {
        name: 'Cheese and stilton buns',
        description: 'Crumbly buns made with creamy cheese and stilton',
        image:
          'https://www.chewboom.com/wp-content/uploads/2019/03/Huddle-House-Introduces-New-Mac-Cheese-Bites-Welcomes-Back-Prime-Rib-Tips-678x381.jpg',
        inventory: '30',
        basePrice: '3500',
        currentPrice: '1000',
        sale: true,
      },
      [{ id: 4, name: 'crunchy' }]
    );

    await createProduct(
      {
        name: 'Mac Medley',
        description:
          'A light blend of elbow noodles and seasonal vegetables for an all natural mac selection',
        image:
          'https://www.gimmesomeoven.com/wp-content/uploads/2012/08/Roasted-Vegetable-Mac-and-Cheese-Recipe-1.jpg',
        inventory: '18',
        basePrice: '10000',
        currentPrice: '5000',
        sale: true,
      },
      [{ id: 4, name: 'vegan' }]
    );

    await createProduct(
      {
        name: 'Chili Mac Dogs',
        description:
          'Americas classing chili dog infused with Grandma’s original Mac!',
        image:
          'https://hips.hearstapps.com/del.h-cdn.co/assets/17/20/640x959/gallery-1495057199-delish-mac-cheese-dogs-1.jpg?resize=480:*',
        inventory: '50',
        basePrice: '5000',
        currentPrice: '3000',
        sale: true,
      },
      [{ id: 9, name: 'cheesy' }]
    );

    await createProduct(
      {
        name: 'Green Almonds',
        description:
          'Elbow pasta greens casserole with roasted almonds on top.',
        image:
          'https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2020/01/24/Food/Images/v-wkveg-greensmacncheese_074_leadweb.jpg?t=20170517',
        inventory: '6',
        basePrice: '16000',
        currentPrice: '16000',
        sale: false,
      },
      [{ id: 4, name: 'vegan' }]
    );

    await createProduct(
      {
        name: 'Waffle Mac',
        description:
          'Lunch for breakfast? Grandma says ‘Yes!’ with her take on chicken and waffles!',
        image:
          'https://hips.hearstapps.com/vidthumb/manual_upload/59efca72bbddbd7731689284/thumb_1508887159.png',
        inventory: '30',
        basePrice: '6000',
        currentPrice: '6000',
        sale: false,
      },
      [{ id: 4, name: 'crunchy' }]
    );

    await createProduct(
      {
        name: 'Mac-Attack',
        description:
          'Macaroni and Cheese Burger. Charbroiled and Topped with our Creamy Fried Macaroni and Cheese Balls and Cheddar Cheese Sauce. ',
        image:
          'https://www.coopercheese.com/wp-content/uploads/2017/10/Cooper-mac-and-cheese-burger-recipe-cheeseburgers-mobile.jpg',
        inventory: '50',
        basePrice: '4000',
        currentPrice: '4000',
        sale: false,
      },
      [{ id: 11, name: 'grilled’' }]
    );

    await createProduct(
      {
        name: 'Killer Mac and Cheese with Bacon',
        description:
          'Creamy Mac and cheese with not one, not two, but three different cheeses: cheddar, fontina and Parmesan.',
        image:
          'https://food.cld.sndimg.com/image/upload/w_2400/v1/fn_core_images/food/fullset/2014/2/7/1/FNM_030114-Killer-Mac-And-Cheese-With-Bacon-Recipe-h_s4x3.jpg',
        inventory: '100',
        basePrice: '2500',
        currentPrice: '2500',
        sale: true,
      },
      [{ id: 8, name: 'special' }]
    );

    await createProduct(
      {
        name: 'Flamin Hot Mac and Cheese',
        description:
          'Hot, spicy flavor packed into crunchy, cheesy snacks. Crunchy FLAMIN Cheese Flavored Snacks are full of flavor and made with real MAC N CHEESE.',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTsy3MofgffpqXLZo3zjYF5ya2HWfgE1TzANw&usqp=CAU',
        inventory: '100',
        basePrice: '5500',
        currentPrice: '5000',
        sale: true,
      },
      [{ id: 8, name: 'special' }]
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

    // console.log('Testing updateProduct using product:', products[2].id);
    // const updatedProduct = await updateProduct(products[2].id, {
    //   name: 'Mac Bites',
    //   description: "Grammy's deep-fried Mac N Cheese balls",
    //   image:
    //     'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F1463689679%2Ffried-mac-and-cheese-bites-420x420.jpg%3Fitok%3DMY0nk5At',
    //   inventory: '15',
    //   basePrice: '10',
    //   currentPrice: '5',
    //   sale: true,
    //   date: '09/18/2020',
    //   categories: ['bites'],
    // });
    // console.log('Successfully tested updateProduct:', updatedProduct);

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
