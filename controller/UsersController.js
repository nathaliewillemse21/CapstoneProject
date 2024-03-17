import express from 'express';
import bodyParser from 'body-parser';
import { users } from '../model/index.js';
import { verifyToken } from '../middleware/AuthenticateUser.js';
const userRouter = express.Router();
// fetch users
userRouter.get('/', (req, res) => {
  try {
    users.fetchUsers(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to retrieve user',
    });
  }
});
//Fetch user

userRouter.get('/:id', (req, res) => {
  try {
    users.fetchUser(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to retrieve a user',
    });
  }
});
//Add a user
userRouter.post('/register', bodyParser.json(), (req, res) => {
  try {
    users.createUser(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'failed to create user',
    });
  }
});

// Delete a user
userRouter.delete('/delete/:id', bodyParser.json(), (req, res) => {
  try {
    users.deleteUser(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to delete a user.',
    });
  }
});
// Update a user

userRouter.patch('/update/:id', bodyParser.json(), (req, res) => {
  try {
    users.updateUser(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to update a user',
    });
  }
});

// Log user in

userRouter.post('/login', bodyParser.json(), (req, res) => {
  try {
    users.login(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to log in',
    });
  }
});

export { userRouter, express };
