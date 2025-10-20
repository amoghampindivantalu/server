const express = require('express');
const router = express.Router();
const { 
  getAllProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/adminController');

// Route to get all products and add a new product
router.route('/products')
  .get(getAllProducts)
  .post(addProduct);

// Route to update and delete a specific product by its ID
router.route('/products/:id')
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;