import { Request, Response } from "express";
import User from "../../models/usersModel";

const checkEmailExist = async (req: Request, res: Response) => {
  const { user } = req.body;
  console.log(user);

  try {
    // Find a user with the given email and isGoogle combination
    const findUser = await User.findOne({
      email: user.email,
      isGoogle: user.isGoogle,
    });

    // If the user was not found, return a 404 status
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the user was found, return the user object
    res.status(200).json({
      message: "User found",
      user: {
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        email: findUser.email,
        userName: findUser.userName,
        isGoogle: findUser.isGoogle,
        // Include other user details as needed
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

export default { checkEmailExist };
