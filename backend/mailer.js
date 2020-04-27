const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const auth = {
  auth: {
    api_key: '96726f3c458dbd6e4bc22ed6d9be49fe-65b08458-10196f6d',
    domain: 'sandboxb0dffd0395dc4beebb5473a4218ec2b4.mailgun.org',
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
