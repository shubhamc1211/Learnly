/**
 * @author Amanjot Singh <am854663@dal.ca/B00942293>
 */

import { Request, Response } from "express";
import User from "../../models/usersModel";

// Fetch and return all the details of a user with a given username
const getUserDetails = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    // Find a user with the given username
    const user = await User.findOne({ userName: username });

    // If the user was not found, return a 404 status
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the user was found, return the user object
    res.status(200).json({
      user: {
        username: user.userName,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        reasonToJoin: user.reason,
        expertise: user.expertise,
        aboutYou: user.aboutYou ? user.aboutYou : "",
        displayName: user.displayName ? user.displayName : "",
        isGoogle: user.isGoogle,
      },
    });
  } catch (error) {
    // Handle errors
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user details" });
  }
};

export default { getUserDetails };
