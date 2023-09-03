/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */

// Importing the necessary modules
import express from "express";
import updateServicesCont from "../../controllers/servicesController/updateServicesCont";

const router = express.Router();

// Defining routes and associating them with respective controller functions
router.post("/updateService", updateServicesCont.updateService);


const updateServicesRoute = router
export default  updateServicesRoute;