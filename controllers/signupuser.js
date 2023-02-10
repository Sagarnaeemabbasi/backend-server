import user from '../models/user.js';
import {sendMail} from '../Utils/sendMail.js';
import {sendToken} from '../Utils/sendToken.js';
import cloudinary from 'cloudinary';
// import fs from 'fs';

export const signupUser = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    // const avatar = req.files.avatar.tempFilePath;
    if (!name || !email || !password) {
      res.status(400).json({
        message: 'kindly fill all the fields',
        status: false,
      });
      return;
    }
    let userOne = await user.findOne({email}).select("+password");
    if (userOne) {
      res.status(400).json({
        message: 'user already exist',
        status: false,
      });
      
      return;
    }
    const otp = Math.floor(Math.random() * 100000);

    // const uploadAvatar = await cloudinary.v2.uploader.upload(avatar);

    const obj_to_sent = {
      name,
      email,
      password,
      // avatar: {
      //   public_id: uploadAvatar.public_id,
      //   url: uploadAvatar.secure_url,
      // },
      otp,
      otp_expiry: new Date(
        Date.now() + process.env.OTP_EXPIRY_DATE * 60 * 1000,
      ),
    };

    userOne = await user.create(obj_to_sent);
//     fs.rmSync('./tmp', {recursive: true});

    // await sendMail(email, 'Verify Your Account', `Your otp is ${otp}`);

//     await sendMail(email, 'Verify Your Account', `Your otp is ${otp}`);

    sendToken(res, userOne, 201, 'Your otp is send');
  } catch (error) {
    res.status(400).json({
      message: `Internal  Error by db which is ====> ${error}`,
      status: false,
    });
  }
};

// .then(() => {
//   res.status(200).json({
//     message: 'user created successfully ',
//     userData: {
//       name,
//       email,
//       password,
//     },
//     status: true,
//   });
// })
// .catch(err => {
//   res.status(400).json({
//     message: `Some Error by you which is ====> ${err}`,
//     status: false,
//   });
// });
