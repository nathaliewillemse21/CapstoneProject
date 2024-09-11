console.log("Annyeonghaseyo");

import cookieParser from 'cookie-parser';
import { userRouter } from './controller/UsersControllers.js';
import { productsRouter } from './controller/ProductsControllers.js';
import { errorHandling } from './middleware/ErrorHandling.js';
import path from 'path';
import cors from 'cors';
import express from 'express';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = +process.env.PORT || 4000;

// CORS setup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Request-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Expose-Headers', 'Authorization');
  next();
});

// Middleware setup
app.use(
  express.static(path.join(__dirname, 'static')),
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(),
  cors()
);

// Routes
app.get('^/$|/capstoneproject', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'static/index.html'));
});
app.use('/users', userRouter);
app.use('/products', productsRouter);
app.use(errorHandling);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
