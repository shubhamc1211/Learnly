/**
 * This module handles the controller functions for switching and getting selected schedules.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */

import { Request, Response } from "express";
import User from "../../models/usersModel";

/**
 * Switches the mentor's schedule between default and alternate.
 * @param req - Express request object.
 * @param res - Express response object.
 */
const switchSchedule = async (req: Request, res: Response) => {
    const { mentorId, scheduleName } = req.body;
    console.log(mentorId);
     console.log(scheduleName);
    try {
        if(scheduleName == "alternate"){
            let calendarSettings = await User.updateOne({userName: mentorId}, {isDefaultSchedule : false});
            console.log(calendarSettings);
            res.send({ message: "Switched to alternate schedule!" });
        }
        else{
            let calendarSettings = await User.updateOne({userName: mentorId}, {isDefaultSchedule : true});
            console.log(calendarSettings);
            res.send({ message: "Switched to default schedule!" });
        }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to switch schedule" });
  }
};

/**
 * Get the mentor's currently selected schedule (default or alternate).
 * @param req - Express request object.
 * @param res - Express response object.
 */
const getSelectedSchedule = async (req: Request, res: Response) => {
    const { mentorId } = req.query;
    console.log(mentorId);
    try {
      const switchScheduleSettings = await User.findOne({userName : mentorId});
      if (switchScheduleSettings) {
        res.status(200).json({ switchScheduleSettings });
      }
      else {
        res.status(404).json({ message: 'Schedule data not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get selected schedule' });
    }
  };

export default { switchSchedule, getSelectedSchedule };