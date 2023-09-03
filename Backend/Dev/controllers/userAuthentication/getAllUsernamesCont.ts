/**
 * @author Amanjot Singh <am854663@dal.ca/B00942293>
 */

import { Request, Response } from "express";
import User from "../../models/usersModel";

// Fetch and return all the usernames in the user table
const getAllUsernames = async (_: Request, res: Response) => {
  try {
    // Find all users in the database and project only the username field
    const usernames = await User.find({}, { userName: 1 });

    // If no usernames found, return an empty array
    if (!usernames || usernames.length === 0) {
      return res.status(200).json([]);
    }

    // Extract the usernames from the query result and send them in the response
    const usernameList = usernames.map((user) => user.userName);
    res.status(200).json(usernameList);
  } catch (error) {
    // Handle errors
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching usernames" });
  }
};

export default { getAllUsernames };
