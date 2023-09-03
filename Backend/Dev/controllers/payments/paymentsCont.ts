/**
 * This module handles the controller functions for payments and account balance.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */

import { Request, Response } from "express";
import PaymentDetails from "../../models/payments/paymentsModel";
import AccountBalance from "../../models/payments/balanceModel";
const nodemailer = require('nodemailer');

// Define request interfaces for type checking
interface PaymentRequest extends Request {
  body: {
    mentorId: string;
    accountNumber: number;
    transitNumber: number;
    institutionNumber: number;
    email: string;
  };
}

interface BalanceRequest extends Request {
  body: {
    mentorId: string;
    totalBalance: number;
  };
}

/**
 * Saves payment details for a mentor.
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const savePaymentDetails = async (req: PaymentRequest, res: Response) => {
  const { mentorId, accountNumber, transitNumber, institutionNumber, email } = req.body;
  const emailConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'learnly.io@gmail.com',
      pass: 'mhlqblzgdqrjotzq',
    },
  };

  let mailOptions;

  try {
    let paymentDetails = await PaymentDetails.findOne({ mentorId });
    if (paymentDetails) {
      paymentDetails.accountNumber = accountNumber;
      paymentDetails.transitNumber = transitNumber;
      paymentDetails.institutionNumber = institutionNumber;
      paymentDetails.email = email;
      mailOptions = {
        from: 'Learnly <learnly.io@gmail.com>',
        to: email,
        subject: `Payment Account Details Updated`,
        text: `Hi ${mentorId}, \nYour new Payment Account with Account Number : ${accountNumber} has been successfully connected. \n\n\nRegards, \nTeam Learnly`,
      };
    } else {
      paymentDetails = new PaymentDetails({
        mentorId,
        accountNumber,
        transitNumber,
        institutionNumber,
        email,
      });
      mailOptions = {
        from: 'Learnly <learnly.io@gmail.com>',
        to: email,
        subject: `Payment Account Successfully Connected`,
        text: `Hi ${mentorId}, \nYour Payment Account with Account Number : ${accountNumber} has been successfully connected. \n\n\nRegards, \nTeam Learnly`,
      };
    }
    await sendEmail(emailConfig, mailOptions);
    await paymentDetails.save();
    res.send({ message: "Payment Details Saved!" });
  } catch (error) {
    res.status(500).send({ error: "Failed to save payment details" });
  }
};

/**
 * Get payment details for a mentor.
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const getPaymentDetails = async (req: PaymentRequest, res: Response) => {
  const { mentorId } = req.query;
  try {
    const paymentDetails = await PaymentDetails.findOne({ mentorId });
    if (paymentDetails) {
      res.status(200).json({ paymentDetails });
    }
    else {
      res.status(404).json({ message: 'Payment details not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get payment details' });
  }
};

/**
 * Get balance details for a mentor.
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const getBalanceDetails = async (req: BalanceRequest, res: Response) => {
  const { mentorId } = req.query;
  try {
    const balanceDetails = await AccountBalance.findOne({ mentorId });
    if (balanceDetails) {
      res.status(200).json({ balanceDetails });
    }
    else {
      res.status(404).json({ message: 'Acoount balance details not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get acocunt balance details' });
  }
};

/**
 * Transfers amount to the account number of mentor.
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const transferAmount = async (req: Request, res: Response) => {
  const { mentorId, transferAmount, email, accountNumber } = req.body;
  const emailConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'learnly.io@gmail.com',
      pass: 'mhlqblzgdqrjotzq',
    },
  };

  let mailOptions;

  try {
    let transferAmountDetails = await AccountBalance.findOne({ mentorId });
    if (transferAmountDetails && transferAmountDetails.totalBalance !== undefined) {
      transferAmountDetails.totalBalance -= transferAmount;
      mailOptions = {
        from: 'Learnly <learnly.io@gmail.com>',
        to: email,
        subject: `Amount Transfer`,
        text: `Hi ${mentorId}, \nYour Payment Account with Account Number : ${accountNumber} has been credit with $ ${transferAmount} \n\n\nRegards, \nTeam Learnly`,
      };
      await sendEmail(emailConfig, mailOptions);
      await transferAmountDetails.save();
      res.send({ message: "Amount successfully transfered!" });
    } 
    else {
      res.status(404).send({ error: "Account balance details not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to transfer amount" });
  }
};

/**
 * Sends an email using nodemailer.
 * @param emailConfig - Email configuration object.
 * @param mailOptions - Email options object.
 */
async function sendEmail(emailConfig: any, mailOptions: any) {
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
