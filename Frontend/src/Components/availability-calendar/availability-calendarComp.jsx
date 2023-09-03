  /**
 * @author Taranjot Singh <tr548284@dal.ca/B00945917>
 */ 
  import "./availability-calendarComp.css";
  import React, { useState } from "react";
  import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
  import ScheduleComp from "../../Components/availability-calendar/schedule/scheduleComp";
  import CalendarComp from "../../Components/availability-calendar/calendar/calendarComp";
  import { Button, Grid } from "@mui/material";
  import { grey } from "@mui/material/colors";
  import UseMediaQuery from "@mui/material/useMediaQuery";
  
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
  
  const ScheduleButton = styled(Button)(({ theme, showSelected }) => ({
    height: "100%",
    padding: "10px 30px", 
    fontWeight: 600,
    borderRadius: "50px",
    pointerEvents: showSelected ? "none" : "auto",
    color: showSelected ? theme.palette.getContrastText(grey[900]) : theme.palette.getContrastText(grey[50]),
    backgroundColor: showSelected ? "#1D267D" : grey[50],
    "&:hover": {
      backgroundColor: showSelected ? "none" : "#D4ADFC",
    },
  }));
  
  const CalendarButton = styled(Button)(({ theme, showSelected }) => ({
    height: "100%",
    padding: "10px 30px", 
    fontWeight: 600,
    borderRadius: "50px",
    pointerEvents: showSelected ? "none" : "auto",
    color: showSelected ? theme.palette.getContrastText(grey[900]) : theme.palette.getContrastText(grey[50]),
    backgroundColor: showSelected ? "#1D267D" : grey[50],
    "&:hover": {
      backgroundColor: showSelected ? "none" : "#D4ADFC",
    },
  }));
  
  export default function AvailabilityCalendar() {
    // State variables to manage the selected component
    const [showSchedule, setShowSchedule] = useState(true);
    const isSmallScreen = UseMediaQuery((theme) => theme.breakpoints.down("sm"));
  
    // Event handler for when the Schedule button is clicked
    const handleSchedule = () => {
      setShowSchedule(true);
    };
  
    // Event handler for when the Calendar button is clicked
    const handleCalendar = () => {
      setShowSchedule(false);
    };
  
    return (
      <div className="Calendar">
        <div className="calendar-container">
          <div className="left-schedule">
            <div className="calendar-form">
              <h1 className="calendar-form-header">AVAILABILITY</h1>
              <Grid item sm={12}>
                <Grid container spacing={2}>
                  <Grid item sm={0}>
                    <ScheduleButton
                      variant="contained"
                      onClick={handleSchedule}
                      fullWidth
                      showSelected={showSchedule}
                      style= {isSmallScreen ? {width : "130px", height : "50px", fontSize : "12px"} : {} }
                      className="schedule-button"
                    >
                      Schedule
                    </ScheduleButton>
                  </Grid>
                  <Grid item sm={0}>
                    <CalendarButton
                      variant="contained"
                      onClick={handleCalendar}
                      fullWidth
                      showSelected={!showSchedule}
                      style= {isSmallScreen ? {width : "130px", height : "50px", fontSize : "12px"} : {} }
                      className="calendar-button"
                    >
                      Calendar Settings
                    </CalendarButton>
                  </Grid>
                </Grid>
              </Grid>
              <br></br>
              <hr />
              <br></br>
              <ThemeProvider theme={theme}>
                {showSchedule ? <ScheduleComp /> : <CalendarComp />}
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
    );
  }
  