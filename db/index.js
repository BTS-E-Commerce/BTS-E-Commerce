//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
  ...require('./users'),
  ...require('./products'),
  ...require('./categories'),
  ...require('./product_categories'),
  ...require('./orders'),
  ...require('./order_products'),
  ...require('./reviews'),

  //For some reason this doesn't work but I'm keeping itanywa to troubleshoot later
  // ...require('./init_categories'),
  // ...require('./init_orders'),
  // ...require('./init_products'),
  // ...require('./init_reviews'),
  // ...require('./init_users'),
};
