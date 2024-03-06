import { connection as db } from '../config/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import { createToken } from '../middleware/AuthenticateUser.js';

class Users {
  fetchUsers(req, res) {
    const qry = `
        SELECT UserID, FirstName, LastName, Email, Gender, Age
        FROM Users;
        `;
    db.query(qry, (err, results) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        results,
      });
    });
  }

  fetchUser(req, res) {
    const qry = `
        SELECT UserID, FirstName, LastName, Email, Gender, Age
        FROM Users
        WHERE UsersID = ${req.params.id};
        `;
    db.query(qry, (err, result) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        result: result[0],
      });
    });
  }
  addUser(req, res) {
    const qry = `
        INSERT INTO Users
        SET ?;`;
    db.query(qry, [req.body], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: 'New user added',
      });
    });
    db.query(qry, (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: 'New user added',
      });
    });
  }
  deleteUser(req, res) {
    const UsersID = req.params.id;
    if (!UsersID) {
      return res.status(400).json({ msg: 'UserID is required' });
    }
    const qry = `
            DELETE
            FROM Users
            WHERE UsersID = ?;
        `;
    db.query(qry, [UsersID], (err) => {
      if (err) {
        console.error('Error deleting user:', err);
        return res.status(500).json({ msg: 'Failed to delete user ' });
      }
      res.json({
        status: res.statusCode,
        msg: 'User removed',
      });
    });
  }
  updateUser(req, res) {
    const qry = `
        UPDATE Users
        SET ?
        WHERE id = ?;
    `;
    db.query(qry, [req.body], (err) => {
      if (err) {
        console.error('Error updating:', err);
        return res.status(500).json({ msg: 'Failed to update user' });
      }
      res.json({
        status: res.statusCode,
        msg: 'User was updated',
      });
    });
  }

  async login(req, res) {
    const { emailAdd, userPass } = req.body;
    const qry = `
      SELECT UserID, FirstName, LastName, Email, Gender, Age
      FROM Users
      WHERE emailAdd = ?`;
    db.query(qry, [emailAdd], async (err, result) => {
      if (err) throw err;
      if (!result?.length) {
        res.json({
          status: res.statucCode,
          msg: 'You provided the wrong email address',
        });
      } else {
        const validPass = await result(userPass, result[0].userPass);
        if (validPass) {
          const token = createToken({
            emailAdd,
            userPass,
          });
          res.json({
            status: res.statusCode,
            msg: 'You are logged in',
            token,
            result: result[0],
          });
        } else {
          res.json({
            status: res.statusCode,
            msg: 'Please provide the correct password',
          });
        }
      }
    });
  }
}

export { Users };
