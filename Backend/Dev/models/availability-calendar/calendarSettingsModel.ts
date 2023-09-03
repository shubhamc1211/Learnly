/**
 * This is the schema definition for the Calendar Settings model.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */

import mongoose from "mongoose";

// Define the schema for the Calendar Settings model
const CalendarSettings = mongoose.model(
  "CalendarSetting",
  new mongoose.Schema({
    mentorId: String,
    timezone: String,
    meetingLink: String,
    bookingPeriod: String,
    noticePeriod: String,
  })
);

// Export the Calendar Settings model
export default CalendarSettings;
