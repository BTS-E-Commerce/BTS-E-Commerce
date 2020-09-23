//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

const { getAllReviews, createReview } = require('../index');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~
//* Initializes the starting/default reviews.
async function initializeReviews() {
  try {
    await createReview({
      productId: '3',
      userId: '2',
      content: 'This was sooooo good and cheesy',
      rating: '10',
      date: '09/20/20',
    });

    await createReview({
      productId: '1',
      userId: '2',
      content: 'TERRIBLE. Do not order',
      rating: '0',
      date: '09/20/20',
    });

    await createReview({
      productId: '2',
      userId: '3',
      content: 'Ehh, enjoyable',
      rating: '6',
      date: '09/20/20',
    });
  } catch (error) {
    console.log(error);
  }
}

async function testReviewFunctions() {
  try {
    console.log('Reviews table testing...');

    console.log('Testing getAllReviews..');
    const reviews = await getAllReviews();
    console.log('Sucessfully tested getAllReviews..', reviews);
  } catch (error) {
    console.log(error);
  }
}

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
  initializeReviews,
  testReviewFunctions,
};
