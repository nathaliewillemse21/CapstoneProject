import { connection as db } from '../config/index.js';
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

  fetchBook(req, res) {
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
}
export { Users }