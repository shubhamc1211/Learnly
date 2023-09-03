/**
 * This is the schema definition for the Blocked Dates model.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */

import mongoose from "mongoose";

// Define the schema for the Blocked Dates model
const BlockedDates = mongoose.model(
  "BlockedDate",
  new mongoose.Schema({
    mentorId: String,
    dates: [String],
  })
);

// Export the Blocked Dates model
export default BlockedDates;
