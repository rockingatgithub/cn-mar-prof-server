const nodemailer = require('nodemailer');

exports.sendEmail = () => {

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});

const mailOptions = {
  from: '',
  to: '',
  subject: 'Ordered a food',
  text: 'Food is tasty!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
 console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    // do something useful
  }
});

}