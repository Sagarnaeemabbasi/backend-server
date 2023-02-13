import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, 'Password must be 8 characters long'],
    },
    avatar: {
      public_id: String,
      url: String,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tasks: [
      {
        title: String,
        description: String,
        createdAt: Date,
        completed: Boolean,
      },
    ],
    verified: {
      type: Boolean,
      default: false,
    },

    otp: Number,
    otp_expiry: Date,
    resetPasswordOtp: Number,
    resetPasswordOtpExpiry: Date,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({_id: this._id}, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_COOKIE_EXPIRE * 60 * 1000,
  });
};
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.index({otp_expiry: 1}, {expireAfterSeconds: 0});
const user = mongoose.model('user', userSchema);
export default user;
