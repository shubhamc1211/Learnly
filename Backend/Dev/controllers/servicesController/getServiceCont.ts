/**
 * @author Shivam Lakhanpal <sh475218@dal.ca/B00932887>
 */

import { Request, Response } from "express";
import Services from "../../models/servicesModel";
/*
 * An express async function to handle the service request.
 * This function returns the details of the services offered by a mentor.
 * This is a mock data as services feature is not available
 *
 * @async
 * @function
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */


const getService = async (req: Request, res: Response) => {
  let { mentorId } = req.params;
  console.log(mentorId);

  try {
    const data = await Services.find({ mentorId: mentorId });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default { getService };
