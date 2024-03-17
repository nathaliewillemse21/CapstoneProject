import express from 'express';
import bodyParser from 'body-parser';
import { Products } from '../model/index.js';

const productsRouter = express.Router();

const productsInstance = new Products(); // Create an instance of Products

productsRouter.get('/', (req, res) => {
  try {
    productsInstance.fetchProducts(req, res); // Call fetchProducts on the instance
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to retrieve products',
    });
  }
});

productsRouter.get('/:id', (req, res) => {
  try {
    productsInstance.fetchProduct(req, res); // Call fetchProduct on the instance
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to retrieve a product',
    });
  }
});

productsRouter.post('/addProduct', bodyParser.json(), (req, res) => {
  try {
    productsInstance.addProduct(req, res); // Call addProduct on the instance
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to add new product',
    });
  }
});

productsRouter.delete('/delete/:id', bodyParser.json(), (req, res) => {
  try {
    productsInstance.deleteProduct(req, res); // Call deleteProduct on the instance
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to delete a product.',
    });
  }
});

productsRouter.patch('/update/:id', bodyParser.json(), (req, res) => {
  try {
    productsInstance.updateProduct(req, res); // Call updateProduct on the instance
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to update a product',
    });
  }
});

export { productsRouter, Products };
