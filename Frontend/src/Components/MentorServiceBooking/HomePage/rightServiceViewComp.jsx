/**
 * @author Shivam Lakhanpal <sh475218@dal.ca/B00932887>
 */
import React, { useEffect, useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Card, Typography, Grid, Box, Divider } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./rightServiceViewComp.css";
import {
  GET_SERVICE_DETAILS,
  GET_MENTOR_DETAILS,
} from "../../../utils/apiUrls";

const RightServiceViewComp = () => {
  const [mentor, setMentor] = useState({});
  const [serviceDetails, setServiceDetails] = useState([]);
  const location = useLocation();
  const mentorId = location.pathname.split("/")[2];
  useEffect(() => {
    fetch(GET_MENTOR_DETAILS + "/" + mentorId)
      .then((response) => response.json())
      .then((data) => setMentor(data.user));
  }, [mentorId]);

  const mentorName = mentor ? `${mentor.firstName} ${mentor.lastName}` : "";

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_SERVICE_DETAILS + "/" + mentorId);

        setServiceDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch mentor service details", error);
      }
    };
    fetchData();
  }, [mentorId]);

  const handleServiceClick = (service) => {
    console.log(mentorName);
    navigate("/bookingSchedule", { state: { service, mentorId, mentorName } });
  };

  return (
    <Grid container spacing={4} className="grid-container">
      {serviceDetails.map((service, index) => (
        <Grid item xs={12} sm={6} md={6} key={index}>
          <Card
            elevation={5}
            className="service-card"
            onClick={() => handleServiceClick(service)}
          >
            <Box className="icon-box">
              <CalendarMonthIcon color="disabled" />
            </Box>
            <Typography variant="h6" className="service-name">
              {service.serviceName}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box className="detail-box">
              <Typography variant="body1">{service.time} minutes</Typography>
              <Typography variant="body1">${service.price}</Typography>
            </Box>
            <Box className="icon-box-right">
              <KeyboardArrowRightIcon color="disabled" />
            </Box>
          </Card>
        </Grid>
      ))}
      {serviceDetails.length % 2 !== 0 && <Grid item xs={12} sm={6} md={6} />}
    </Grid>
  );
};

export default RightServiceViewComp;
