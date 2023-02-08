import express from 'express';
import {router} from './Routers/Router.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
  fileUpload({
    limits: {fileSize: 50 * 1024 * 1024},
    useTempFiles: true,
  }),
);
app.use(cors());
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('hello world');
});
