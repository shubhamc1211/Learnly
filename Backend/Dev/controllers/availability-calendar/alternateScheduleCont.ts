/**
 * This module handles the controller functions for managing alternate schedules.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */

import { Request, Response } from 'express';
import AlternateSchedule, { IAlternateSchedule } from '../../models/availability-calendar/alternateScheduleModel';
import BlockedDates from '../../models/availability-calendar/blockDatesModel';

/**
 * Save or update alternate schedules.
 * @param req - Express request object.
 * @param res - Express response object.
 */
const saveAlternateSchedule = async (req: Request, res: Response) => {
  const alternateScheduleData: IAlternateSchedule[] = req.body;
  const updatedSchedules: IAlternateSchedule[] = [];
  const deletedSchedules: string[] = []; // To keep track of deleted days
  try {
    for (let index = 0; index < alternateScheduleData.length; index++) {
      const { day, startTime, endTime, mentorId } = alternateScheduleData[index];
      console.log(day);
      console.log(startTime);
      console.log(endTime);
      console.log(mentorId);

      // Check if startTime and endTime are not empty and not equal to "NAN"
      if (startTime !== '' && endTime !== '' && startTime !== 'NAN' && endTime !== 'NAN') {
        const existingSchedule: IAlternateSchedule | null = await AlternateSchedule.findOne({
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
          const newSchedule: IAlternateSchedule = new AlternateSchedule({
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
        const deletedSchedule = await AlternateSchedule.deleteOne({
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
        const responseStatus = updatedSchedules.length === alternateScheduleData.length ? 200 : 201;
        message = responseStatus === 200 ? 'Alternate Schedule Updated Successfully.' : 'Alternate Schedule Created Successfully.';
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
    res.status(500).json({ error: 'Failed to save Alternate Schedule' });
  }
};

/**
 * Get alternate schedules for a mentor.
 * @param req - Express request object.
 * @param res - Express response object.
 */
const getAlternateSchedule = async (req: Request, res: Response) => {
  const { mentorId } = req.query;
  try {
    const alternateSchedules: IAlternateSchedule[] = await AlternateSchedule.find({
      mentorId: mentorId as string,
    });
    res.status(200).json({ alternateSchedules });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get default schedules' });
  }
};

/**
 * Get available dates based on alternate schedules.
 * @param req - Express request object.
 * @param res - Express response object.
 */
const getAlternateAvailableDates = async (req: Request, res: Response) => {
  const { mentorId } = req.query;
  try {
    const intlDateTimeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
    const today = new Date();
    const alternateSchedules: IAlternateSchedule[] = await AlternateSchedule.find({ mentorId: mentorId });
    const blockedDates = await BlockedDates.findOne({ mentorId });
    const availableDates: { date: string; day: string; availableHours: string[] }[] = [];

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
      const matchingSchedule = alternateSchedules.find((schedule) => schedule.day === day);

      if (matchingSchedule) {
        const { startTime, endTime } = matchingSchedule;
        const availableHours: string[] = [];
        const date = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
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

export default { saveAlternateSchedule, getAlternateSchedule, getAlternateAvailableDates };
