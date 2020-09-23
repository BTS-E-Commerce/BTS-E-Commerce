//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

const { getAllReviews, createReview, updateReview, deleteReview } = require('../index');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~
//* Initializes the starting/default reviews.
async function initializeReviews() {
  try {
    await createReview(3, 2, {
      content: 'This was sooooo good and cheesy',
      rating: '10',
    });

    await createReview(1, 2, {
      content: 'TERRIBLE. Do not order',
      rating: '0',
    });

    await createReview(2, 3, {
      content: 'Ehh, enjoyable',
      rating: '6',
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

    console.log('Testing updateReview..');
    const updatedReview = await updateReview(1, { content: "This sucked. What a waste of time...", rating: 1 });
    console.log('Sucessfully tested updateReview..', updatedReview);

    console.log('Testing deleteReview..');
    const deletedReview = await deleteReview(1);
    console.log('Sucessfully tested deleteReview..', deletedReview);

    console.log('Testing afterDeleteReviews..');
    const afterDeleteReviews = await getAllReviews();
    console.log('Sucessfully tested afterDeleteReviews..', afterDeleteReviews);
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
