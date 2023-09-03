/**
 * This is the schema definition for the Default Schedule model.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */

import mongoose, { Document, Model } from 'mongoose';

// Define the interface for the Default Schedule model
export interface IDefaultSchedule extends Document {
  day: string;
  startTime: string;
  endTime: string;
  mentorId: string;
}

// Define the schema for the Default Schedule model
const defaultScheduleSchema = new mongoose.Schema({
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  mentorId: { type: String, required: true}
});

// Create the Default Schedule model
const Schedule: Model<IDefaultSchedule> = mongoose.model<IDefaultSchedule>('DefaultSchedule', defaultScheduleSchema);

// Export the Default Schedule model
export default Schedule;
