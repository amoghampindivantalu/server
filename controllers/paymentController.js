const Order = require('../models/orderModel');

// @desc    Get all orders
// @route   GET /api/payment/orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json(orders);
  } catch (error) {
    console.error('API Error in getAllOrders:', error);
    res.status(500).json({ message: 'Error fetching orders', errorDetails: error });
  }
};

// @desc    Create a new order
// @route   POST /api/payment/orders
exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('API Error creating order:', error); 
    res.status(400).json({ 
      message: 'Error creating order.', 
      errorDetails: error.errors || error 
    });
  }
};

// @desc    Update order status
// @route   PUT /api/payment/orders/:id/status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['pending', 'completed', 'failed', 'shipped', 'delivered', 'cancelled'];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid or missing status value.' });
    }

    const [updated] = await Order.update({ status }, { where: { id: id } });

    if (updated) {
      const updatedOrder = await Order.findByPk(id);
      res.status(200).json(updatedOrder); // Return the updated order object
    } else {
      res.status(404).json({ message: 'Order not found.' });
    }
  } catch (error) {
    console.error('API Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status.', errorDetails: error });
  }
};

// --- NEW: Function to delete an order ---
// @desc    Delete an order by ID
// @route   DELETE /api/payment/orders/:id
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.destroy({
      where: { id: id }
    });

    if (deleted) {
      res.status(200).json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('API Error deleting order:', error);
    res.status(500).json({ message: 'Error deleting order', errorDetails: error });
  }
};