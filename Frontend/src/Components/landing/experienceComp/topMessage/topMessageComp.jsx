/**
 * This component displays the introductory message and category selection buttons on the top section of the starting page.
 * It allows users to select a category and displays relevant content using the DisplayCardComp component.
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */

// Import necessary dependencies
import { Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import DisplayCardComp from "../displayCard/displayCardComp";

// Import component-specific styles
import "./topMessageComp.css";

// Define the TopMessageComp functional component
function TopMessageComp() {
  // State to keep track of the selected button category
  const [buttonCat, setButtonCat] = useState("Data");

  // Styled component for the category selection buttons
  const CardTypeButton = styled(Button)(({ theme }) => ({
    padding: "10px 30px",
    fontWeight: 600,
    borderRadius: "20px",
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: "#1D267D",
    "&:hover": {
      backgroundColor: "#0C134F",
    },
  }));

  // Function to handle the category selection button click
  const handleStartMyPage = (e) => {
    setButtonCat(e.target.value); // Update the selected category based on the clicked button
  };

  // Render the component
  return (
    <div className="topMessageComp">
      {/* Grid container for layout */}
      <Grid container spacing={4}>
        {/* Heading */}
        <Grid item sm={12}>
          <Typography
            variant="h2"
            className="startMessageCompH2"
            component="h2"
            fontWeight={600}
          >
            Designed for <span style={{ color: "#5C469C" }}>people</span> making
            impact
          </Typography>
        </Grid>

        {/* Category selection buttons */}
        <Grid item sm={12}>
          <Grid container spacing={1}>
            {/* Data Button */}
            <Grid className="buttonGridItem" item sm={2}>
              <CardTypeButton
                value="Data"
                variant="contained"
                onClick={(e) => handleStartMyPage(e)} // Handle button click
              >
                Data
              </CardTypeButton>
            </Grid>

            {/* Product Button */}
            <Grid className="buttonGridItem" item sm={2}>
              <CardTypeButton
                value="Product"
                variant="contained"
                onClick={(e) => handleStartMyPage(e)} // Handle button click
              >
                Product
              </CardTypeButton>
            </Grid>

            {/* Mental Health Button */}
            <Grid className="buttonGridItem" item sm={3}>
              <CardTypeButton
                value="MentalHealth"
                variant="contained"
                onClick={(e) => handleStartMyPage(e)} // Handle button click
              >
                Mental Health
              </CardTypeButton>
            </Grid>

            {/* Study Abroad Button */}
            <Grid className="buttonGridItem" item sm={3}>
              <CardTypeButton
                value="StudyAbroad"
                variant="contained"
                onClick={(e) => handleStartMyPage(e)} // Handle button click
              >
                Study Abroad
              </CardTypeButton>
            </Grid>

            {/* Teach Button */}
            <Grid className="buttonGridItem" item sm={2}>
              <CardTypeButton
                value="Teach"
                variant="contained"
                onClick={(e) => handleStartMyPage(e)} // Handle button click
              >
                Teach
              </CardTypeButton>
            </Grid>
          </Grid>
        </Grid>

        {/* Display relevant content based on selected category */}
        <Grid item sm={12}>
          <DisplayCardComp buttonCat={buttonCat} />
        </Grid>
      </Grid>
    </div>
  );
}

// Export the TopMessageComp component as the default export
export default TopMessageComp;
