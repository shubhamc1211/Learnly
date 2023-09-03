/**
 * This module defines the schema and model for handling user queries in a MongoDB database.
 * Author: Shubham Chauhan <sh572302@dal.ca/B00945891>
 */

// Import required modules
import mongoose, { Document, Model } from 'mongoose';

// Define the interface for the query document
export interface IQueries extends Document {
  name: string;         // Name of the person submitting the query
  email: string;        // Email of the person submitting the query
  time: string;         // Timestamp of when the query was submitted
  title: string;        // Title of the query
  content: string;      // Content or description of the query
  isResponded: boolean; // Flag indicating whether the query has been responded to
  response?: string;    // Optional response content if the query has been responded to
  mentorId: string;     // ID of the mentor associated with the query
}

// Define the schema for the queries collection
const queriesModel = new mongoose.Schema({
  name: { type: String, required: true },       // Name of the person submitting the query (required)
  email: { type: String, required: true },      // Email of the person submitting the query (required)
  time: { type: String, required: true },       // Timestamp of when the query was submitted (required)
  title: { type: String, required: true },      // Title of the query (required)
  content: { type: String, required: true },    // Content or description of the query (required)
  isResponded: { type: Boolean, required: true }, // Flag indicating whether the query has been responded to (required)
  response: { type: String, required: false },  // Optional response content if the query has been responded to
  mentorId: { type: String, required: true },   // ID of the mentor associated with the query (required)
});

// Create the Queries model using the schema
const Queries: Model<IQueries> = mongoose.model<IQueries>('Queries', queriesModel);

// Export the Queries model
export default Queries;
