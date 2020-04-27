const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const auth = {
  auth: {
    api_key: 'your_key-65b08458-10196f6d',
    domain: 'your_domain.mailgun.org',
  },
};

const transporter = nodemailer.createTransport(mg(auth));

const sendMail = (to, subject, text, cb) => {
  const mailOptions = {
    from: 'myemail@example.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

module.exports = sendMail;
