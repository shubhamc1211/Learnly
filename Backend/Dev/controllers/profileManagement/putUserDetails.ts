/**
 * @author Amanjot Singh <am854663@dal.ca/B00942293>
 */
import { Request, Response } from "express";
import User from "../../models/usersModel";

// Fetch and return all the details of a user with a given username
const putUserDetails = async (req: Request, res: Response) => {
  const userData = req.body;
  const newUserData = {
    userName: userData.newUserName,
    firstName: userData.firstName,
    lastName: userData.lastName,
    displayName: userData.displayName,
    aboutYou: userData.aboutYou,
    email: userData.email,
  };
  try {
    const filter = { userName: userData.currentUsername }; // Create a filter to find the document by userName
    const update = { $set: newUserData }; // Use $set operator to update the document with the new data

    console.log("update user:", filter, update);
    // Set the { new: true } option to return the modified document instead of the original one
    const updatedQuery = await User.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (updatedQuery) {
      res.status(200).json(updatedQuery);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default { putUserDetails };
