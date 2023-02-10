import user from '../models/user.js';
import {sendToken} from '../Utils/sendToken.js';

const VerfiyUser = async (req, res) => {
  try {
    const otp = Number(req.body.otp);
    const userOne = await user.findById(req.user._id);
    if (userOne.otp != otp || userOne.otp_expiry < Date.now()) {
      res.status(400).json({
        message: 'Invalid otp or has been expired',
        status: false,
      });
      return;
    }

    userOne.verified = true;
    userOne.otp = null;
    userOne.otp_expiry = null;

    await userOne.save();
    sendToken(res, userOne, 200, 'User Verified');
  } catch (error) {
    res.status(400).json({
      message: `Internal  Error by db which is ====> ${error}`,
      status: false,
    });
  }
};

const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie('token', null, {
        expires: new Date(Date.now()),
      })
      .json({
        message: 'Logout Successfully',
        status: true,
      });
  } catch (error) {
    res.status(400).json({
      message: `Internal  Error by db which is ====> ${error}`,
      status: false,
    });
  }
};
const loginuser = async (req, res) => {
  try {
    const {email, password} = req.body;
    if ((!email, !password)) {
      return res.json({
        message: 'Kindly Fill the correct information',
        status: false,
      });
    }

    let userOne = await user.findOne({email});
    if (!userOne) {
      return res.status(400).json({
        message: 'Invalid Email or Password',
        status: false,
      });
    }
    const isMatch = await userOne.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid Email or Password',
        status: false,
      });
    }

    sendToken(res, userOne, 200, 'Login Successfully');
  } catch (error) {
    res.status(400).json({
      message: `Internal  Error by db which is ====> ${error}`,
      status: false,
    });
  }
};

const getMyProfile = (req, res) => {
  try {
    let userOne = user.findById(req.user._id);
    if (userOne) {
      sendToken(res, userOne, 200, `welcome back ${userOne.name}`);
    }
  } catch (error) {
    res.status(400).json({
      message: `Internal  Error by db which is ====> ${error}`,
      status: false,
    });
  }
};

export {loginuser, VerfiyUser, logout, getMyProfile};
