export const sendToken = (res, user, statusCode, message) => {
  const token = user.getJWTToken();
  
  const optionsToSent = {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.OPT_EXPIRY_TIME * 60 * 1000),
  };
  // const {_id}=user._id
  const userDataToSent = {
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    tasks: user.Tasks,
    verified: user.verified,
  };
  res.status(statusCode).cookie('token', token, optionsToSent).json({
    success: true,
    message,
    user: userDataToSent,
  });
};


