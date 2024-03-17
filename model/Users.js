import { connection as db } from '../config/index.js';
import { hash, compare } from 'bcrypt';
import { createToken } from '../middleware/AuthenticateUser.js';

class Users {
  fetchUsers(req, res) {
    const qry = `
        SELECT UserID, FirstName, LastName, Email, Gender, Age, userPass
    FROM Users`;

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
      WHERE UserID = ${req.params.id};
    `;
    db.query(qry, (err, result) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        result: result[0],
      });
    });
  }

  async createUser(req, res) {
    // Payload
    let data = req.body;
    data.userPass = await hash(data?.userPass, 10);
    let user = {
      emailAdd: data.emailAdd,
      userPass: data.userPass,
    };
    const qry = `
        INSERT INTO Users
        SET ?;`;

    db.query(qry, [data], (err) => {
      if (err) {
        console.log(err);
        res.json({
          status: res.statusCode,
          msg: 'Please use another email address',
        });
      } else {
        let token = createToken(user);
        res.json({
          status: res.statusCode,
          token,
          msg: 'You are registered',
        });
      }
    });
  }

  async updateUser(req, res) {
    const data = req.body;
    if (data?.userPwd) {
      data.userPwd = await hash(data.userPwd, 8);
    }

    const qry = `
      UPDATE Users
      SET ?
      WHERE userID = ?`;

    db.query(qry, [data, req.params.id], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: 'The user information is updated',
      });
    });
  }

  async deleteUser(req, res) {
    const qry = `
      DELETE FROM Users
      WHERE userID = ?`;

    db.query(qry, [req.params.id], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: 'User has been deleted',
      });
    });
  }

  async login(req, res) {
    const { emailAdd, userPass } = req.body;
    `SELECT UserID, FirstName, LastName, Email, Gender, Age, userPass
    FROM Users
      WHERE emailAdd = ?`;

    db.query(qry, [emailAdd], async (err, result) => {
      if (err) throw err;
      if (!result?.length) {
        res.json({
          status: res.statusCode,
          msg: 'You provided a wrong email address',
        });
      } else {
        // Validate password
        const validPass = await compare(userPass, result[0].userPass);
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
            msg: 'Please provide the correct Password',
          });
        }
      }
    });
  }
}

export { Users };

