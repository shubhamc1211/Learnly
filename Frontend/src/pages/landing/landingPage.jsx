/**
 * LandingPage Component
 *
 * This component represents the landing page of the application.
 * It imports and renders various sub-components to create the landing page layout.
 *
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */

// Import required dependencies
import React from "react";
import StartComp from "../../Components/landing/startComp/startComp";
import EarnMoreComp from "../../Components/landing/earnMore/earnMoreComp";
import ExperienceComp from "../../Components/landing/experienceComp/experienceComp";
import FaqComp from "../../Components/faq/faqComp";
import { Element } from "react-scroll";
import "./landingPage.css";

// LandingPage function component
function LandingPage() {
  return (
    // Main container for the landing page
    <div className="landingPage">
      {/* Section for getting started */}
      <StartComp />

      {/* Section for user experience */}
      <ExperienceComp />

      {/* Section for earning more */}
      <EarnMoreComp />

      {/* FAQ section */}
      <FaqComp />
    </div>
  );
}

// Export the LandingPage component as default
export default LandingPage;
