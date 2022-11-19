const mailer = require('nodemailer');
const config = require('config');

const mailConfig = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "blongjeremy@gmail.com",
    pass: config.get("gmailAppPassword")
  }
};

const transporter = mailer.createTransport(mailConfig);

module.exports = transporter;