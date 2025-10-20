// adminController.js

const Product = require('../models/productModel');

/**
 * Helper function to format product data, converting price strings to numbers.
 * This ensures the API response is always in the correct format for the frontend.
 */
const formatProductResponse = (product) => {
  const productJson = product.toJSON();
  return {
    ...productJson,
    basePrice: parseFloat(productJson.basePrice),
    price250g: productJson.price250g ? parseFloat(productJson.price250g) : null,
    price500g: productJson.price500g ? parseFloat(productJson.price500g) : null,
    price1kg: productJson.price1kg ? parseFloat(productJson.price1kg) : null,
  };
};

// @desc    Get all products for the admin dashboard
// @route   GET /api/admin/products
exports.getAllProducts = async (req, res) => {
  try {
    const productsFromDB = await Product.findAll({ order: [['createdAt', 'DESC']] });
    // Format each product before sending
    const products = productsFromDB.map(formatProductResponse);
    res.status(200).json(products);
  } catch (error) {
    console.error('API Error in getAllProducts:', error);
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// @desc    Add a new product
// @route   POST /api/admin/products
exports.addProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    // Format the new product before sending the response
    res.status(201).json(formatProductResponse(newProduct));
  } catch (error) {
    console.error('API Error in addProduct:', error);
    res.status(400).json({ message: 'Error adding product', error });
  }
};

// @desc    Update a product by ID
// @route   PUT /api/admin/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const [updated] = await Product.update(req.body, { where: { id: productId } });
    if (updated) {
      const updatedProduct = await Product.findByPk(productId);
      // Format the updated product before sending the response
      res.status(200).json(formatProductResponse(updatedProduct));
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('API Error in updateProduct:', error);
    res.status(400).json({ message: 'Error updating product', error });
  }
};

// @desc    Delete a product by ID
// @route   DELETE /api/admin/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('API Error in deleteProduct:', error);
    res.status(500).json({ message: 'Error deleting product', error });
  }
};