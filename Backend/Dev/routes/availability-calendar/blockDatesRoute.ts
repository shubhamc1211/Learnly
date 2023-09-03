/**
 * This is the API routes for managing blocked dates.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */
import express from "express";
import blockDatesCont from "../../controllers/availability-calendar/blockDatesCont";

const router = express.Router();

// Route to block dates
router.post("/blockDates", blockDatesCont.blockDates);

// Route to get unavailable dates
router.get("/getUnavailableDates", blockDatesCont.getUnavailableDates);
 
export default router;
