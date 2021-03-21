const config = require('../config');
const path = require('path');
const pug = require('pug');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.mailer.user,
    pass: config.mailer.password,
  },
})

module.exports.sendMail = async (options) => {
  const html = pug.renderFile(
    path.join(__dirname, '../templates', options.template) + '.pug',
    options.locals || {}
  );

  const message = {
    to: options.to,
    subject: options.subject,
    html,
  };

  return await transporter.sendMail(message);
};
