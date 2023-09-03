import { Request, Response } from "express";
import User, { IUser } from "../../models/usersModel";
import { hashPassword } from "../../util/hashingUtil";

const userRegisteration = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    userName,
    password,
    reason,
    expertise,
    isGoogle,
    isDefaultSchedule,
  } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    // Check if there is an existing user with the same email and isGoogle value
    const existingUser = await User.findOne({ email, isGoogle });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user using the IUser interface with the hashed password
    const newUser: IUser = new User({
      firstName,
      lastName,
      email,
      userName,
      password: hashedPassword, // Save the hashed password
      reason,
      expertise,
      displayName: firstName,
      isGoogle: isGoogle,
      isDefaultSchedule,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message or other data as needed
    res.status(200).json({
      message: "User registered successfully",
      user: {
        firstName: newUser.firstName,
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (error) {
    // Handle errors
    console.log(error);

    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
};

export default { userRegisteration };
