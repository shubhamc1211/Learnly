/**
* @author Taranjot Singh <tr548284@dal.ca/B00945917>
*/
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import "./calendarComp.css";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import EventIcon from '@mui/icons-material/Event';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { createTheme, styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import axios from 'axios';
import { SAVE_CALENDAR_SETTINGS, GET_CALENDAR_SETTINGS } from "../../../utils/apiUrls";
import UseMediaQuery from "@mui/material/useMediaQuery";

// creating theme
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 330,
      sm: 380,
      md: 430,
      lg: 1100,
      xl: 1450,
    },
  },
});

// setting up timezones
const timezones = [
  { value: "GMT-10:00", label: "(GMT-10:00) Hawaii" },
  { value: "GMT-8:00", label: "(GMT-8:00) Alaska" },
  { value: "GMT-7:00", label: "(GMT-7:00) Pacific Time" },
  { value: "GMT-6:00", label: "(GMT-6:00) Mountain Time" },
  { value: "GMT-5:00", label: "(GMT-5:00) Central Time" },
  { value: "GMT-4:00", label: "(GMT-4:00) Eastern Time" },
  { value: "GMT-3:00", label: "(GMT-3:00) Atlantic Time" },
  { value: "GMT-2:00", label: "(GMT-2:00) Greenland" },
  { value: "GMT-1:00", label: "(GMT-1:00) Cape Verde Islands" },
  { value: "GMT+0:00", label: "(GMT+0:00) UTC" },
  { value: "GMT+1:00", label: "(GMT+1:00) London" },
  { value: "GMT+2:00", label: "(GMT+2:00) Berlin" },
  { value: "GMT+3:00", label: "(GMT+3:00) Istanbul" },
  { value: "GMT+4:00", label: "(GMT+4:00) Abu Dhabi" },
  { value: "GMT+5:30", label: "(GMT+5:30) New Delhi" },
  { value: "GMT+6:00", label: "(GMT+6:00) Dhaka" },
  { value: "GMT+7:00", label: "(GMT+7:00) Bangkok" },
  { value: "GMT+8:00", label: "(GMT+8:00) Perth" },
  { value: "GMT+9:00", label: "(GMT+9:00) Tokyo" },
  { value: "GMT+10:00", label: "(GMT+10:00) Sydney" },
  { value: "GMT+11:00", label: "(GMT+11:00) Soloman Islands" },
  { value: "GMT+12:00", label: "(GMT+12:00) Auckland" },
  { value: "GMT+13:00", label: "(GMT+13:00) Nuku'alofa" },
];

// setting up booking-periods
const bookingPeriods = [
  { value: "1 week", label: "1 week" },
  { value: "2 weeks", label: "2 weeks" },
  { value: "3 weeks", label: "3 weeks" },
  { value: "4 weeks", label: "4 weeks" },
  { value: "2 months", label: "2 months" },
  { value: "3 months", label: "3 months" },
];

// setting up notice-periods
const noticePeriodUnits = [
  { value: "minutes", label: "Minutes" },
  { value: "hours", label: "Hours" },
  { value: "days", label: "Days" },
  { value: "weeks", label: "Weeks" },
];

// Creating a save button
const SaveButton = styled(Button)(({ theme }) => ({
  height: "100%",
  width: "25%",
  fontWeight: 600,
  marginTop: "3%",
  marginLeft: "25%",
  color: theme.palette.getContrastText(grey[900]),
  backgroundColor: "#1D267D",
  "&:hover": {
    backgroundColor: "#0C134F",
  },
}));

export default function Calendar() {
  // state variables
  const [timezone, setTimezone] = useState("GMT-3:00");
  const [meetingLink, setMeetingLink] = useState("");
  const [bookingPeriod, setBookingPeriod] = useState("");
  const [noticePeriodValue, setNoticePeriodValue] = useState("");
  const [noticePeriodUnit, setNoticePeriodUnit] = useState("");
  const [calendarSettings, setCalendarSettings] = useState({
    timezone: "",
    meetingLink: "",
    noticePeriod: "",
    bookingPeriod: "",
  });
  const [localUser, setLocalUser] = useState(null);

  // setting up media-queries
  const isLargeScreen = UseMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isMediumScreen = UseMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmallScreen = UseMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isExtraSmallScreen = UseMediaQuery((theme) => theme.breakpoints.down("xs"));

  // functions for handling calendar settings

  const handleTimezoneChange = (event) => {
    setTimezone(event.target.value);
  };

  const handleMeetingLinkChange = (event) => {
    setMeetingLink(event.target.value);
  };

  const handleBookingPeriodChange = (event) => {
    setBookingPeriod(event.target.value);
  };

  const handleNoticePeriodChange = (event) => {
    setNoticePeriodValue(event.target.value);
  };

  const handleNoticePeriodUnitChange = (event) => {
    setNoticePeriodUnit(event.target.value);
  };

  const handleSaveCalendarSettings = async () => {
    console.log("Selected Timezone:", timezone);
    console.log("Meeting Link:", meetingLink);
    console.log("Booking Period:", bookingPeriod);
    const noticePeriod = noticePeriodValue + " " + noticePeriodUnit;
    console.log("Notice Period:", noticePeriod);

    if (meetingLink.trim() !== "" && !/^https?:\/\//.test(meetingLink)) {
      toast.error("Invalid meeting link format. Please use a valid URL starting with 'http://' or 'https://'.");
      return;
    }

    try {
      const calendarSettingsData = {
        timezone,
        meetingLink,
        bookingPeriod,
        noticePeriod,
        mentorId: localUser.userName,
      }
      console.log(calendarSettingsData);
      const apiUrl = SAVE_CALENDAR_SETTINGS;
      const response = await axios.post(apiUrl, calendarSettingsData);
      if (response.status === 201) {
        toast.success("Calendar Settings Saved Successfully!");
      } else if (response.status === 200) {
        toast.success("Calendar Settings Updated Successfully");
      } else {
        toast.error("Failed to Block Dates");
      }
    }
    catch (error) {
      console.log(error);
      toast.error('Failed to Save Calendar Settings');
    }
  };

  // getting the user
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    console.log("Printing local user:", localUser);
    setLocalUser(localUser);
    const fetchedCalendarSettings = async () => {
      try {
        const apiUrl = GET_CALENDAR_SETTINGS;
        const params = {
          mentorId: localUser.userName,
        };
        const response = await axios.get(apiUrl, { params });
        const fetchedSettings = response?.data?.calendarSettings;
        console.log(fetchedSettings);
        if (fetchedSettings) {
          setCalendarSettings(fetchedSettings);
          setTimezone(fetchedSettings.timezone);
          setMeetingLink(fetchedSettings.meetingLink);
          setBookingPeriod(fetchedSettings.bookingPeriod);
          const [noticePeriodValue, noticePeriodUnit] = fetchedSettings.noticePeriod.split(" ");
          setNoticePeriodValue(noticePeriodValue);
          setNoticePeriodUnit(noticePeriodUnit);
        }
      } catch (error) {
        if (error.response.status == 404) {
          console.log(error.response.data.message);
        }
        else {
          console.log(error);
          toast.error('Failed to fetch calendar settings');
        }

      }
    };

    fetchedCalendarSettings();
  }, []);


  return (
    <>
      <table>
        <tbody>
          <tr className="flex-container">
            <td className="text-settings">
              <h3 style={{ display: "flex", alignItems: "center" }}><LocationOnIcon style={{ verticalAlign: "middle", marginRight: 8 }} />Timezone</h3>
              <h4 className="setting-heading">Required for timely communications</h4>
            </td>
            <td className="input-values">
              <FormControl fullWidth>
                <InputLabel htmlFor="timezone-select">Select Timezone</InputLabel>
                <Select
                  value={timezone}
                  onChange={handleTimezoneChange}
                  label="Timezone"
                  inputProps={{
                    name: 'timezone',
                    id: 'timezone-select',
                  }}
                  style={isExtraSmallScreen ? { width: 250, marginLeft: 30 } : isSmallScreen ? { width: 310, marginLeft: 30 } : isMediumScreen ? { width: 350, marginLeft: 30 } : { width: 400 }}
                >
                  {timezones.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </td>
          </tr>
          <tr className="flex-container">
            <td className="text-settings">
              <h3 style={{ display: "flex", alignItems: "center" }}><InsertLinkIcon style={{ verticalAlign: "middle", marginRight: 8 }} />Personal meeting link</h3>
              <h4 className="setting-heading">All your 1:1 meetings will be redirected to this URL</h4>
            </td>
            <td className="input-values">
              <TextField
                fullWidth
                label="Add Meeting Link"
                variant="outlined"
                value={meetingLink}
                onChange={handleMeetingLinkChange}
                style={isExtraSmallScreen ? { width: 250, marginLeft: 30 } : isSmallScreen ? { width: 310, marginLeft: 30 } : isMediumScreen ? { width: 350, marginLeft: 30 } : { width: 400 }}
              />
            </td>
          </tr>
          <tr className="flex-container">
            <td className="text-settings">
              <h3 style={{ display: "flex", alignItems: "center" }}><EventIcon style={{ verticalAlign: "middle", marginRight: 8 }} />Booking Period</h3>
              <h4 className="setting-heading">How far in the future can attendees book</h4>
            </td>
            <td className="input-values">
              <FormControl fullWidth>
                <InputLabel htmlFor="booking-period-select" style={isMediumScreen ? { paddingLeft: 25 } : {}}>Select Booking Period</InputLabel>
                <Select
                  value={bookingPeriod}
                  onChange={handleBookingPeriodChange}
                  label="Booking Period"
                  inputProps={{
                    name: 'bookingPeriod',
                    id: 'booking-period-select',
                  }}
                  style={isExtraSmallScreen ? { width: 250, marginLeft: 30 } : isSmallScreen ? { width: 310, marginLeft: 30 } : isMediumScreen ? { width: 350, marginLeft: 30 } : { width: 400 }}
                >
                  {bookingPeriods.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </td>
          </tr>
          <tr className="flex-container">
            <td className="text-settings">
              <h3 style={{ display: "flex", alignItems: "center" }}><EventNoteIcon style={{ verticalAlign: "middle", marginRight: 8 }} />Notice Period</h3>
              <h4 className="setting-heading">Set the minimum amount of notice that is required</h4>
            </td>
            <td className="input-values">
              <div id="notice-period" style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Add Notice"
                  value={noticePeriodValue}
                  onChange={handleNoticePeriodChange}
                  inputProps={{
                    min: 0,
                  }}
                  style={{ width: 250 }}
                />
                <FormControl style={{ minWidth: 150 }}>
                  <InputLabel htmlFor="booking-period-select">Period</InputLabel>
                  <Select
                    value={noticePeriodUnit}
                    onChange={handleNoticePeriodUnitChange}
                    label="Period"
                    inputProps={{
                      name: 'noticePeriodUnit',
                      id: 'notice-period-unit',
                    }}

                  >
                    {noticePeriodUnits.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <ToastContainer position="top-center" />
      <SaveButton
        variant="contained"
        fullWidth
        onClick={handleSaveCalendarSettings}
        style={isMediumScreen ? { width: "100%", marginLeft: "3px" } : isLargeScreen ? { width: "40%", marginLeft: "190px" } : {}}
      >
        Save Calendar Settings
      </SaveButton>
    </>
  );
}
