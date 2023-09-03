/**
 * @author Shivam Lakhanpal <sh475218@dal.ca/B00932887>
 */
import express from "express";

import getServiceCont from "../../controllers/servicesController/getServiceCont";
const router = express.Router();


router.get("/services/:mentorId", getServiceCont.getService);

const getServiceRoute = router;
export default getServiceRoute;
