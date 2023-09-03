/**
 * This is the API routes for managing alternate schedules.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */ 
import express from "express";
import alternateScheduleCont from "../../controllers/availability-calendar/alternateScheduleCont";

const router = express.Router();

// Route to save alternate schedule
router.post("/saveAlternateSchedule", alternateScheduleCont.saveAlternateSchedule);

// Route to get alternate schedule
router.get("/getAlternateSchedule", alternateScheduleCont.getAlternateSchedule);

// Route to get available dates from alternate schedule
router.get("/getAlternateAvailableDates", alternateScheduleCont.getAlternateAvailableDates);
 
export default router;
