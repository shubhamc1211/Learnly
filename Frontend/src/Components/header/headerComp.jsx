/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */
import "./headerComp.css";
import React, { useState } from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { Button, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";

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
  color: showSelected
    ? theme.palette.getContrastText(grey[900])
    : theme.palette.getContrastText(grey[50]),
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
  color: showSelected
    ? theme.palette.getContrastText(grey[900])
    : theme.palette.getContrastText(grey[50]),
  backgroundColor: showSelected ? "#1D267D" : grey[50],
  "&:hover": {
    backgroundColor: showSelected ? "none" : "#D4ADFC",
  },
}));

export default function PageHeaderComp({
  pageTitle,
  changeDisplayOption,
  displayOption,
}) {
  // State variables to manage the selected component
  const [showSchedule, setShowSchedule] = useState(true);

  // Event handler for when the Schedule button is clicked
  const handleSchedule = () => {
    setShowSchedule(true);
    changeDisplayOption("Pending");
  };

  // Event handler for when the Calendar button is clicked
  const handleCalendar = () => {
    setShowSchedule(false);
    changeDisplayOption("Answered");
  };

  return (
    <div className="pagesHeaderCompDiv">
      {/* <div className="calendar-container"> */}
      <div className="pagesHeaderCompInnerDiv">
        {/* <div className="calendar-form"> */}
        <h1 className="pagesHeaderCompH1Title">{pageTitle.toUpperCase()}</h1>
        {/* <Grid item sm={12}> */}
        <Grid container spacing={2}>
          <Grid item sm={0}>
            <ScheduleButton
              variant="contained"
              onClick={handleSchedule}
              fullWidth
              showSelected={showSchedule}
            >
              Pending
            </ScheduleButton>
          </Grid>
          <Grid item sm={0}>
            <CalendarButton
              variant="contained"
              onClick={handleCalendar}
              fullWidth
              showSelected={!showSchedule}
            >
              Answered
            </CalendarButton>
          </Grid>
        </Grid>
        {/* </Grid> */}
        {/* </div> */}
      </div>
      {/* </div> */}
    </div>
  );
}
