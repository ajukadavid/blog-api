import nodemailer from 'nodemailer'

export const handleSendEmail = (email) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: 'This is a verification email from nodemailer',
    text: 'email has been received from you'
  };

  transporter.sendMail(mailOptions, function(err, info){
    if(err){
        console.log(err)
        return err
    } else {
        console.log('b', info)
        return info.response
    }
  })
};

