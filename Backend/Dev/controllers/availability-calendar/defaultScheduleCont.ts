/**
 * This module handles the controller functions for managing default schedules.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */

import { Request, Response } from "express";
import DefaultSchedule, {
  IDefaultSchedule,
} from "../../models/availability-calendar/defaultScheduleModel";
import BlockedDates from '../../models/availability-calendar/blockDatesModel';

/**
 * Save or update default schedules for a mentor.
 * @param req - Express request object.
 * @param res - Express response object.
 */
const saveDefaultSchedule = async (req: Request, res: Response) => {
  const defaultScheduleData: IDefaultSchedule[] = req.body;
  const updatedSchedules: IDefaultSchedule[] = [];
  const deletedSchedules: string[] = []; // To keep track of deleted days
  try {
    for (let index = 0; index < defaultScheduleData.length; index++) {
      const { day, startTime, endTime, mentorId } = defaultScheduleData[index];
      console.log(day);
      console.log(startTime);
      console.log(endTime);
      console.log(mentorId);

      // Check if startTime and endTime are not empty and not equal to "NAN"
      if (startTime !== '' && endTime !== '' && startTime !== 'NAN' && endTime !== 'NAN') {
        const existingSchedule: IDefaultSchedule | null = await DefaultSchedule.findOne({
          mentorId,
          day,
        });
        console.log("Existing Schedule : " + existingSchedule);
        if (existingSchedule) {
          existingSchedule.startTime = startTime;
          existingSchedule.endTime = endTime;
          const updatedSchedule = await existingSchedule.save();
          updatedSchedules.push(updatedSchedule);
        } else {
          const newSchedule: IDefaultSchedule = new DefaultSchedule({
            day,
            startTime,
            endTime,
            mentorId
          });
          const savedSchedule = await newSchedule.save();
          updatedSchedules.push(savedSchedule);
        }
      } else {
        // Check if the day exists in the database, and if it does, delete it
        const deletedSchedule = await DefaultSchedule.deleteOne({
          mentorId,
          day,
        });
        if (deletedSchedule.deletedCount > 0) {
          deletedSchedules.push(day);
        }
      }
    }

    if (updatedSchedules.length === 0 && deletedSchedules.length === 0) {
      res.status(400).json({ message: 'No valid schedules found to update or create or delete.' });
    } else {
      let message = '';
      if (updatedSchedules.length > 0) {
        const responseStatus = updatedSchedules.length === defaultScheduleData.length ? 200 : 201;
        message = responseStatus === 200 ? 'Default Schedule Updated Successfully.' : 'Default Schedule Created Successfully.';
      }
      if (deletedSchedules.length > 0) {
        message += ` Deleted days: ${deletedSchedules.join(', ')}`;
      }
      res.status(200).json({
        message,
        updatedSchedules,
        deletedSchedules,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save Default Schedule" });
  }
};

/**
 * Get default schedules for a mentor.
 * @param req - Express request object.
 * @param res - Express response object.
 */
const getDefaultSchedule = async (req: Request, res: Response) => {
  const { mentorId } = req.query;
  try {
    const defaultSchedules: IDefaultSchedule[] = await DefaultSchedule.find({
      mentorId: mentorId as string,
    });
    res.status(200).json({ defaultSchedules });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get default schedules' });
  }
};

/**
 * Get default available dates for a mentor.
 * @param req - Express request object.
 * @param res - Express response object.
 */
const getDefaultAvailableDates = async (req: Request, res: Response) => {
  const { mentorId } = req.query;
  try {
    const intlDateTimeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
    const today = new Date();
    const defaultSchedules: IDefaultSchedule[] = await DefaultSchedule.find({ mentorId: mentorId });
    const blockedDates = await BlockedDates.findOne({ mentorId });
    const availableDates: { date: string; day: string; availableHours: string[] }[] = [];
    console.log(defaultSchedules);
    const firstDayAfterCurrent = new Date(today);
    firstDayAfterCurrent.setDate(today.getDate() + 1);
    let formattedDates;
    
    if (blockedDates != null) {
      const dates = blockedDates.dates;
      formattedDates = dates.map(date => {
        const parts = date.split('-');
        const month = parseInt(parts[1]);
        const day = parseInt(parts[2]);

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedDate = `${months[month - 1]} ${day}`;
        return formattedDate;
      });
      console.log(formattedDates);
    }

    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(firstDayAfterCurrent);
      currentDate.setDate(firstDayAfterCurrent.getDate() + i);
      const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
      const matchingSchedule = defaultSchedules.find((schedule) => schedule.day === day);

      if (matchingSchedule) {
        const { startTime, endTime } = matchingSchedule;
        const availableHours: string[] = [];
        const date = currentDate.toLocaleDateString('en-US', { month: "short", day: 'numeric' });
        const formattedDateString = date.toString();
        console.log(formattedDateString);

        //if blocked dates exists & match the current date, exclude it
        if (formattedDates != null && !formattedDates.includes(formattedDateString)) {
          const startDateTimeString = formattedDateString + ' ' + startTime;
          const endDateTimeString = formattedDateString + ' ' + endTime;
          const startDateTime = new Date(startDateTimeString);
          const endDateTime = new Date(endDateTimeString);
          while (startDateTime < endDateTime) {
            availableHours.push(intlDateTimeFormatter.format(startDateTime));
            startDateTime.setHours(startDateTime.getHours() + 1);
          }
          availableDates.push({
            date,
            day,
            availableHours,
          });
        }

        // if blocked dates doesn't exists, then include the current date
        else{
          const startDateTimeString = formattedDateString + ' ' + startTime;
          const endDateTimeString = formattedDateString + ' ' + endTime;
          const startDateTime = new Date(startDateTimeString);
          const endDateTime = new Date(endDateTimeString);
          while (startDateTime < endDateTime) {
            availableHours.push(intlDateTimeFormatter.format(startDateTime));
            startDateTime.setHours(startDateTime.getHours() + 1);
          }
          availableDates.push({
            date,
            day,
            availableHours,
          });
        }
    }
  }
    res.status(200).json({ availableDates });
}
  catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Failed to get available dates' });
}
};

export default { saveDefaultSchedule, getDefaultSchedule, getDefaultAvailableDates };