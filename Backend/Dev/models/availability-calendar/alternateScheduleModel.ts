/**
 * This is the schema definition for the Alternate Schedule model.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */
import mongoose, { Document, Model } from 'mongoose';

// Interface representing the properties of an Alternate Schedule document
export interface IAlternateSchedule extends Document {
  day: string;
  startTime: string;
  endTime: string;
  mentorId: string;
}

// Define the schema for the Alternate Schedule model
const alternateScheduleSchema = new mongoose.Schema({
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  mentorId: { type: String, required: true }
});

// Create the Alternate Schedule model using the schema
const AlternateSchedule: Model<IAlternateSchedule> = mongoose.model<IAlternateSchedule>('AlternateSchedule', alternateScheduleSchema);

// Export the Alternate Schedule model
export default AlternateSchedule;
