/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */

// Importing the necessary modules
import express from "express";
import { saveService } from "../../controllers/servicesController/putServicesCont";

const router = express.Router();

// Defining routes and associating them with respective controller functions
router.post("/saveService", saveService);


const putServicesRoute = router
export default  putServicesRoute;