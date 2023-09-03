/**
 * @author Shivam Lakhanpal <sh475218@dal.ca/B00932887>
 */

import React, { useState, useEffect, useRef } from "react";
import { Paper, Typography, Box, IconButton, Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { grey } from "@mui/material/colors";
import axios from 'axios';
import { MENTOR_DEFAULT_AVAILABILITY_URL, MENTOR_ALTERNATE_AVAILABILITY_URL, GET_SELECTED_SCHEDULE } from "../../../utils/apiUrls";

const SelectableBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  border: "1px solid #ccc",
  margin: "10px",
  cursor: "pointer",
  borderRadius: "8px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
  },
  "&.selected": {
    backgroundColor: "#e3e3e3",
    color: theme.palette.common.black,
    borderColor: "#00000",
    fontWeight: "bold",
  },
  flex: "1 0 80px",
  minWidth: "80px",
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
  height: "100%",
  padding: "10px 30px",
  fontWeight: 600,
  color: theme.palette.getContrastText(grey[900]),
  backgroundColor: "#1D267D",
  "&:hover": {
    backgroundColor: "#0C134F",
  },
}));

const RightViewComponent = ({
  mentorId,
  mentorName,
  serviceName,
  serviceDuration,
  servicePrice,
}) => {
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const datesContainerRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const apiUrl = GET_SELECTED_SCHEDULE;
        const params = {
          mentorId: mentorId,
        };
        const scheduleResponse = await axios.get(apiUrl, { params });
        console.log(scheduleResponse);
        const fetchedScheduleData = scheduleResponse?.data?.switchScheduleSettings;
        console.log(fetchedScheduleData);
        let AVAILABILITY_URL = ""
        if(fetchedScheduleData.isDefaultSchedule){
          AVAILABILITY_URL = MENTOR_DEFAULT_AVAILABILITY_URL;
        }
        else{
          AVAILABILITY_URL = MENTOR_ALTERNATE_AVAILABILITY_URL;
        }
        const response = await fetch(
          AVAILABILITY_URL + "?mentorId=" + mentorId
        );
        let data = await response.json();

        if (data.availableDates && Array.isArray(data.availableDates)) {
          setAvailability(data.availableDates);

          if (data.availableDates.length > 0) {
            setSelectedDate(data.availableDates[0].date);
            if (
              data.availableDates[0].availableHours &&
              data.availableDates[0].availableHours.length > 0
            ) {
              setSelectedTime(data.availableDates[0].availableHours[0]);
            }
          }
        } else {
          setError("API returned data that is not an array.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [mentorId]);

  const handleScrollLeft = () => {
    datesContainerRef.current.scrollTo({
      left: datesContainerRef.current.scrollLeft - 120,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    datesContainerRef.current.scrollTo({
      left: datesContainerRef.current.scrollLeft + 120,
      behavior: "smooth",
    });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const ScrollButton = ({ onClick, direction }) => {
    return (
      <IconButton onClick={onClick}>
        {direction === "left" ? <ArrowBack /> : <ArrowForward />}
      </IconButton>
    );
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Typography variant="h6" sx={{ marginBottom: "10px" }}>
          Pick a date
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflowX: "auto",
            marginBottom: "20px",
            width: "100%",
          }}
        >
          <ScrollButton onClick={handleScrollLeft} direction="left">
            <ArrowBack />
          </ScrollButton>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
            }}
            ref={datesContainerRef}
          > 
            {availability.map((item) => (
              <SelectableBox
                key={item.date}
                className={item.date === selectedDate ? "selected" : ""}
                onClick={() => handleDateClick(item.date)}
              >
                <Typography variant="h5">
                  {format(new Date(item.date), "MMM dd")}
                </Typography>
                <Typography variant="body1">
                  {item.day}
                </Typography>
              </SelectableBox>
            ))}
          </Box>
          <ScrollButton onClick={handleScrollRight} direction="right">
            <ArrowForward />
          </ScrollButton>
        </Box>

        <Typography
          variant="h6"
          sx={{ marginBottom: "10px", paddingTop: "20px" }}
        >
          Pick a time
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {selectedDate &&
            availability
              .find((item) => item.date === selectedDate)
              ?.availableHours.map((time) => (
                <SelectableBox
                  component={Paper}
                  sx={{ height: "auto" }}
                  key={time}
                  className={time === selectedTime ? "selected" : ""}
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </SelectableBox>
              ))}
        </Box>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "12px",
        }}
      >
        <ConfirmButton
          variant="contained"
          color="primary"
          onClick={() => { 
            navigate("/studentDetails", {
              state: {
                selectedTime,
                selectedDate,
                mentorId,
                serviceName,
                serviceDuration,
                servicePrice,
              },
            });
          }}
          sx={{
            minWidth: "97%",
            backgroundColor: "#1D267D",
            "&:hover": {
              backgroundColor: "#0C134F",
            },
          }}
        >
          Confirm Details
        </ConfirmButton>
      </Box>
    </Paper>
  );
};

export default RightViewComponent;
