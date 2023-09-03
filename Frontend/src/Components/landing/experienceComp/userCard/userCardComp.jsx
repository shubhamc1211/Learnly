/**
 * This component displays a user card with the user's name, image, and quotes.
 * @param {string} name - The name of the user.
 * @param {string} imageSrc - The image source path for the user's image.
 * @param {string} quotes - The quotes or content to display on the card.
 */

// Import necessary dependencies
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./userCardComp.css";

// Define the UserCardComp functional component
function UserCardComp({ name, imageSrc, quotes }) {
  // Log the received props for debugging
  console.log(name, imageSrc, quotes);

  // Render the component
  return (
    <div className="userCardComp">
      {/* Card component with content */}
      <Card className={"card"}>
        {/* Background gradient */}
        <div className="cardHalfBack"></div>

        {/* User's image */}
        <CardMedia
          component="img"
          className={"image"}
          image={require("../../../../assets/images/landing/card/" + imageSrc)} // Load the image using the provided path
          alt={name} // Provide alt text for accessibility
        />

        {/* Card content */}
        <CardContent>
          {/* User's name */}
          <Typography variant="h6" className={"name"}>
            {name}
          </Typography>

          {/* User's quotes or content */}
          <Typography variant="paragraph" paragraph className={"text"}>
            {quotes}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

// Export the UserCardComp component as the default export
export default UserCardComp;
