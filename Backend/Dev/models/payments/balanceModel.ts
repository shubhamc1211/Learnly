/**
 * This is the schema definition for the Payment Details model.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */

import mongoose from "mongoose";

// Define the schema for the Payment Details model
const paymentDetailsSchema = new mongoose.Schema({
  mentorId: String,
  totalBalance: Number,
});

// Create the Payment Details model
const PaymentDetails = mongoose.model("Balance", paymentDetailsSchema);

// Export the Payment Details model
export default PaymentDetails;
