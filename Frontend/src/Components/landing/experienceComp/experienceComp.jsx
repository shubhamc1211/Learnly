/**
 * This component represents the main experience section of the application.
 * It displays the top message component.
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */

// Import necessary dependencies
import React from "react";
import { Grid } from "@mui/material";

// Import component-specific styles
import "./experienceComp.css";

// Import sub-component
import TopMessageComp from "./topMessage/topMessageComp";

// Define the ExperienceComp functional component
function ExperienceComp() {
  // Render the component
  return (
    <div className="experienceComp">
      {/* Grid container for layout */}
      <Grid container spacing={2} className="grid">
        {/* Top message section */}
        <Grid item xs={12} sm={12}>
          {/* Display the TopMessageComp */}
          <TopMessageComp />
        </Grid>
      </Grid>
    </div>
  );
}

// Export the ExperienceComp component as the default export
export default ExperienceComp;
