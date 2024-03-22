import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import  cors  from "cors";
const { sign, verify } = jwt;
config();

async function comparePasswords(userPassword, hashedPassword) {
  return bcrypt.compare(userPassword, hashedPassword);
}

function createToken(user) {
  return sign(
    {
      emailAdd: user.emailAdd,
      userPwd: user.Pass,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '1h',
    }
  );
}

function verifyToken(req, res, next) {
  const token = req.headers['Authorization'];
  if (token) {
    try {
      if (verify(token, process.env.SECRET_KEY)) {
        next();
      } else {
        res.json({
          status: res.statusCode,
          msg: 'Please provide your correct details',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(401).json({
        status: res.statusCode,
        msg: 'Invalid token',
      });
    }
  } else {
    res.status(401).json({
      status: res.statusCode,
      msg: 'Please login',
    });
  }
}

export { createToken, verifyToken };
