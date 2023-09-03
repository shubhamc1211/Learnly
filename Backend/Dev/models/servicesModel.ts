/**
 * This module defines the schema and model for services offered by mentors in a MongoDB database.
 * Author: Shubham Chauhan <sh572302@dal.ca/B00945891>
 */

// Import required modules
import mongoose, { Document, Model } from 'mongoose';

// Define the interface for the service document
export interface IServices extends Document {
  serviceName: string;      // Name of the service
  time: string;             // Timestamp of when the service information was added
  price: string;            // Price of the service
  description: string;      // Description of the service (optional)
  code: string;             // Service code or identifier (optional)
  percentage: string;       // Percentage value associated with the service (optional)
  serviceType: string;      // Type or category of the service
  mentorId: string;         // ID of the mentor offering the service
}

// Define the schema for the services collection
const servicesModel = new mongoose.Schema({
  serviceName: { type: String, required: true },      // Name of the service (required)
  time: { type: String, required: true },             // Timestamp of when the service information was added (required)
  price: { type: String, required: true },            // Price of the service (required)
  description: { type: String, required: false },     // Description of the service (optional)
  code: { type: String, required: false },            // Service code or identifier (optional)
  percentage: { type: String, required: false },      // Percentage value associated with the service (optional)
  serviceType: { type: String, required: true },      // Type or category of the service (required)
  mentorId: { type: String, required: true },         // ID of the mentor offering the service (required)
});

// Create the Services model using the schema
const Services: Model<IServices> = mongoose.model<IServices>('Services', servicesModel);

// Export the Services model
export default Services;
