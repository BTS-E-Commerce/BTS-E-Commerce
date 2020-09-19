//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
const { client } = require('./client');

//~~~~~~~~~~~~~~~~~~~
//~~~~ FUNCTIONS ~~~~
//~~~~~~~~~~~~~~~~~~~

//-- Get Functions --
//# Gets all reviews from exotic-db.
async function getAllReviews() {
  try {
    const { rows: reviews } = await client.query(
      `
      SELECT *
      FROM reviews;
      `
    );

    return reviews;
  } catch (error) {
    throw error;
  }
}

//# Gets all reviews by id

//-- Create Functions --
//# Creates reviews
async function createReview({ productId, userId, content, rating, date }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
      INSERT INTO reviews("productId", "userId", content, rating, date)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT ("productId", "userId") DO NOTHING;
      `,
      [productId, userId, content, rating, date]
    );

    return review;
  } catch (error) {
    throw error;
  }
}

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
  getAllReviews,
  createReview,
};
