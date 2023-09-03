/**
 * @author Shivam Lakhanpal <sh475218@dal.ca/B00932887>
 */
import React from "react";
import { Grid, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import LeftViewComponent from "../../../Components/MentorServiceBooking/bookingSchedule/leftViewComp";
import RightViewComponent from "../../../Components/MentorServiceBooking/bookingSchedule/rightViewComp";
import "./bookingSchedulePage.css";

const BookingSchedulePage = () => {
  const location = useLocation();
  const service = location.state.service;
  const mentorId = location.state.mentorId;
  const mentorName = location.state.mentorName;
  const serviceName = service.serviceName;
  const serviceDuration = service.time;
  const servicePrice = service.price;

  return (
    <Grid container spacing={4} className="mentor-booking-container">
      <Grid item xs={12} md={4} className="left-component">
        <Box className="mentor-left-box">
          <LeftViewComponent
            serviceName={serviceName}
            serviceDuration={serviceDuration}
            servicePrice={servicePrice}
            mentorId={mentorId}
            mentorName={mentorName}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={8} className="right-component">
        <Box className="mentor-right-box">
          <RightViewComponent
            serviceName={serviceName}
            serviceDuration={serviceDuration}
            servicePrice={servicePrice}
            mentorId={mentorId}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default BookingSchedulePage;
