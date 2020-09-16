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
  ...require('./reviews')
}