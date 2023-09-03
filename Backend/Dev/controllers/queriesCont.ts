/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */

// controller.ts
import { Request, Response } from 'express';
import Queries from '../models/queriesModel';
const nodemailer = require('nodemailer');

// Controller function to get data from MongoDB
const getQueries = async (req: Request, res: Response) => {
  const { mentorId } = req.body;
  console.log(req.body);

  try {
    const data = await Queries.find({ mentorId: mentorId });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to update the content of a specific entry
const sendResponse = async (req: Request, res: Response) => {
  console.log("in sedResponse api:",req.body);

  const { _id, response, userMail, mentor, query, title } = req.body;
  const isResponded = true;

  const emailConfig = {
    host: 'smtp.gmail.com',
  port: 465,
  secure: true,
    auth: {
      user: 'learnly.io@gmail.com',
      pass: 'mhlqblzgdqrjotzq',
    },
  };
  
  const mailOptions = {
    from: 'Learnly <learnly.io@gmail.com>',
    to: userMail,
    subject: `Response: ${title}`,
    text: `Query: ${query} \nResponse: ${response} \nBy: ${mentor}`,
  };
  
  await sendEmail(emailConfig, mailOptions);

  try {
    const updatedQuery = await Queries.findByIdAndUpdate(_id, { response, isResponded }, { new: true });
    if (!updatedQuery) {
      return res.status(404).json({ error: 'Query not found' });
    }
    res.status(200).json(updatedQuery);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to save new content
export const saveQuery = async (req: Request, res: Response) => {

    console.log("Save Query called");
    const { name, title, email, content, mentorId } = req.body;
    const isResponded: Boolean = false;
    const response: String = "";

    const today = new Date();

    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();

    const time = `${month}/${day} ${currentHour}:${currentMinute}`;
    console.log(time);

    try {
      const newData = new Queries({  name, title, email, content, time, isResponded, response, mentorId });
      const savedData = await newData.save();
      res.status(201).json(savedData);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to delete a Query
const deleteQuery = async (req: Request, res: Response) => {
    const { _id, userMail, mentor, query, title } = req.body;  // Getting details from the body of request

    // Mail config 
    const emailConfig = {
      host: 'smtp.gmail.com',
    port: 465,
    secure: true,
      auth: {
        user: 'learnly.io@gmail.com',
        pass: 'mhlqblzgdqrjotzq',
      },
    };
    
    // Mail options
    const mailOptions = {
      from: 'Learnly <learnly.io@gmail.com>',
      to: userMail,
      subject: `Query Deleted: ${title}`,
      text: `Query: ${query} \nDeleted by: ${mentor}`,
    };
    
    await sendEmail(emailConfig, mailOptions);
  
    try {
      // Assuming DataModel is the Mongoose model representing the collection in MongoDB
      const deletedData = await Queries.findByIdAndDelete(_id);
  
      if (!deletedData) {
        return res.status(404).json({ error: 'Data not found' });
      }
  
      res.status(200).json({ message: 'Data deleted successfully', deletedData });
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
    getQueries,
    sendResponse,
    saveQuery,
    deleteQuery
}