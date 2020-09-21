//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
module.exports = {
  ...require('./client'),
  ...require('./users'),
  ...require('./products'),
  ...require('./categories'),
  ...require('./product_categories'),
  ...require('./orders'),
  ...require('./order_products'),
  ...require('./reviews'),
};
