import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { AppDataSource } from './database/config';
import { authenticateJWT } from './middlewares/authenticateJWT';
import dotenv from 'dotenv';
import { routers } from './modules';
// import { isAuth } from "./middlewares/isAuth";
// import auth from "./routes/public/auth";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.get('/hello', (req, res) => {
  res.json({ message: 'world' });
});

AppDataSource.initialize()
  .then(() => {

    for (const key in routers) {
      app.use(`/${key}`, routers[key]);
    }

    console.log('ok');
    app.listen(4000, () => {
      console.log('Server is running on port 4000');
    });
  })
  .catch((error) => console.log('Error initializing data source:', error));
