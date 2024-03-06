import express from 'express';
import bodyParser from 'body-parser';
import { users } from '../model/index.js';
import { verifyToken } from '../middleware/AuthenticateUser.js';
const userRouter = express.Router();

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

userRouter.post('/register', bodyParser.json(), (req, res) => {
  try {
    users.addUser(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'failed to create user',
    });
  }
});


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


userRouter.post('/login', bodyParser.json(), async(req, res) => {
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
