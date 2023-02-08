import nodemailer from 'nodemailer';

export const sendMail = async (email, subject, message) => {
  var transport = nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    port:process.env.MAIL_PORT ,
    service:"gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass:process.env.MAIL_PASS
    }
  })
  transport.sendMail({
    from:process.env.MAIL_USER, // sender address
    to: email,
    subject,
    message,
  });
};
