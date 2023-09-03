/**
 * This is the API routes for managing calendar settings.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */
import express from "express";
import calendarsettingsCont from "../../controllers/availability-calendar/calendarsettingsCont";

const router = express.Router();

// Route to save calendar settings
router.post("/saveCalendarSettings", calendarsettingsCont.saveCalendarSettings);

// Route to get calendar settings
router.get("/getCalendarSettings", calendarsettingsCont.getCalendarSettings);

export default router;
