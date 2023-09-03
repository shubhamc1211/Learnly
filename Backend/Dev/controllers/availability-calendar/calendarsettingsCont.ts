/**
 * This module handles the controller functions for managing calendar settings.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */

import { Request, Response } from "express";
import CalendarSettings from '../../models/availability-calendar/calendarSettingsModel';

/**
 * Interface for extending Request to include specific body properties.
 */
interface CalendarSettingsRequest extends Request {
  body: {
    mentorId: string;
    timezone: string;
    meetingLink: string;
    bookingPeriod: string;
    noticePeriod: string;
  };
}

/**
 * Save or update calendar settings for a mentor.
 * @param req - Express request object.
 * @param res - Express response object.
 */
const saveCalendarSettings = async (req: CalendarSettingsRequest, res: Response) => {
  const { mentorId, timezone, meetingLink, bookingPeriod, noticePeriod } = req.body;
  console.log(mentorId);
  console.log(timezone);
  console.log(meetingLink);
  console.log(bookingPeriod);
  console.log(noticePeriod);
  try {
    let calendarSettings = await CalendarSettings.findOne({ mentorId });
    console.log(calendarSettings);
    if(calendarSettings){
      calendarSettings.timezone = timezone;
      calendarSettings.meetingLink = meetingLink;
      calendarSettings.bookingPeriod = bookingPeriod;
      calendarSettings.noticePeriod = noticePeriod;
    }
    else{
      calendarSettings = new CalendarSettings({
        mentorId,
        timezone,
        meetingLink,
        bookingPeriod,
        noticePeriod,
      });
    }
    await calendarSettings.save();  
    res.send({ message: "Calendar Settings Saved!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to save Calendar Settings" });
  }
};

/**
 * Get calendar settings for a mentor.
 * @param req - Express request object.
 * @param res - Express response object.
 */
const getCalendarSettings = async (req: CalendarSettingsRequest, res: Response) => {
  const { mentorId } = req.query;
  try {
    const calendarSettings = await CalendarSettings.findOne({ mentorId });
    if (calendarSettings) {
      res.status(200).json({ calendarSettings });
    }
    else {
      res.status(404).json({ message: 'Calendar settings not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get calendar settings' });
  }
};

export default { saveCalendarSettings, getCalendarSettings };
