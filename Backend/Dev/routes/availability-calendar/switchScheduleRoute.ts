/**
 * This is the API routes for managing schedule switching.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */ 
import express from "express";
import switchScheduleCont from "../../controllers/availability-calendar/switchScheduleCont";

const router = express.Router();

// Route to switch schedule
router.post("/switchSchedule", switchScheduleCont.switchSchedule);

// Route to get selected schedule
router.get("/getSelectedSchedule", switchScheduleCont.getSelectedSchedule);

export default router;
