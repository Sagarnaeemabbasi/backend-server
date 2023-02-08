import user from '../models/user.js';
import {sendMail} from '../Utils/sendMail.js';

const updateProfile = async (req, res) => {
  try {
    const {name} = req.body;

    const userOne = await user.findById(req.user._id);
    if (!name) {
      return res.status(400).json({
        message: 'Kindly fill the required Feilds',
        status: false,
      });
    } else {
      userOne.name = name;
    }

    await userOne.save();
    res.status(200).json({
      message: 'Profile Updated Successfully',
      status: true,
    });
  } catch (error) {
    res.status(400).json({
      message: `Some Error Occured which is =========> ${error}`,
      status: false,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const {oldPassword, newPassword} = req.body;

    const userOne = await user.findById(req.user._id).select('+password');
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: 'Kindly fill the both Feilds',
        status: false,
      });
    }
    const isMatch = await userOne.comparePassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        message: 'This password is not matched',
        status: false,
      });
    }
    userOne.password = newPassword;

    await userOne.save();

    res.status(200).json({
      message: 'password Updated Successfully',
      status: true,
    });
  } catch (error) {
    res.status(400).json({
      message: `Some Error Occured which is =========> ${error}`,
      status: false,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const {email} = req.body;

    if (!email) {
      return res.status(400).json({
        message: 'Kindly Add the Email',
        status: false,
      });
    }
    const userOne = await user.findOne({email});

    if (!userOne) {
      return res.status(400).json({
        message: 'User Does not exist',
        status: false,
      });
    }
    const otp = Math.floor(Math.random() * 100000);

    userOne.resetPasswordOtp = otp;
    userOne.resetPasswordOtpExpiry = Date.now() + 10 * 60 * 1000;

    await userOne.save();

    sendMail(email, 'Otp for Forgot Password', `Your otp s ${otp}`);

    res.status(200).json({
      message: 'otp sent successfully',
      status: true,
    });
  } catch (error) {
    res.status(400).json({
      message: `Some Error Occured which is =========> ${error}`,
      status: false,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const {otp, newPassword} = req.body;

    const userOne = await user.findOne({
      resetPasswordOtp: otp,
      resetPasswordExpiry: {$gt: Date.now()},
    });

    if (!userOne) {
      return res
        .status(400)
        .json({success: false, message: 'Otp Invalid or has been Expired'});
    }
    userOne.password = newPassword;
    userOne.resetPasswordOtp = null;
    userOne.resetPasswordOtpExpiry = null;
    await userOne.save();

    res
      .status(200)
      .json({success: true, message: `Password Changed Successfully`});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};
export {updateProfile, updatePassword, forgotPassword,resetPassword};
