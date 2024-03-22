import express from 'express';
import bodyParser from 'body-parser';
import { cart } from '../model/index.js'; // Corrected import

const cartRouter = express.Router();
const cart = new Cart(); // Instantiating a new Cart object

// Route to add a product to the cart
cartRouter.post('/addProduct', bodyParser.json(), async (req, res) => {
  try {
    await cart.addProduct(req.body);
    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Failed to add product to cart' });
  }
});

export { cartRouter };
