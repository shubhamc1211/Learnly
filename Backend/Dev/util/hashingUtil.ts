/**
 * @author Amanjot Singh <am854663@dal.ca/B00942293>
 */

import bcrypt from "bcrypt";
const SALTROUNDS = 10;
// Hash a password string and return the hashed password
export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, SALTROUNDS);
  return hashedPassword;
};

// Check if a given password matches the hashed password
export const checkPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const passwordMatches = await bcrypt.compare(password, hashedPassword);
  return passwordMatches;
};
