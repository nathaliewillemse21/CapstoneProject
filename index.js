console.log("Annyeonghaseyo");
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import express from 'express';
import { config } from 'dotenv';
config();

const app = express();
const port = +process.env.PORT || 4000;

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
app.listen(port, () => {
  console.log(`This server is running on port number ${port}`);
});