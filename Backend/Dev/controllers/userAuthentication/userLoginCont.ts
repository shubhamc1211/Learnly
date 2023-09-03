/**
 * @author Amanjot Singh <am854663@dal.ca/B00942293>
 */

import { Request, Response } from "express";
import User, { IUser } from "../../models/usersModel";
import { checkPassword } from "../../util/hashingUtil";
const userLogin = async (req: Request, res: Response) => {
  const { email, password, isGoogle } = req.body;

  try {
    // Find the user with the provided userName in the database
    const user: IUser | null = await User.findOne({ email, isGoogle });

    // If the user is not found, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await checkPassword(password, user.password);

    // If passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // If passwords match, respond with a success message or other data as needed
    res.status(200).json({
      message: "Login successful",
      user: {
        firstName: user.firstName,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    // Handle errors
    console.log(error);

    res.status(500).json({ error: "An error occurred while logging in" });
  }
};

export default { userLogin };
