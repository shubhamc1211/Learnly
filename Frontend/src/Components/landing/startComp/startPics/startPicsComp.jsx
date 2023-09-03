/**
 * This component displays a rotating set of images in a container.
 * The images change every 3 seconds.
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */

// Import necessary dependencies and styles
import "./startPicsComp.css";
import { useState } from "react";
import { useEffect } from "react";

// Define the StartPicsComp functional component
function StartPicsComp() {
  // State to keep track of the current image index
  const [currImage, setCurrImage] = useState(0);

  // Array of image URLs
  let imageUrls = [
    "assets/images/landing/start/learning.png",
    "assets/images/landing/start/teacher.png",
    "assets/images/landing/start/boy.png",
  ];

  // Function to change the current image index
  function changeImage() {
    // Rotate through the images using modulo to loop back to the start
    setCurrImage((currImage + 1) % 3);
  }

  // UseEffect to automatically change the image every 3 seconds
  useEffect(() => {
    setTimeout(() => {
      changeImage();
    }, 3000);
  }, [currImage]); // Re-run when currImage changes

  // Render the component
  return (
    <div className="startPicsComp imageContainer">
      {/* Display the current image */}
      <img
        className="image"
        src={require("../../../../" + imageUrls[currImage])} // Load the image based on the current index
        alt={`Image ${currImage}`} // Provide alt text for accessibility
      />
    </div>
  );
}

// Export the StartPicsComp component as the default export
export default StartPicsComp;
