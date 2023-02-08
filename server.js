import {app} from './app.js';
import connectToMongo from './config/database.js';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
dotenv.config({path: '.env'});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const PORT = 2000;
connectToMongo();
app.listen(PORT, console.log(`App lsiten at http://localhost:${PORT}`));
