/**
 * This component represents the starting point of the landing page of application.
 * It displays a grid layout containing a message component and a pictures component.
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */

// Import necessary dependencies
import React from "react";
import { Grid } from "@mui/material";

// Import component-specific styles
import "./startComp.css";

// Import sub-components
import StartMessageComp from "./startMessage/startMessageComp";
import StartPicsComp from "./startPics/startPicsComp";

// Define the main StartComp functional component
function StartComp() {
  return (
    // Outer container
    <div className="startComp">
      {/* Grid layout containing two columns */}
      <Grid container spacing={2} className="grid">
        {/* Left column for the StartMessageComp */}
        <Grid item xs={12} sm={6}>
          <StartMessageComp />
        </Grid>
        {/* Right column for the StartPicsComp */}
        <Grid item xs={12} sm={6}>
          <StartPicsComp />
        </Grid>
      </Grid>
    </div>
  );
}

// Export the StartComp component as the default export
export default StartComp;
