const nodemailer = require('nodemailer');

exports.sendEmail = (foodData) => {

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
  subject: `Your ${foodData.food} is ordered`,
  text: `Food is tasty!`
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