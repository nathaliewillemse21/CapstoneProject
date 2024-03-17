import express from 'express';
import bodyParser from 'body-parser';
import { Products, Users } from '../model/index.js';

const userRouter = express.Router();

const userInstance = new Users(); // Create an instance of Products

userRouter.get('/', (req, res) => {
  try {
    userInstance.fetchUsers(req, res); // Call fetchProducts on the instance
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to retrieve products',
    });
  }
});

userRouter.get('/:id', (req, res) => {
  try {
    userInstance.fetchUser(req, res); // Call fetchProduct on the instance
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to retrieve a user',
    });
  }
});

userRouter.post('/register', bodyParser.json(), (req, res) => {
  try {
    userInstance.addUser(req, res); // Call addProduct on the instance
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to add new user',
    });
  }
});

userRouter.delete('/delete/:id', bodyParser.json(), (req, res) => {
  try {
    userInstance.deleteUser(req, res); // Call deleteProduct on the instance
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to delete a user.',
    });
  }
});

userRouter.patch('/update/:id', bodyParser.json(), (req, res) => {
  try {
    userInstance.updateUser(req, res); // Call updateProduct on the instance
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to update a user',
    });
  }
});

export { Users };
