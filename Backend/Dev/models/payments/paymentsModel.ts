/**
 * This is the schema definition for the Payment Details model.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */

import mongoose from "mongoose";

// Define the schema for the Payment Details model
const paymentDetailsSchema = new mongoose.Schema({
  mentorId: String,
  accountNumber: Number,
  transitNumber: Number,
  institutionNumber: Number,
  email: String,
});

// Create the Payment Details model
const PaymentDetails = mongoose.model("Payment", paymentDetailsSchema);

// Export the Payment Details model
export default PaymentDetails;
