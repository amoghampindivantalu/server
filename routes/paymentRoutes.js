const express = require('express');
const router = express.Router();
const { 
  getAllOrders, 
  createOrder,
  updateOrderStatus,
  deleteOrder // <-- Import the new delete function
} = require('../controllers/paymentController');

// Routes for getting all orders and creating a new one
router.route('/orders')
  .get(getAllOrders)
  .post(createOrder);

// Routes for a specific order by ID
router.route('/orders/:id')
  .delete(deleteOrder); // <-- ADD this line to handle DELETE requests

// Route to update a specific order's status
router.route('/orders/:id/status')
  .put(updateOrderStatus);

module.exports = router;