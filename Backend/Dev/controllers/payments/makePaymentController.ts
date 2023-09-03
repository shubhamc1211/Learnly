/**
 * @file This file defines the controller for the payment process and the sending of a confirmation email.
 * @author Shivam Lakhanpal <sh475218@dal.ca/B00932887>
 * @author Taranjot Singh <tr548284@dal.ca/B00945917>
 */

import nodemailer from "nodemailer";
import { Request as ExpressRequest, Response } from "express";
import StudentBooking from "../../models/StudentBooking";
import AccountBalance from "../../models/payments/balanceModel";

/**
 * Interface extending the express request to include the mentorId in params.
 * @interface
 * @extends {ExpressRequest}
 * @property {object} params - Express request parameters
 * @property {string} params.mentorId - The mentor's ID
 */
interface RequestWithMentorIdParams extends ExpressRequest {
  params: {
    mentorId: string;
  };
}

/**
 * Email configuration for nodemailer.
 * @constant
 * @type {object}
 */
const emailConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "learnly.io@gmail.com",
    pass: "mhlqblzgdqrjotzq",
  },
};

/**
 * Async function to send an email using nodemailer.
 *
 * @async
 * @function
 * @param {any} emailConfig - The email configuration for nodemailer
 * @param {any} mailOptions - The email message options
 */
async function sendEmail(emailConfig: any, mailOptions: any) {
  try {
    const transporter = nodemailer.createTransport(emailConfig);
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

/**
 * An express async function to handle the payment process and the sending of a confirmation email.
 *
 * @async
 * @function
 * @param {RequestWithMentorIdParams} req - Express request object
 * @param {Response} res - Express response object
 */
export const makePayment = async (
  req: RequestWithMentorIdParams,
  res: Response
) => {
  const mentorId = req.params.mentorId;
  const { price, bookingId } = req.body;
  console.log(req.body);

  try {
    // Find the relevant bookings
    const bookings = await StudentBooking.find({ bookingId: bookingId });
    console.log(bookings);
    // Extract the student emails
    const studentEmails = bookings.map((booking) => booking.studentEmail);

    // Perform the payment operation
    await StudentBooking.updateOne({ bookingId: bookingId }, { isPaid: true, price: price });

    // Convert price to a numeric value by removing the dollar sign
    const numericPrice = parseFloat(price.replace("$", ""));
    console.log(numericPrice);
    let accountBalanceDetails = await AccountBalance.findOne({ mentorId });
    console.log(accountBalanceDetails);
    if(accountBalanceDetails && accountBalanceDetails.totalBalance !== undefined){
        console.log(accountBalanceDetails.totalBalance);
        accountBalanceDetails.totalBalance += numericPrice;
        console.log(accountBalanceDetails.totalBalance);
    }
    else{
      accountBalanceDetails = new AccountBalance({
        mentorId,
        totalBalance: numericPrice,
      });
    }
    await accountBalanceDetails.save();
    console.log("Saved Balance");
    // Send confirmation email to all students
    console.log("Printing emails",studentEmails);
    for (let studentEmail of studentEmails) {
    console.log("Printing single emails",studentEmail);
      const mailOptions = {
        from: "Learnly <learnly.io@gmail.com>",
        to: studentEmail,
        subject: `Payment Confirmation`,
        text: `Your payment for the mentor session has been successful. Thank you for using Learnly.`,
      };

      await sendEmail(emailConfig, mailOptions);
    }

    res.send({ message: "Payment successful" });
  } catch (error) {
    res.status(500).send({ error: "Payment failed" });
  }
};
