import { connection as db } from '../config/index.js';
import { hash, compare } from 'bcrypt';
import { createToken } from '../middleware/AuthenticateUser.js';

class Users {
  fetchUsers(req, res) {
    const qry = `
      SELECT UserID, FirstName, LastName, Email, Gender, Age
      FROM Users`;
    db.query(qry, (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ error: 'Failed to fetch users' });
      }
      res.json({
        status: res.statusCode,
        results,
      });
    });
  }

  fetchUser(req, res) {
    const userId = req.params.id;
    const qry = `
      SELECT UserID, FirstName, LastName, Email, Gender, Age
      FROM Users
      WHERE UserID = ?`;
    db.query(qry, [userId], (err, result) => {
      if (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ error: 'Failed to fetch user' });
      }
      res.json({
        status: res.statusCode,
        result: result[0],
      });
    });
  }

  async createUser(req, res) {
    let userData = req.body;
    userData.userPass = await hash(userData.userPass, 10);
    const qry = `
      INSERT INTO Users
      SET ?`;
    db.query(qry, [userData], (err) => {
      if (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ error: 'Failed to create user' });
      }
      let user = { emailAdd: userData.emailAdd };
      let token = createToken(user);
      res.json({
        status: res.statusCode,
        token,
        msg: 'User registered successfully',
      });
    });
  }

  async updateUser(req, res) {
    const userId = req.params.id;
    const userData = req.body;
    if (userData.userPass) {
      userData.userPass = await hash(userData.userPass, 8);
    }
    const qry = `
      UPDATE Users
      SET ?
      WHERE UserID = ?`;
    db.query(qry, [userData, userId], (err) => {
      if (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ error: 'Failed to update user' });
      }
      res.json({
        status: res.statusCode,
        msg: 'User information updated successfully',
      });
    });
  }

  async deleteUser(req, res) {
    const userId = req.params.id;
    const qry = `
      DELETE FROM Users
      WHERE UserID = ?`;
    db.query(qry, [userId], (err) => {
      if (err) {
        console.error('Error deleting user:', err);
        return res.status(500).json({ error: 'Failed to delete user' });
      }
      res.json({
        status: res.statusCode,
        msg: 'User deleted successfully',
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
        return res.status(500).json({ error: 'Failed to fetch user' });
      }
      if (!result || result.length === 0) {
        return res.status(400).json({ error: 'Invalid email address' });
      }
      const match = await compare(userPass, result[0].userPass);
      if (!match) {
        return res.status(400).json({ error: 'Incorrect password' });
      }
      const user = { emailAdd };
      const token = createToken(user);
      res.json({
        status: res.statusCode,
        msg: 'You are logged in',
        token,
        result: result[0],
      });
    });
  }
}

export{Users}
