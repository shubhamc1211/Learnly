/**
 * This component displays a list of user cards based on the selected category.
 * It takes the selected category as a prop and renders UserCardComp for each item in the category.
 * @param {string} buttonCat - The selected category for which user cards should be displayed.
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */

// Import necessary dependencies
import { Grid } from "@mui/material";
import "./displayCardComp.css";
import { useState } from "react";
import UserCardComp from "../userCard/userCardComp";
import cardDataImp from "../../../../assets/data/cardData.json"; // Assuming this is the correct path to your data

// Define the DisplayCardComp functional component
function DisplayCardComp({ buttonCat }) {
  // Define a map of categories and corresponding item IDs
  const cardList = {
    Data: [101, 102, 103, 101],
    Product: [102, 102, 102, 102],
    MentalHealth: [103, 103, 103, 103],
    StudyAbroad: [101, 103, 103, 101],
    Teach: [103, 102, 101, 102],
  };

  // Check if cardDataImp is available
  if (!cardDataImp) {
    return <div>Loading...</div>; // Display loading message if data is not available
  }

  // Render the component
  return (
    <div className="displayCardComp">
      {/* Grid container for user cards */}
      <Grid container spacing={2}>
        {/* Loop through each item in the selected category */}
        {cardList[buttonCat].map((item, index) => (
          <Grid item sm={6} xs={12} md={4} lg={3} key={index}>
            {/* Render the UserCardComp component with data */}
            <UserCardComp
              name={cardDataImp[item].name}
              quotes={cardDataImp[item].quotes}
              imageSrc={cardDataImp[item].imageSrc}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

// Export the DisplayCardComp component as the default export
export default DisplayCardComp;
