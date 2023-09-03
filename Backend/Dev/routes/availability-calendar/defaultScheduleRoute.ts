/**
 * This is the API routes for managing default schedules.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */ 
import express from "express";
import defaultScheduleCont from "../../controllers/availability-calendar/defaultScheduleCont";

const router = express.Router();

// Route to save default schedule
router.post("/saveDefaultSchedule", defaultScheduleCont.saveDefaultSchedule);

// Route to get default schedule
router.get("/getDefaultSchedule", defaultScheduleCont.getDefaultSchedule);

// Route to get default available dates
router.get("/getDefaultAvailableDates", defaultScheduleCont.getDefaultAvailableDates);

export default router;
