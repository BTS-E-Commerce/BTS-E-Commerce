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

//# Gets all reviews by user id.
async function getAllReviewsByUserId({ id }) {
  try {
    const { rows: reviews } = await client.query(
      `
      SELECT *
      FROM reviews
      WHERE "userId"=$1;
      `, [id]);

    return reviews;
  } catch (error) {
    throw error;
  }
}

//-- Create Functions --
//# Creates reviews
async function createReview(productId, userId, { content, rating }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
      INSERT INTO reviews("productId", "userId", content, rating)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ("productId", "userId") DO NOTHING;
      `,
      [productId, userId, content, rating]
    );

    return review;
  } catch (error) {
    throw error;
  }
}

//# Update review.
async function updateReview(reviewId, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');

  if (setString.length === 0) {
    return;
  }

  try {
    await client.query(`
      UPDATE reviews
      SET ${setString}
      WHERE id=${reviewId}
      RETURNING *;
    `, Object.values(fields));

    const { rows: [review] } = await client.query(`
      SELECT *
      FROM reviews
      WHERE id=$1;
    `, [reviewId]);

    return review;
  } catch (error) {
    throw error;
  }
}
//# Delete review.
async function deleteReview(reviewId) {
  try {
    //I think we should delete the review from the user object and product object on the front end
    //so we don't make another call to the server.

    //Delete from reviews
    const { rows: [review] } = await client.query(`
      DELETE
      FROM reviews
      WHERE id=$1
      RETURNING *;
    `, [reviewId]);

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
  getAllReviewsByUserId,
  createReview,
  updateReview,
  deleteReview
};
