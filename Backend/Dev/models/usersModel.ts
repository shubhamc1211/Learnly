/**
 * @author Amanjot Singh <am854663@dal.ca/B00942293>
 */

import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  reason: string;
  expertise: string[];
  aboutYou: string;
  displayName: string;
  isGoogle: boolean;
  isDefaultSchedule: boolean;
}

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true }, // Add unique: true here
  email: { type: String, required: true, unique: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  reason: { type: String, required: true },
  expertise: { type: [String], required: true },
  aboutYou: { type: String, required: false },
  displayName: { type: String, required: false },
  isGoogle: { type: Boolean, required: true },
  isDefaultSchedule: { type: Boolean, required: true },
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
