var nodemailer = require("nodemailer");
const path = require('path');
const envFilePath = path.resolve(`./config/.env.${process.env.NODE_ENV}`);
require('dotenv').config({ path: envFilePath });

getTransporter  = () =>  {
  return nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user:  process.env.emailFrom,
        pass:  process.env.gmailPassword
      },
      tls: {
        rejectUnauthorized: false
      }
  });
}

async function sendMail({ to, subject, html }) {
  const emailObject = {
      from:  process.env.emailFrom,              //process.env.emailFrom, // sender address
      to, // list of receivers
      subject, // Subject line
      html, // plain text body
  };
  const response = { status: 'success' };
  try {
    await this.getTransporter().sendMail(emailObject);
  } catch (error) {
    response.status = 'failed';
    if (error.response) {
        response.error = error.response.body;
    } else {
        response.error = error.toString();
        
    }
  }
  return response;
  

}

module.exports = {
  sendMail,
};