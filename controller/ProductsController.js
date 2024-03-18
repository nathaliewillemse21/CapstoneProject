import express from 'express';
import bodyParser from 'body-parser';
import { Products } from '../model/index.js';

const productsRouter = express.Router();

const productsInstance = new Products(); 

productsRouter.get('/', (req, res) => {
  try {
    productsInstance.fetchProducts(req, res); 
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to retrieve books',
    });
  }
});

productsRouter.get('/:id', (req, res) => {
  try {
    productsInstance.fetchProduct(req, res); 
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to retrieve a book',
    });
  }
});

productsRouter.post('/addProduct', bodyParser.json(), (req, res) => {
  try {
    productsInstance.addProduct(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to add new book',
    });
  }
});
productsRouter.delete('/delete/:id', bodyParser.json(), (req, res) => {
  try {
    productsInstance.deleteProduct(req, res); 
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to delete a book.',
    });
  }
});

productsRouter.patch('/update/:id', bodyParser.json(), (req, res) => {
  try {
    productsInstance.updateProduct(req, res); 
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to update a book',
    });
  }
});

export { productsRouter, Products };
