import React from "react";
import { Outlet } from "react-router-dom";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import "./app.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const StudentBookingApp = () => {
  return (
    <div className="app">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Outlet />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default StudentBookingApp;
