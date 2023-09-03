/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */

// Importing the necessary modules
import express from "express";
import deleteServicesCont from "../../controllers/servicesController/deleteServicesCont";

const router = express.Router();

// Defining routes and associating them with respective controller functions
router.post("/deleteService", deleteServicesCont.deleteService);


const deleteServicesRoute = router
export default  deleteServicesRoute;