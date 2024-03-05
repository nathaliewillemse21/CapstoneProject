console.log("Annyeonghaseyo");
import cookieParser from 'cookie-parser';
import { userRouter } from './controller/UsersController.js';
import { productsRouter } from './controller/ProductsController.js';
import { errorHandling } from './middleware/ErrorHandling.js';
import path from 'path';
import cors from 'cors';
import express from 'express';
import { config } from 'dotenv';
config();

const app = express();
const port = +process.env.PORT || 4000;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Request-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Expose-Headers', 'Authorization');
  next();
});
app.use(
  express.static('./static'),
  express.json(),
  express.urlencoded({
    extended: true,
  }), 
  cookieParser(),
  cors()
);
app.get('^/$|/capstoneproject', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './static/index.html'));
});
app.use('/Users', userRouter);
app.use('/Library', productsRouter);
app.use(errorHandling);
app.listen(port, () => {
  console.log(`This server is running on port number ${port}`);
});