import { connection as db } from '../config/index.js';
import { compare } from 'bcrypt';
import { createToken } from '../middleware/AuthenticateUser.js';

class Users {
  fetchUsers(req, res) {
    const qry = `
      SELECT UserID, FirstName, LastName, Email, Gender, Age
      FROM Users;
    `;
    db.query(qry, (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ msg: 'Failed to fetch users' });
      }
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
      WHERE UserID = ${req.params.id};
    `;
    db.query(qry, (err, result) => {
      if (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ msg: 'Failed to fetch user' });
      }
      res.json({
        status: res.statusCode,
        result: result[0],
      });
    });
  }

  addUser(req, res) {
    const qry = `
      INSERT INTO Users
      SET ?;
    `;
    db.query(qry, [req.body], (err) => {
      if (err) {
        console.error('Error adding user:', err);
        return res.status(500).json({ msg: 'Failed to add user' });
      }
      res.json({
        status: res.statusCode,
        msg: 'New user added',
      });
    });
  }

  deleteUser(req, res) {
    const userID = req.params.id;
    if (!userID) {
      return res.status(400).json({ msg: 'UserID is required' });
    }
    const qry = `
      DELETE
      FROM Users
      WHERE UserID = ?;
    `;
    db.query(qry, [userID], (err) => {
      if (err) {
        console.error('Error deleting user:', err);
        return res.status(500).json({ msg: 'Failed to delete user' });
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
      WHERE UserID = ?;
    `;
    db.query(qry, [req.body, req.params.id], (err) => {
      if (err) {
        console.error('Error updating user:', err);
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
      SELECT UserID, FirstName, LastName, Email, Gender, Age, userPass
      FROM Users
      WHERE Email = ?`;
    db.query(qry, [emailAdd], async (err, result) => {
      if (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ msg: 'Failed to fetch user' });
      }
      if (!result || result.length === 0) {
        return res.status(400).json({ msg: 'Invalid email address' });
      }
      const match = await compare(userPass, result[0].userPass);
      if (!match) {
        return res.status(400).json({ msg: 'Incorrect password' });
      }
      const token = createToken({ userID: result[0].UserID });
      res.json({
        status: res.statusCode,
        msg: 'You are logged in',
        token,
        result: result[0],
      });
    });
  }
}

export { Users };
