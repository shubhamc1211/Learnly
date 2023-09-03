/**
 * @file This file defines the MongoDB schema for student bookings. It includes various fields that store booking details.
 * @author Shivam Lakhanpal <sh475218@dal.ca/B00932887>
 * @author Taranjot Singh <tr548284@dal.ca/B00945917>
 */

import mongoose from "mongoose";

// Define the StudentBooking schema
const StudentBooking = mongoose.model(
  "StudentBooking",
  new mongoose.Schema({
    serviceName: String,          // Name of the booked service
    serviceDuration: String,      // Duration of the booked service
    selectedDate: Date,           // Date of the booking
    selectedTime: String,         // Time of the booking
    isPaid: Boolean,              // Payment status (paid/unpaid)
    mentorId: String,             // ID of the mentor associated with the booking
    studentName: String,          // Name of the student making the booking
    studentEmail: String,         // Email of the student making the booking
    callAbout: String,            // Purpose of the call/booking
    price: String,                // Price of the service
    bookingId: String,            // Unique identifier for the booking
    isCancelled: Boolean,         // Cancellation status (cancelled/not cancelled)
  })
);

export default StudentBooking;
