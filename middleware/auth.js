import jwt from 'jsonwebtoken';
import user from '../models/user.js';

export const IsAuthenticated = async (req, res, next) => {
  try {
    const {token} = req.cookies;
    if (!token) {
      return res.status(401).json({
        message: 'Login First',
        status: false,
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    
    req.user = await user.findById(decode._id);
    next();
  } catch (error) {
    res.status(500).json({
      message: `Internal error=>${error}`,
      status: false,
    });
  }
};
