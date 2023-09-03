/**
 * It provides options to start a page and contact the platform for feedback.
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */

// Import necessary dependencies
import { Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { StickyNote2 } from "@mui/icons-material";

// Import component-specific styles
import "./startMessageComp.css";

// Define the StartMessageComp functional component
function StartMessageComp() {
  // Initialize the navigation function
  let navigate = useNavigate();

  // Styled component for the StartPageButton
  const StartPageButton = styled(Button)(({ theme }) => ({
    // Styling for the start button
    height: "100%",
    padding: "10px 30px",
    fontWeight: 600,
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: "#1D267D",
    "&:hover": {
      backgroundColor: "#0C134F",
    },
  }));

  // Styled component for the ReadFeedbackButton
  const ReadFeedbackButton = styled(Button)(({ theme }) => ({
    // Styling for the feedback button
    height: "100%",
    padding: "10px 30px",
    fontWeight: 600,
    color: theme.palette.getContrastText(grey[50]),
    backgroundColor: grey[50],
    "&:hover": {
      backgroundColor: "#D4ADFC",
    },
  }));

  // Function to handle the "Contact Us" button click
  const handleFeedbacks = (e) => {
    navigate("/contact"); // Redirect to the contact page
  };

  // Function to handle the "Start My Page" button click
  const handleStart = (e) => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    console.log(
      "Printing local user from Start Mentor:",
      localUser,
      !localUser
    );

    if (!localUser) {
      navigate("/register"); // Redirect to the registration page if no user is found
    } else {
      navigate("/services"); // Redirect to the services page if user exists
    }
  };

  // Render the component
  return (
    <div className="startMessageComp">
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
            Commence your side gig{" "}
            <span style={{ color: "#5C469C" }}>Today</span>.
          </Typography>
        </Grid>
        {/* Message */}
        <Grid item sm={12}>
          <Typography variant="body1" component="h2" fontWeight={500}>
            Transform your passion and expertise into a prosperous enterprise,
            enabling your audience to achieve success in life.
          </Typography>
        </Grid>
        {/* Buttons */}
        <Grid item sm={12}>
          <Grid container spacing={2}>
            <Grid item sm={6}>
              {/* Start My Page Button */}
              <StartPageButton
                variant="contained"
                onClick={(e) => handleStart(e)} // Handle button click
                fullWidth
              >
                Start My Page <ArrowForwardIcon AlignHorizontalRight />
              </StartPageButton>
            </Grid>
            <Grid item sm={6}>
              {/* Contact Us Button */}
              <ReadFeedbackButton
                variant="contained"
                onClick={(e) => handleFeedbacks(e)} // Handle button click
                fullWidth
              >
                <StickyNote2 /> Contact Us
              </ReadFeedbackButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

// Export the StartMessageComp component as the default export
export default StartMessageComp;
