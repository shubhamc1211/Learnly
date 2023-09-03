/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */

// controller.ts
import { Request, Response } from 'express';
const nodemailer = require('nodemailer');



// Controller function to send mail
const sendMail = async (req: Request, res: Response) => {
  console.log("in sendEmail api:",req.body);

  const { body, title } = req.body;

  // Mail connigs
  const emailConfig = {
    host: 'smtp.gmail.com',
  port: 465,
  secure: true,
    auth: {
      user: 'learnly.io@gmail.com',
      pass: 'mhlqblzgdqrjotzq', //Auth tocken
    },
  };
  
  // Mail data
  const mailOptions = {
    from: 'Learnly <learnly.io@gmail.com>',
    to: 'shubhamchauhan1211@gmail.com',
    subject: title,
    text: body,
  };
  
  

  try {
    await sendEmail(emailConfig, mailOptions);
    res.status(200).json("Mail Sent");
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


  
async function sendEmail(emailConfig:any, mailOptions:any) {
  try {
    // Create a nodemailer transporter using the email configuration
    const transporter = nodemailer.createTransport(emailConfig);

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}


export default {
    sendMail
}