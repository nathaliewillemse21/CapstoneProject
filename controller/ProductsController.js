import express from 'express';
import bodyParser from 'body-parser';
import {books } from '../model/index.js';
const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
  try {
    books.fetchBooks(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to retrieve products',
    });
  }
});
productsRouter.get('/:id', (req, res) => {
  try {
    0;
    books.fetchBook(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to retrieve a book',
    });
  }
});
productsRouter.post('/addBook', bodyParser.json(), (req, res) => {
  try {
    books.addBook(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to add new book',
    });
  }
});

productsRouter.delete('/delete/:id', bodyParser.json(), (req, res) => {
  try {
    books.deleteBook(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to delete a book.',
    });
  }
});
productsRouter.patch('/update/:id', bodyParser.json(), (req, res) => {
  try {
    books.updateBook(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to update a book',
    });
  }
});

export { productsRouter };
