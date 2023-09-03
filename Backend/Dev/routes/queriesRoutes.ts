/**
 * Author: Shubham Chauhan <sh572302@dal.ca/B00945891>
 * Description: This module defines the routes for query-related operations.
 */

// Importing the necessary modules
import express from "express";
import queriesCont from "../controllers/queriesCont"; // Importing the queries controller

// Creating an instance of the Express router
const router = express.Router();

// Defining routes and associating them with respective controller functions
router.post("/getQueries", queriesCont.getQueries); // Route to get queries
router.post("/sendResponse", queriesCont.sendResponse); // Route to send a response to a query
router.post("/saveQuery", queriesCont.saveQuery); // Route to save a new query
router.post("/deleteQuery", queriesCont.deleteQuery); // Route to delete a query

// Exporting the router instance as queriesRoutes
const queriesRoutes = router;
export default queriesRoutes;
